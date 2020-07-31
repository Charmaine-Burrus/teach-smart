import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/Layout';

function App() {
  return (
    <div className="App">
      {/* this is showing that the Layout.js has all the browser routers we need */}
      {/* <img src={assessment} className="card-img-top card-pics" alt="Assessment"/> */}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </div>
  );
}

export default App;
