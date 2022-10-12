import ApiService from '../apiservice';

class LancamentoService extends ApiService{

    constructor(){
        super('/api/lancamentos')
    }

    autenticar(credenciais){
        return this.post('/autenticar', credenciais)
    }


    
    salvar(lancamento){
        return this.post('/', lancamento);
    }


}

export default LancamentoService;