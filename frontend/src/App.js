import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/Home/Home';
import Signin from './Page/Signin/Signin';
import Profile from './Page/Profile/Profile';
import Transaction from './Page/Transaction/Transaction';
import Error from './Page/Error/Error';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/transactions/:transactionId" element={<Transaction />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
