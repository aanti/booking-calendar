import React, { Component } from 'react'

import Reservation from './views/Reservation/Reservation'

import './App.css'

class App extends Component {
  render () {
    return (
      <div className="app">
        <Reservation price={298} rating={{ rate: 4.4, numberOfRates: 123 }} />
      </div>
    )
  }
}

export default App
