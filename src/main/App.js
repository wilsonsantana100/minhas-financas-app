import React from 'react';

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import '../components/navbar'

import Rotas from './rotas';
import Navbar from '../components/navbar';


class App extends React.Component {
  render() {
    return(
      <div className="container">
        <Navbar />
        <Rotas />
    
      </div>
    )
  }

}

export default App



