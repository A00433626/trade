import React, { Component } from 'react'
import {Card,Button,Table,Row,Col,Form} from 'react-bootstrap'
import './ClientStock.css';
class ClientStock extends Component {
    state = { 
        show:false,
        quantity:null,
        selectedStock:null,
        purchasedStocks:[],
        localUser:null,
        deafaultAmount:100000,
     }
    validation=()=>{
      let {quantity,selectedStock}=this.state;
      quantity=parseInt(quantity);
      if(typeof quantity==="number" && quantity>=1 &&quantity<11){
      if(typeof selectedStock==="string" && selectedStock!==null)
        return true;
      else 
        return false;
    }
      else return false;
    }
    buyStocks=()=>{
      let {quantity,selectedStock,purchasedStocks,deafaultAmount}=this.state;
      let flag=0;
      let tempdeafaultAmount=deafaultAmount;
      const valid=this.validation();
      quantity=parseInt(quantity);
       if(valid){
         let myShares=0,buyingPrice=0;
         myShares+=quantity;
        if(Object.keys(purchasedStocks).length===0)
        {
          buyingPrice=(this.props.stocks[selectedStock].current_value).toFixed(2);
          tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
          purchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
         }
         else{
           //To find the existing stock
          Object.keys(purchasedStocks).map(stock=>{
            buyingPrice=(this.props.stocks[selectedStock].current_value).toFixed(2);
            if(stock===selectedStock)
            {
              myShares=purchasedStocks[stock].myShares+purchasedStocks[stock].quantity;
              tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
              purchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
              flag=1;
            }
          })
          //To add the new stock in the existing list
          if(!flag){
            tempdeafaultAmount=tempdeafaultAmount-(buyingPrice*myShares)
            purchasedStocks[selectedStock]={"value":buyingPrice,"quantity":quantity, "myShares":myShares}
          }
         }
            }
       else{
         alert("Please upload data properly");
       }
      // localStorage.setItem(this.props.user.givenName.toLowerCase(),JSON.stringify(purchasedStocks));
      this.setState({purchasedStocks,deafaultAmount:tempdeafaultAmount})
    }
    sellStocks=(stock)=>{
     const {deafaultAmount,purchasedStocks}=this.state;
     const {stocks}=this.props;
     let currentAmount= this.getAmount(purchasedStocks,deafaultAmount);
     let currentStockValue=parseInt(stocks[stock].current_value.toFixed(2));
     const sellAmount=currentStockValue*purchasedStocks[stock].myShares;
     let tempdeafaultAmount=currentAmount+sellAmount;
     let temppurchasedStocks={...purchasedStocks};
     delete(temppurchasedStocks[stock]);
     this.setState({purchasedStocks:temppurchasedStocks,deafaultAmount:tempdeafaultAmount});
    }
    getStockValueColor = (stock) =>{
      const {stocks}=this.props;
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

      }
      // if(stock.current_value < stock.history.slice(-2)[0].value){
      //   return 'red';
      // }
      // else if(stock.current_value > stock.history.slice(-2)[0].value){
      //   return 'green';
      // }
      // else{
      //   return null;
      // }
    }
    reset=()=>{
      this.setState({purchasedStocks:[]})
    }
    getAmount=(purchasedStocks,deafaultAmount)=>{
      let totalAmount=0,total=0;
      if(Object.keys(purchasedStocks).length>0)
      { 
         Object.keys(purchasedStocks).map((stock)=>{
            totalAmount=totalAmount+(this.props.stocks[stock].current_value*purchasedStocks[stock].myShares);
            total=(deafaultAmount)+totalAmount;
            console.log(total)
      })
      return total;
    }
    else
      return deafaultAmount;
    }
  
    render() { 
      const {purchasedStocks,deafaultAmount}=this.state;
      const {stocks}=this.props;
      if(this.state.stocks===null) return <h1>Loading...</h1>
        return (  
            <>
        <Card.Body className='client-stock-main-conatiner' >
        <div className='client-stock-container'>
           <Row>
             <Col>
               <Row className='client-stock-container-row'>
                    <div className='add-stock-amount'>
                      <h1>{this.getAmount(purchasedStocks,deafaultAmount).toFixed(2)}</h1>
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
                            <th>Net Value</th>
                          </tr>
                       </thead>
                       <tbody>
                         {purchasedStocks && Object.keys(purchasedStocks).map((stock)=>{
                        return (
                          <tr> 
                            <td>{stock}</td>
                        <td>{purchasedStocks[stock].value}</td>
                            <td>{stocks[stock].current_value.toFixed(2)}</td>
                            <td>{purchasedStocks[stock].myShares}</td>
                            <td className={this.getStockValueColor(stock)}>{(stocks[stock].current_value*purchasedStocks[stock].myShares).toFixed(2)}</td>
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
      </Card.Body>
      </>
      );
    }
}
 
export default ClientStock;