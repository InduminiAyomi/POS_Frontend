import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios'
import network from '../network'
import NavBar from './NavBar'
import '../App.css'
import ItemList from './ItemList';
import AllItems from './AllItems';

class OrderItems extends Component {

    constructor(props) {
        super(props)

        this.state = {
            orderId: this.props.match.params.OrderId,
            orderedItems : [],
            allItems: [],
            totalPrice: 0
        }

        this.handleChanges = this.handleChanges.bind(this)
        this.calculateTotalPrice = this.calculateTotalPrice.bind(this) 
    }

    componentDidMount () {
        var url = network.url + "/itemsByOrderId/"+this.state.orderId;
        
        axios.get(url)
        .then(response => {
            if(response.status === 200){
                console.log("ordered items",response.data.items)
                this.setState({ orderedItems: response.data.items})

                this.calculateTotalPrice(response.data.items)
            }
        })
        .catch(error => {
            console.log(error);
        })

        var url1 = network.url + "/allItems";
        axios.get(url1)
        .then(response => {
            if(response.status === 200){
                console.log("all items", response.data)
                this.setState({ allItems: response.data})
            }
        })
        .catch(error => {
            console.log(error);
        })
    }

    calculateTotalPrice(items){
        var sum = 0;
        items.map((item) => (
            sum = sum + (item.quantity*item.id.unitPrice)
        ))
        this.setState({totalPrice: sum})
        
    }

    handleClick(event) {
        this.props.history.push("/MainPage")
    }

    handleChanges(data){
        var updatedAllItems = this.state.allItems
        
        var indexItem = updatedAllItems.findIndex(x => x._id === data[1]._id);
        updatedAllItems[indexItem] = data[1];

        this.setState({allItems: updatedAllItems})
        this.setState({orderedItems: data[0].items})

        this.calculateTotalPrice(data[0].items)
    }

    render() {
        return (
        <div className="order-items">
            <NavBar/>
            <Container fluid='true'>
                <Row>
                <Col md={4}>
                    <Card>
                        <Card.Header>Item List</Card.Header>
                        <Card.Body>
                            <AllItems allItems={this.state.allItems} orderId={this.state.orderId} 
                                handleChanges={this.handleChanges} orderedItems={this.state.orderedItems}/>
                        </Card.Body>
                    </Card>
                </Col>
                                                        
                <Col md={8}>
                    <Card>
                        <Card.Header>
                            <Button variant="outline-primary" onClick={(event) => this.handleClick(event)}><i className="fa fa-chevron-left"></i></Button>
                        </Card.Header>
                        <Card.Body>
                            <ItemList orderedItems={this.state.orderedItems} orderId={this.state.orderId} 
                             handleChanges={this.handleChanges} allItems={this.state.allItems}/>
                        </Card.Body>
                        <Card.Footer>
                            <h4 style={{color: '#5cb85c', textAlign:'right'}}>Total Price: $ {Number(this.state.totalPrice).toPrecision(3)}</h4>
                        </Card.Footer>
                    </Card>
                </Col>
                </Row>
            </Container>

        </div>
        );  
    }
}

export default withRouter(OrderItems);


