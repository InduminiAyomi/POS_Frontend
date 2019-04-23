import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Navbar, Nav, Button, NavItem } from 'react-bootstrap';
import 'font-awesome/css/font-awesome.min.css'


class NavBar extends Component {

    handleHomeClick(event) {
        this.props.history.push("/MainPage")
    }

    handleLogoutClick(event) {
        this.props.history.push("/")
    }

    render() {
        return (
            <Navbar bg="light" variant="light" >
                <Nav>
                    <NavItem >
                        <Nav.Link>
                        <Button variant="outline-primary" onClick={(event) => this.handleHomeClick(event)}><i className="fa fa-home"></i></Button>
                        </Nav.Link>
                    </NavItem>

                    <NavItem>
                        <Nav.Link>
                        <Button variant="outline-primary" onClick={(event) => this.handleLogoutClick(event)}><i className="fa fa-sign-out"></i></Button>   
                        </Nav.Link>
                    </NavItem>
                    
                    
                </Nav>   
            </Navbar>
        );
    }
}

export default withRouter(NavBar);


