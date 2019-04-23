import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Container, Row, Table, Badge, Button } from 'react-bootstrap';
import moment from 'moment';

class OrderList extends Component {

  viewOrderDetails(event, orderId) {
    this.props.history.push("/OrderItems/"+orderId)
  }


  render() {

    var num = 0
    return (
      <div>
         <Container>
          <Row>
            <Table responsive>
              <thead style={{textAlign: 'center'}}>
                <tr>
                  <th >Order Number</th>
                  <th>Status</th>
                  <th>Created Time</th>
                  <th></th>
                </tr>
              </thead>

              {this.props.orders.map((order) => (
                <tbody key={order._id}> 
                  <tr style={{textAlign: 'center'}}>
                    <td>{++num}</td>
                    <td>
                      {order.status === "open" ? (
                        <Badge variant="success">{order.status}</Badge>
                          ) : (
                        <Badge variant="danger">{order.status}</Badge>
                      )}
                    </td>
                    <td>{moment(order.createdAt).format("DD-MM-YYYY h:mm:ss")}</td>
                    <td><Button variant="outline-info" onClick={event => this.viewOrderDetails(event, order._id)}>View Details</Button></td>
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

OrderList.propTypes = {
  orders: PropTypes.array.isRequired
}

export default withRouter(OrderList);


