import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Selected from './Selected';

const client = new ApolloClient({
  uri: "http://qagapi.enetdefender.com/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>

        <Routes>
          <Route path='/selected' element={<Selected />} />
        </Routes>
      </Router>
    </React.StrictMode>
  </ApolloProvider>
);


