import React from 'react';
import Card from '../../components/card'
import FormGroup from '../../components/form-group';
import { withRouter } from 'react-router-dom'
import LancamentoService from '../../app/service/lancamentoService';
import { mensagemSucesso, mensagemErro } from '../../components/toastr'

class CadastroLancamento extends React.Component {

    state = {
        descricao: '',
        mes: '',
        ano: '',
        valor: '',
        usuario: '',
        tipo: '',
        status: '' 
    }

    constructor(){
        super();
        this.service = new LancamentoService();
    }









    validar(){
        const msgs = []

        if(!this.state.nome){
            msgs.push('O campo nome é obrigatório.')
        }

        if(!this.state.email){
            msgs.push('O campo email é obrigatório')
        }else if( !this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/) ){
            msgs.push('Informe um Email válido.')
        }

        if(!this.state.senha || !this.state.senhaRepeticao){
            msgs.push('Digite a senha 2x.')
        }else if( this.state.senha !== this.state.senhaRepeticao ){
            msgs.push('As senhas não batem.')
        }

        return msgs;
    }

    cadastrar = () => {
        
        const msgs = this.validar();

        if(msgs && msgs.length > 0) {
            msgs.forEach( (msg, index ) => {
                mensagemErro(msg)
            });
            return false;
        }
        
        
        const lancamento = {
            descricao: this.state.descricao, 
            mes: this.state.mes,
            ano: this.state.ano,
            valor: this.state.valor, 
            usuario: this.state.usuario,
            tipo: this.state.tipo,
            status: this.state.status
        }
        
        this.service.salvar(lancamento)
            .then( response => {
                mensagemSucesso('Lancamento cadastrado com sucesso!')
                this.props.history.push('/login')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <Card title="Cadastro de Lançamento">
                <div className="row g-3">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup label="Descrição: *" htmlFor="inputDescricao">
                                <input type="text"
                                    id="inputDescricao"
                                    className="form-control"
                                    name="descricao"
                                    onChange={e => this.setState({ descricao: e.target.value })} />
                            </FormGroup>

                            
                                
                            
                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="email"
                                    id="inputEmail"
                                    className="form-control"
                                    name="email"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    id="inputSenha"
                                    className="form-control"
                                    name="senha"
                                    placeholder="Password"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>

                            
                          





                            <FormGroup label="Confirmar Senha: *" htmlFor="inputsenhaRepeticao">
                                <input type="password"
                                    id="inputsenhaRepeticao"
                                    className="form-control"
                                    name="senhaRepeticao"
                                    placeholder="Password"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success">Salvar</button>
                            <button onClick={this.cancelar} className="btn btn-danger">Cancelar</button>
                           

                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter ( CadastroLancamento )
