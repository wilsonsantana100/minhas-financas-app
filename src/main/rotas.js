import React from 'react'

import Login from '../views/login'
import CadastroUsuario from '../views/cadastroUsuario'

import {Route, Switch, HashRouter } from 'react-router-dom'


function Rotas() {
    return(
        <HashRouter>
            <switch>
                <Route path="/login" component={Login} />
                <Route path="/cadastroUsuario" component={CadastroUsuario} />
            </switch>
        </HashRouter>
    )

}

export default Rotas