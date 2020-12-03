import React, { Component } from 'react'
import {Card,Button,Table,Row,Col,Form} from 'react-bootstrap'

class ClientStock extends Component {
    state = { 
        show:false,
        quantity:null,
        selectedStock:null,
        purchasedStocks:[],
        localUser:null,
        deafaultAmount:100000,
     }
    // handleStock=()=>{
    //     // log('Clicked')
    // }
    validation=()=>{
      // console.log("enter validation");
      let {quantity,selectedStock}=this.state;
      quantity=parseInt(quantity);
      if(typeof quantity==="number" && quantity>=1 &&quantity<11){
      if(typeof selectedStock==="string" && selectedStock!==null){
        return true;
      }
      else 
      {
        return false;
      }
    }
      else {
        return false;
      }
    }
    setSelectedStocks=()=>{
      let {quantity,selectedStock,purchasedStocks,localUser}=this.state;
      const {stocks}=this.props;
      let flag=0;
    //  console.log(tempPurchasedStocks.length);
      const valid=this.validation();
       quantity=parseInt(quantity);
       if(valid){
         let total,myShares=0;
         myShares+=quantity;
         let shareValue=selectedStock && stocks[selectedStock].current_value.toFixed(2);
         total=shareValue*quantity;
          //To add the new stock
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
      // if(valid)
      // {
      //   console.log("Is Valid");
      //   if(tempPurchasedStocks?.length===0)
      //   {
      //     tempPurchasedStocks={
      //     [selectedStock]:{
      //         "quantity":quantity,
      //         "myShares":myShares+parseInt(quantity),
      //         "shareValue":currentShareValue,
      //       }
      //     }
      //   }
      //   else 
      //   {
      //     Object.keys(tempPurchasedStocks).map((data)=>{
      //       if(data===selectedStock){
      //         return tempPurchasedStocks[data];
      //         // return flag=1;
      //     }}
      //     )
      // }
 
      // localStorage.setItem(this.props.user.givenName.toLowerCase(),JSON.stringify(purchasedStocks));
      this.setState({purchasedStocks})
    }
    // componentDidMount=()=>{
    //   // console.log( JSON.parse(localStorage.getItem('user1')));
    //   let data=[];
    //   this.setState({localUser: JSON.parse(localStorage.getItem(this.props.user.givenName))})
    // }
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
  
    render() { 
      const {purchasedStocks,deafaultAmount}=this.state;
      const {stocks,user}=this.props;
      if(this.state.stocks===null) return <h1>Loading...</h1>
      // console.log(this.state.deafaultAmount);
        return (  
            <>
        <Card.Body style={{ maxHeight:'25rem', border:"1px solid black"}}>
        <div className='stock-container'>
            <Row>
               <Col>
               <Row style={{justifyContent: 'space-between',padding: '0 10px'}}>
                  <div className='add-stock-amount'>
                     <h1 style={{fontSize: '30px'}}>{deafaultAmount}</h1>
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
                      </Form>
                     
                    <Button onClick={()=>{this.setSelectedStocks()}}>Buy stock</Button>
                   </div>
                   </Row>
                </Col>
                
                <Col>
                 <Card.Body style={{height:'20rem', border:"1px solid black",overflow:'scroll'}}>
                   <div style={{justifyContent: 'space-between',padding: '0 10px',display:'flex'}}> 
                   <div className='client-holdings' style={{display:'flex',alignItems:'center'}}>
                       <h1>Current Holdings</h1>
                   </div>
                   <div className='client-holdings' style={{display:'flex',alignItems:'center'}}>
                   <Button onClick={()=>{this.reset()}}>Reset</Button>
                   </div>
                   </div>
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
                          <tr onClick={()=>{alert('clicked')}}> 
                            <td>{stock}</td>
                            <td>{stocks[stock].current_value.toFixed(2)}</td>
                            <td>{purchasedStocks[stock].myShares}</td>
                            <td className={this.getStockValueColor(stocks[stock])}>{(stocks[stock].current_value*purchasedStocks[stock].quantity).toFixed(2)}</td>
                          </tr>
                          )
                          })}
                           
                        </tbody>
                       </Table>
                       
  
                   </div>
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