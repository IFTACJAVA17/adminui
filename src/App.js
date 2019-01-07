import React, { Component } from 'react';
import './App.css';
import AppRouter from './components/app.router';
import NavMenu from './components/nav.component';

class App extends Component {
  render() {
    return (
      <div className='App'>
          <NavMenu />
          <AppRouter /><br />
          &copy; IftacGaming
      </div>
    );
  }
}

export default App;