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
      let {quantity,selectedStock,purchasedStocks,localUser}=this.state;
      const {stocks}=this.props;
      let flag=0;
      const valid=this.validation();
       quantity=parseInt(quantity);
       if(valid){
         let total,myShares=0;
         myShares+=quantity;
         let shareValue=selectedStock && stocks[selectedStock].current_value.toFixed(2);
         total=shareValue*quantity;
        if(Object.keys(purchasedStocks).length===0)
        {
            purchasedStocks[selectedStock]={"quantity":quantity, "myShares":myShares}
         }
         else{
           //To find the existing stock
          Object.keys(purchasedStocks).map(stock=>{
            if(stock===selectedStock)
            {
              myShares=purchasedStocks[stock].myShares+purchasedStocks[stock].quantity;
              purchasedStocks[selectedStock]={"quantity":quantity, "myShares":myShares}
              flag=1;
            }
          })
          //To add the new stock in the existing list
          if(!flag){
            purchasedStocks[selectedStock]={"quantity":quantity, "myShares":myShares}
          }
         }
            }
       else{
         alert("Please upload data properly");
       }

     console.log(Object.keys(purchasedStocks).length,typeof purchasedStocks,purchasedStocks);
      // localStorage.setItem(this.props.user.givenName.toLowerCase(),JSON.stringify(purchasedStocks));
      this.setState({purchasedStocks})
    }
    sellStocks=(stock)=>{
      const {purchasedStocks}=this.state;
      let temppurchasedStocks={...purchasedStocks};
      delete(temppurchasedStocks[stock]);
      this.setState({purchasedStocks:temppurchasedStocks});
    }
    getStockValueColor = (stock) =>{
      if(stock.current_value < stock.history.slice(-2)[0].value){
        return 'red';
      }
      else if(stock.current_value > stock.history.slice(-2)[0].value){
        return 'green';
      }
      else{
        return null;
      }
    }
    reset=()=>{
      this.setState({purchasedStocks:[]})
    }
    getAmount=(purchasedStocks,deafaultAmount)=>{
      let totalAmount=0,total=0;
      if(Object.keys(purchasedStocks).length>0)
      { 
         Object.keys(purchasedStocks).map((stock)=>{
            totalAmount=totalAmount+this.props.stocks[stock].current_value*purchasedStocks[stock].myShares;
            total=(deafaultAmount)-totalAmount;
      })
      return total.toFixed(2);
    }
    else
      return deafaultAmount;
    }
  
    render() { 
      const {purchasedStocks,deafaultAmount}=this.state;
      const {stocks,user}=this.props;
      if(this.state.stocks===null) return <h1>Loading...</h1>
        return (  
            <>
        <Card.Body className='client-stock-main-conatiner' >
        <div className='client-stock-container'>
           <Row>
             <Col>
               <Row className='client-stock-container-row'>
                    <div className='add-stock-amount'>
                      <h1>{this.getAmount(purchasedStocks,deafaultAmount)}</h1>
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
             <Col>
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
                            <th>
                              Stock Value
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
                            <td>{stocks[stock].current_value.toFixed(2)}</td>
                            <td>{purchasedStocks[stock].myShares}</td>
                            <td className={this.getStockValueColor(stocks[stock])}>{(stocks[stock].current_value*purchasedStocks[stock].myShares).toFixed(2)}</td>
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