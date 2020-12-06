import React, { Component } from 'react'
import {Card,Button,Table,Row,Col,Form} from 'react-bootstrap'
import './ClientStock.css';
import { withAuth0 } from '@auth0/auth0-react';
import Skeleton from '@material-ui/lab/Skeleton';


class ClientStock extends Component {
    state = { 
        show:false,
        quantity:null,
        selectedStock:null,
        purchasedStocks:{},
        localUser:null,
        defaultAmount:100000,
     }
    validation=()=>{
      let {quantity,selectedStock}=this.state;
      quantity=parseInt(quantity);
      if(typeof quantity==="number" && quantity>=1 &&quantity<11)
      {
        if(typeof selectedStock==="string" && selectedStock!==null)
          return true;
        else 
          return false;
      }
      else return false;
    }
    buyStocks=()=>{
      let {quantity,selectedStock,purchasedStocks,defaultAmount,localUser}=this.state;
      let flag=0;
      let tempdeafaultAmount=defaultAmount;
      let tempPurchasedStocks=purchasedStocks;
      const valid=this.validation();
      quantity=parseInt(quantity);
       if(valid){
          let myShares=0,buyingPrice=0;
          myShares+=quantity;
          if(Object.keys(purchasedStocks).length===0)
          {
            buyingPrice=(this.props.stocks[selectedStock].current_value).toFixed(2);
            tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
            tempPurchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
          }
          else{
            //To find the existing stock
            Object.keys(purchasedStocks).map(stock=>{
              buyingPrice=(this.props.stocks[selectedStock].current_value).toFixed(2);
              if(stock===selectedStock)
              {
                myShares=purchasedStocks[stock].myShares+quantity;
                tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
                tempPurchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
                flag=1;
              }
            })
            //To add the new stock in the existing list
            if(!flag){
              tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
              tempPurchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
            }
          }
            
        }
       else{
         alert("Please upload data properly");
       }
      this.setState({purchasedStocks:tempPurchasedStocks,defaultAmount:tempdeafaultAmount})
      let localStorageData=JSON.parse(localStorage.getItem(localUser));
      if(localStorageData){
      localStorageData.purchasedStocks=tempPurchasedStocks;
      localStorageData.defaultAmount=tempdeafaultAmount;
      localStorageData.purchasedStocks=tempPurchasedStocks;
      localStorage.setItem(localUser,JSON.stringify(localStorageData))
      }
    }
  
