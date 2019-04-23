import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Table, Button, ButtonGroup, Modal } from 'react-bootstrap';
import axios from 'axios';
import network from '../network'
import 'font-awesome/css/font-awesome.min.css'

class ItemList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      modalShow: false,
      orderId: this.props.orderId
    }

    this.removeItem = this.removeItem.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.modalClose = this.modalClose.bind(this)
  }

  removeItem(data){
    this.props.handleChanges(data)
  }

  handleValueDown(itemId, itemRefId, itemQuantity){
    

    if(itemQuantity !== 1){
      var url = network.url+ "/decreaseItemQuantity/"+this.state.orderId+"/"+itemId;

      axios.put(url,{
          refId: itemRefId,
          quantity: itemQuantity-1
      })
      .then(response => {
          if(response.status === 200){
              this.props.handleChanges(response.data)
          }
      })
      .catch(error => {
          console.log(error);
      })
    } 
  }

  handleValueUp(itemId, itemRefId, itemQuantity){

    const selectedItem = this.props.allItems.filter(item => item._id === itemRefId);

    if(selectedItem[0].quantity !== 0){
      var url = network.url  + "/increaseItemQuantity/"+this.state.orderId+"/"+itemId;

      axios.put(url,{ 
          refId: itemRefId,
          quantity: itemQuantity+1
      })
      .then(response => {
          if(response.status === 200){
              this.props.handleChanges(response.data)
          }
      })
      .catch(error => {
          console.log(error);
      })
    }
  }

  handleDelete(event,item) {
    var url = network.url + "/removeItem/"+this.state.orderId+"/"+item._id

    axios.put(url,{
        refId: item.id._id,
        quantity: item.quantity
    })
    .then(response => {
        if(response.status === 200){
            console.log("data 1", response.data[0])
            this.props.handleChanges(response.data)
        }
    })
    .catch(error => {
        console.log(error);
    })

    this.modalClose();
}

modalClose(){
  this.setState({ modalShow: false });
}

  render() {

    return (
      <div>
         <Container>
          <Row>
            <Table responsive striped>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Sub Total</th>
                  <th></th>
                </tr>
              </thead>

              {this.props.orderedItems.map((item) => (
                <tbody key={item.id._id}> 
                    <tr>
                        <td>{item.id.name}</td>
                        <td>
                            <ButtonGroup className="mr-2"  aria-label="First group">
                                <Button variant="secondary" onClick={event => this.handleValueDown(item._id, item.id._id, item.quantity)}>-</Button>
                                <Button variant="outline-secondary" disabled>{item.quantity}</Button>
                                <Button variant="secondary" onClick={event => this.handleValueUp(item._id, item.id._id, item.quantity)}>+</Button>
                            </ButtonGroup>
                        </td>
                        <td>$ {Number(item.id.unitPrice*item.quantity).toPrecision(3)}</td>
                        <td> 
                            <Button variant="outline-danger" onClick={() => this.setState({ modalShow: true})}><i className="fa fa-trash"></i></Button>
                  
                            <Modal show={this.state.modalShow}>
                              <Modal.Header closeButton>
                                <Modal.Title>Delete Item</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>Are you sure you wish to delete this item? </Modal.Body>
                              <Modal.Footer>
                                <Button variant="outline-danger" onClick={this.modalClose}>Cancel</Button>
                                <Button variant="outline-success" onClick={event => this.handleDelete(event,item)}>Ok</Button>
                              </Modal.Footer>
                            </Modal>
                        </td>
                    </tr> 
                </tbody>
              ))}

            </Table>
          </Row>
        </Container>  
      </div>
    )
  }

}

export default withRouter(ItemList);


