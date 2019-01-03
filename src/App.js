import React, { Component } from 'react';
import './App.css';
import AppRouter from './components/app.router';
import Menu from './components/menu.component';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Menu />
          <AppRouter />
      </div>
    );
  }
}

export default App;