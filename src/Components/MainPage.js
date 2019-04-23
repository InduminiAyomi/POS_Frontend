import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { ButtonToolbar, Button, Card, Container } from 'react-bootstrap';
import axios from 'axios';
import network from '../network'
import NavBar from './NavBar'
import OrderList from './OrderList';

class MainPage extends Component {

  constructor(props) {
    super(props);

    this.state = {
      orders : []
    }

  }

  componentDidMount () {
    var url = network.url + "/ordersByStatus/open";
    this.getData(url)
  }

  getData (url) {
    axios.get(url)
    .then(response => {
        if(response.status === 200){
            this.setState({ orders: response.data})
            console.log(this.state.orders)
        }
    })
    .catch(error => {
        console.log(error);
    })
  }

  handleClick(event) {
        var url = null;
        if(event === "open"){
            url = network.url + "/ordersByStatus/open";
        }

        if(event === "closed"){
            url = network.url + "/ordersByStatus/closed";
        }

        if(event === "all"){
            url = network.url + "/allOrders";
        }

        this.getData(url)
  }

  render() {
    return (
      <div>
        <NavBar />
        <Container>
            <Card>
                <Card.Header>
                    <ButtonToolbar>
                        <Button variant="outline-success" onClick={event => this.handleClick("open")} >Open</Button>
                        <Button variant="outline-danger" onClick={event => this.handleClick("closed")} >Closed</Button>
                        <Button variant="outline-dark" onClick={event => this.handleClick("all")} >All</Button>
                    </ButtonToolbar>
                </Card.Header>
                <Card.Body>
                    <OrderList orders={this.state.orders} /> 
                </Card.Body>
            </Card>
        </Container>
        

      </div>
    );
  }
}

export default withRouter(MainPage);


