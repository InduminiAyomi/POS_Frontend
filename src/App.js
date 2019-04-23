import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import MainPage from './Components/MainPage';
import OrderItems from './Components/OrderItems';
// import AddItems from './Components/AddItems';


class App extends Component {
  render() {
    return (

      <Router>
        <div className="App">
          <Route exact path="/" render = {props => (
            <React.Fragment>
              <LoginPage />
            </React.Fragment>
          )} />

          <Route path="/MainPage" component={MainPage} />
          <Route path="/OrderItems/:OrderId" component={OrderItems} />
          {/* <Route path="/AddItems/:OrderId" component={AddItems} /> */}
        </div>
      </Router>
      
    );
  }
}

export default App;


