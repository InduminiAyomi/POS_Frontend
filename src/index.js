import React from 'react';
import ReactDOM from 'react-dom';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App';
// import LoginPage from './Components/LoginPage';
// import OrderList from './Components/OrderList';

// const routing = (
//     <Router>
//       <div>
//         <Route exact path="/" component={App} />
//         <Route path="/login" component={LoginPage} />
//         <Route path="/orders" component={OrderList} />
//       </div>
//     </Router>
//   )

// ReactDOM.render(routing, document.getElementById('root'));

ReactDOM.render(<App/>, document.getElementById('root'));