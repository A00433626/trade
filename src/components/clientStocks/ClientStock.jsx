import React, { Component } from 'react'
import {Card,Button,Table,Row,Col,Form} from 'react-bootstrap'

class ClientStock extends Component {
    state = { 
        show:false,
     }
    // handleStock=()=>{
    //     // log('Clicked')
    // }

   
    render() { 
      // console.log(this.props.stocks);
        return (  
            <>
        <Card.Body style={{ maxHeight:'25rem', border:"1px solid black"}}>
        <div className='stock-container'>
            <Row>
               <Col>
               <Row style={{justifyContent: 'space-between',padding: '0 10px'}}>
               {/* <div className='add-stock-amount-container' style={{display:'flex',justifyContent:'space-between'}}> */}
                  <div className='add-stock-amount'>
                     <h1 style={{fontSize: '30px'}}>{this.props.deafaultAmount}</h1>
                  </div>
                  {/* <div className='add-stock-amount'>
                    <Button>Add stock</Button>
                   </div> */}
                   {/* </div> */}
                   </Row>
                   <Row>
                     <div className='container'>
                      <Form>
                       <Form.Group>
                        <Form.Label>Stock</Form.Label>
                            <Form.Control as="select" custom>
                              {
                                this.props.stocks && Object.keys(this.props.stocks).map((data)=>{
                                    return <option>{data}</option>
                              })}
                              </Form.Control>
                       </Form.Group>
                      <Form.Group>
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="text" placeholder="Enter email"/> 
                      </Form.Group>
                      </Form>
                     
                    <Button>Add stock</Button>
                   </div>
                   </Row>
                </Col>
                
                <Col>
                 <Card.Body style={{height:'20rem', border:"1px solid black",overflow:'scroll'}}>
                   <div style={{justifyContent: 'space-between',padding: '0 10px',display:'flex'}}> 
                   <div className='client-holdings' style={{display:'flex',alignItems:'center'}}>
                       <span>Current Holdings</span>
                   </div>
                   </div>
                   {/* onClick={this.handleStock()} */}
                   <div className='stocks-holding-container'>
                    
                       <Table striped bordered hover>
                       <tbody>
                            <tr onClick={()=>{alert('clicked')}}>
                            <td>YHOO</td>
                            <td>120</td>
                            <td>10</td>
                            <td className='green'>1200</td>
                            </tr>
                        </tbody>
                       </Table>
                       
  
                   </div>
                 </Card.Body>
                </Col>
            </Row>
        </div>
      
        {/* {console.log(this.state.stocks)} */}
      </Card.Body>
      </>
      );
    }
}
 
export default ClientStock;