    sellStocks=(stock)=>{
     const {defaultAmount,purchasedStocks,localUser}=this.state;
     const {stocks}=this.props;
     let currentAmount= defaultAmount;
     if(!stocks[stock]) return alert("Please wait for the Data to load. Thank you");
     let currentStockValue=parseInt(stocks[stock].current_value.toFixed(2));
     const sellAmount=currentStockValue*purchasedStocks[stock].myShares;
     let tempdeafaultAmount=(currentAmount+sellAmount).toFixed(2);
     let temppurchasedStocks=purchasedStocks;
     delete(temppurchasedStocks[stock]);
     this.setState({purchasedStocks:temppurchasedStocks,defaultAmount:tempdeafaultAmount});
     let localStorageData=JSON.parse(localStorage.getItem(localUser));
     if(localStorageData===null) return
     if(localStorageData.purchasedStocks[stock]!==null){
      localStorageData.defaultAmount=tempdeafaultAmount;
      delete localStorageData.purchasedStocks[stock]
      localStorage.setItem(localUser,JSON.stringify(localStorageData));
     }
    }
    getStockValueColor = (stock) =>{
      const {stocks}=this.props;
      if(!stocks[stock]) return null;
      const {purchasedStocks}=this.state;
      let difference=stocks[stock].current_value.toFixed(2)-purchasedStocks[stock].value;
      if(difference>0){
        return 'green'
      }
      else if(difference<0)
      {
        return 'red';
      }
      else{
        return 'normal';
      }
    }
    reset=()=>{
      const {localUser}=this.state;
      let defaultAmount=100000;
      let purchasedStocks={};
      this.setState({defaultAmount ,purchasedStocks})
      let data={'defaultAmount':defaultAmount,'purchasedStocks':purchasedStocks};
      localStorage.setItem(localUser,JSON.stringify(data));
    }
    componentDidMount=()=>{
      const {defaultAmount}=this.state;
      let currentUser=this.props.auth0.user.given_name;
       if(localStorage.getItem(currentUser))
       {
         let data=JSON.parse(localStorage.getItem(currentUser));
         let localStoragePurchasedStocks=data.purchasedStocks;
         let localStorageDefaultAmount=data.defaultAmount;
         this.setState({localUser:currentUser,defaultAmount:localStorageDefaultAmount,purchasedStocks:localStoragePurchasedStocks})
       }
       else
       {
         let data={'defaultAmount':defaultAmount,'purchasedStocks':{}};
         localStorage.setItem(currentUser,JSON.stringify(data))
         this.setState({localUser:currentUser})
       }
    }
    getPL=(stock)=>{
      const {stocks}=this.props;
      const {purchasedStocks}=this.state;
      if(stock===null|| stocks[stock]===null||purchasedStocks[stock]===null) return null;
      const myShares=purchasedStocks[stock].myShares;
      let costPrice=purchasedStocks[stock].value;
      let sellingPrice=stocks[stock].current_value;
      let pl=0
      let percentage=0;
      let resultString;
      pl=((sellingPrice-costPrice)*purchasedStocks[stock].myShares).toFixed(2)
      percentage=(pl/(myShares*costPrice))*100;
      percentage=percentage.toFixed(2);
      if(percentage<0)
      {
        resultString=`${pl} (${percentage}%)`;
      }
      else if(percentage>0)
      {
        resultString=`${pl} (+${percentage}%)`;
      }
      else{
        resultString='0';
      }
      return resultString;
   

    }
    render() { 
      const {purchasedStocks,defaultAmount}=this.state;
      const {stocks}=this.props;
        return (  
            <>
        {this.props.areStocksLoaded() ? <Card.Body className='client-stock-main-conatiner' >
        <div className='client-stock-container'>
           <Row>
             {/* Stock Form buying*/}
             <Col>
               <Row className='client-stock-container-row'>
                    <div className='add-stock-amount'>
                      <h1>{defaultAmount}</h1>
                    </div>
                </Row>
                <Row>
                     <div className='container'>
                      <Form>
                        <Form.Group>
                          <Form.Label>Stock</Form.Label>
                              <Form.Control as="select" custom onChange={(e)=>{this.setState({selectedStock:e.target.value}) }}>
                                {
                                  this.props.stocks && Object.keys(this.props.stocks).map((data)=>{
                                   return <option>{data}</option>
                                })}
                              </Form.Control>
                        </Form.Group>
                        <Form.Group>
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control required type="number"onChange={(e)=>{this.setState({quantity:e.target.value})}} min={0} max={10}/> 
                        </Form.Group>
                        <Button className='mx-3' onClick={()=>{this.buyStocks()}}>Buy stock</Button>
                      </Form>
                   </div>
                </Row>
             </Col>
             {/* My Stock Listing */}
             <Col xs={12}>
                 <Card.Body className='client-stock-holding'>
                   <div className='client-stock-holding-container'> 
                      <div className='client-stock-holdings'>
                          <h1>My Stocks</h1>
                      </div>
                      <div className='client-holdings-reset'>
                              <Button onClick={()=>{this.reset()}}>Reset</Button>
                      </div>
                   </div>
                   {Object.keys(purchasedStocks).length>0 ? (
                   <div className='stocks-holding-container'>
                      <Table striped bordered hover>
                       <thead>
                          <tr>
                            <th>Name</th>
                            <th>Buy value</th>
                            <th>
                              Live Value
                            </th>
                            <th>Shares owned</th>
                            <th>P/L</th>
                          </tr>
                       </thead>
                       <tbody>
                         {purchasedStocks && Object.keys(purchasedStocks).map((stock)=>{
                        return (
                          <tr> 
                            <td>{stock}</td>
                            <td>{purchasedStocks? purchasedStocks[stock].value:<Skeleton variant='rect' width='50px'/>}</td>
                            <td>{stocks[stock] ? stocks[stock].current_value.toFixed(2):<Skeleton variant='rect' width='50px'/>}</td>
                            <td>{purchasedStocks? purchasedStocks[stock].myShares:<Skeleton variant='rect' width='50px'/>}</td>
                            <td className={this.getStockValueColor(stock)}>{stocks[stock] ? (this.getPL(stock)):<Skeleton variant='rect' width='50px'/>}</td>
                            <td><Button onClick={()=>this.sellStocks(stock)}>sell</Button></td>
                          </tr>
                          )
                          })}  
                        </tbody>
                       </Table>
                   </div> ):(<h2 className='p-3'>No Stocks in your account</h2>)}
                 </Card.Body>
            </Col>
            </Row>
        </div>
      </Card.Body>: <Skeleton variant='react' height='20rem' width='100%'/>}
      </>
      );
    }
}
 
export default withAuth0(ClientStock);