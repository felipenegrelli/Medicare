import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button
} from "reactstrap";
import { PanelHeader } from "components";
import api from "../../services/api";

class Usuarios extends React.Component {
  state = {
    error: "",
    listaUsuarios: [],
    esperandoAjax: true
  };

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de usuarios");

      await api
        .get("/doacoes")
        .then(res => {
          console.log("recebeu retorno");
          console.log(res);        
          if(JSON.stringify(this.state.listaDoacoes) !== JSON.stringify(res.data)){
            this.setState({ esperandoAjax: false });
            this.setState({ listaUsuarios: res.data });
            console.log("alterou estado");
            console.log(res.data);
          }        
        })
        .catch(res => {
          console.log(res);
          this.setState({ error: JSON.stringify(res) + "" });
        });

    } 
    catch(err){
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de usuários!' });
    }
  }

  componentDidMount() {
    this.atualizarLista();
  }

  formataData = (dateString) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("pt-Br");
  }

  montaTabela(){
    return (
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-left">Nome</th>
            <th className="text-center">Email</th>
            <th className="text-center">Tipo</th>
            <th className="text-center">Data de Cadastro</th> 
            <th className="text-right" style={{ paddingRight: 25 }}>Ações</th> 
          </tr>
        </thead>
        <tbody>
          {this.state.listaUsuarios.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.nomeMedicamento}</td>
                <td className="text-center">{item.tamanho + " mg"}</td>
                <td className="text-center">{item.quantidade}</td>
                <td className="text-center">{this.formataData(item.dataCadastro) }</td>
                <td className="text-right">
                  <button className="btn-icon btn btn-info btn-sm m-r-3">
                    <i className="now-ui-icons users_single-02"></i>
                  </button>
                  <button className="btn-icon btn btn-success btn-sm m-r-3">
                    <i className="now-ui-icons ui-2_settings-90"></i>
                  </button>
                  <button className="btn-icon btn btn-danger btn-sm">
                    <i className="now-ui-icons ui-1_simple-remove"></i>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    )
  }

  montaMensagemNenhumDado(){
    return (
      <div className="typography-line">
          <h4>
            Ainda não há nenhum usuário cadastrado!
          </h4>
        </div>
    )
  }

  montaExibicao(){
    if(this.state.esperandoAjax){
      return null;
    }
    else if (this.state.listaUsuarios.length > 0){
      return this.montaTabela();
    }
    else{
      return this.montaMensagemNenhumDado();
    }
  }

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>

            <Col xs={12}>
              <Card>
              <CardHeader>
                  <CardTitle className="float-left">Lista de Usuarios</CardTitle>
                  <Button color="info" className="float-right" href="/novo-usuario">Adicionar</Button>
                </CardHeader>
                <CardBody>
                  { this.montaExibicao() }
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default Usuarios;
