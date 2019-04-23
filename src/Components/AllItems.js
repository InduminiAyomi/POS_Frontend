import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Table, Badge, Alert } from 'react-bootstrap';
import axios from 'axios';
import network from '../network'
import 'font-awesome/css/font-awesome.min.css'
var empty = require('is-empty');

class AllItems extends Component {

  constructor(props) {
    super(props)

    this.state = {
        orderId: this.props.orderId,
        allItems: this.props.allItems,
        showAlreadyAddedAlert: false,
        showfStockOutOfAlert: false
    }
    this.handleAlertDismiss = this.handleAlertDismiss.bind(this)
  }

  handleAlertDismiss(){
      this.setState({showAlert: false})
  }
handleRowClick(event, item) {
    const selectedItem = this.props.orderedItems.filter(element => element.id._id === item._id);

    if(!empty(selectedItem)){
        this.setState({ showAlreadyAddedAlert: true })   
    }

    if(item.quantity === 0){
        this.setState({ showfStockOutOfAlert: true })
    }

    if (item.quantity !== 0 && empty(selectedItem)){

        var url = network.url + "/addNewItem/"+this.state.orderId;

        axios.put(url,{
            id:item._id,
            quantity: 1
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



  render() {

    return (
      <div>
          
         <Container>
            <Alert dismissible variant="danger" show={this.state.showAlreadyAddedAlert} onClick={() => this.setState({showAlreadyAddedAlert: false})}> 
                <h6>You have already added this item.</h6>
            </Alert> 
            <Alert dismissible variant="dark" show={this.state.showfStockOutOfAlert} onClick={() => this.setState({showfStockOutOfAlert: false})}> 
                <h6>This item is currently out of stock.</h6>
            </Alert>    
            <Row>
            <Table responsive size="sm" hover>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Unit Price</th>
                        {/* <th>Available Quantity</th> */}
                        <th></th>
                    </tr>
                </thead>

                {this.props.allItems.map((item) => (
                <tbody key={item._id}> 
                    
                    <tr onClick={(event) => this.handleRowClick(event,item)}>
                        <td>{item.name}</td>
                        <td>$ {item.unitPrice}</td>
                        {/* <td>{item.quantity}</td> */}
                        <td>
                            {item.quantity === 0 ? (
                            <Badge pill variant="dark">Out of Stock</Badge> 
                            ) : (
                            <Badge pill variant="warning">Available</Badge>
                            )}
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


export default withRouter(AllItems);


