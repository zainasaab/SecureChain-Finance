import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BlockchainProvider } from './context/BlockchainContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';
import './App.css'; 

const App = () => {
  return (
    <BlockchainProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route path="/transactions" component={Transactions} />
              <Route path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </main>
          <Footer />
        </div>
      </Router>
    </BlockchainProvider>
  );
};

export default App;
