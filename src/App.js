import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    // this is showing that the Layout.js has all the browser routers we need
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
