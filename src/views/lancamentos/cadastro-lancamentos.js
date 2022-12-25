import React from 'react'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'

import * as messages from '../../components/toastr'
import { withRouter } from 'react-router-dom'


import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localstorageService'





class CadastroLancamentos extends React.Component{
    

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        showConfirmDialog: false
        
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }

       
    cadastrar = () => {
        
        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const { descricao, valor, mes, ano, tipo } = this.state;
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id };
        
        this.service.salvar(lancamento)
            .then( response => {
                messages.mensagemSucesso('Lancamento cadastrado com sucesso!')
                this.props.history.push('/consulta-lancamentos')
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
    }



    cancelar = () => {
        this.props.history.push('/login')
    }

    handleChange = (event) => {
        const value = event.target.value;
        const name = event.target.name;

        this.setState({ [name] : value })
    }
    
    
    render(){

        const meses = this.service.obetrListaMeses();
        const tipos = this.service.obterListaTipos();

        return (
            <Card title="Cadastro de Lançamentos">
                
                
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *" >
                            <input type="text"
                                id="inputDescricao"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>  

                <div className="row">
                    <div className="col-md-6">
                        <FormGroup htmlFor="inputAno" label="Ano: *">
                            <input type="text"
                                id="inputAno"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} 
                                placeholder="Digite o Ano" />
                        </FormGroup>
                    </div>

                    <div className="col-md-6">
                        <FormGroup htmlFor="inputMes" label="Mês: ">
                            <SelectMenu id="inputMes"
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} 
                                lista={meses} /> 
                        </FormGroup>
                    </div>
                </div>                                   
                               

                <div className="row">
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputValor" label="Valor: *">
                            <input type="text"
                                id="inputValor"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} 
                                placeholder="Digite o valor" />
                        </FormGroup>
                    </div>
                    
                    <div className="col-md-4">
                        <FormGroup htmlFor="inputTipo" label="Tipo de Lançamento: ">
                            <SelectMenu id="inputTipo"
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange} 
                                lista={tipos} /> 
                        </FormGroup>
                    </div>

                    <div className="col-md-4">
                        <FormGroup htmlFor="inputStatus" label="Status: ">
                            <input type="text" 
                                id="inputStatus"
                                className="form-control"
                                name="status"
                                value={this.state.status}
                                disabled />
                        </FormGroup>
                    </div>
                </div>                                   
                    
                <div className="row">
                    <div className="col-md-6">
                        <button onClick={this.cadastrar}   className="btn btn-success">Salvar</button>
                        <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>
            </Card>  
        )
    }
}

export default withRouter(CadastroLancamentos);