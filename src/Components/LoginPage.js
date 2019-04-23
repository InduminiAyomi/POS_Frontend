import React, { Component } from 'react';
import { Alert, Card, Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import network from '../network.js'
import axios from 'axios';
import logo from '../logo.png';
import '../App.css'

class LoginPage extends Component {

    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            error: ''
        };

        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.dismissError = this.dismissError.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }

    handlePasswordChange(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleSubmit(e) {

        console.log("login")
        e.preventDefault();

        if (!(this.state.username || this.state.password)) {
            return this.setState({ error: 'Username and Password is required' });
        }
        if (!this.state.username) {
            return this.setState({ error: 'Username is required' });
        }
      
        if (!this.state.password) {
            return this.setState({ error: 'Password is required' });
        }
    
        var url = network.url+"/auth";
        
        var data = {
            "username": this.state.username,
            "password": this.state.password
        }

        axios.post(url, data)
            .then(response => {
                console.log(response)
                if(response.status === 200){
                    this.props.history.push("/MainPage")
                }
            })
            .catch(error => {
                console.log(error);
            })

        return this.setState({ error: '' });
    }

    dismissError() {
        this.setState({ error: '' });
    }

    render() {
      return (
        <Container fluid='true' style={{height: '100vh', overflow: 'auto'}} >
            <div className="login-page">
                <Card border="light" style={{ width: '30rem', top: '200px', left: '640px'}}>
                    <Card.Body>
                        <div className="login-form">
                            <img src={logo} alt="logo"/>
                            <form onSubmit={this.handleSubmit} >

                                {
                                    this.state.error &&
                                    <Alert dismissible variant="danger" onClick={this.dismissError}>
                                    <Alert.Heading style={{fontSize: '15px'}}>{this.state.error}</Alert.Heading>
                                    </Alert>
                                }

                                <label>Username</label>
                                <input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/>

                                <label>Password</label>
                                <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>

                                <input type="submit" value="Login" />
                            </form>
                        </div>
                    </Card.Body>
                </Card>
            </div>
        </Container>
      );
    }
  }
  
  export default withRouter(LoginPage);
  