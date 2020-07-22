import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Dashboard from './views/Dashboard';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import TrashDashboard from './views/TrashDashboard';

function App() {
  return (
   <Router>
     <Switch>
       <Route exact path="/" component={Dashboard} />
       <Route exact path="/trash" component={TrashDashboard} />
     </Switch>
   </Router>
  );
}

export default App;
