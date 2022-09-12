import React from 'react';


import Rotas from './rotas';
import Navbar from '../components/navbar';

import 'toastr/build/toastr.min.js'

import 'bootswatch/dist/flatly/bootstrap.css'
import '../custom.css'
import 'toastr/build/toastr.css'



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



