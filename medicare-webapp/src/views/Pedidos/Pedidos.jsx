import React from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col
} from "reactstrap";

import { PanelHeader } from "components";

import api from "../../services/api";

class TelaPedidos extends React.Component {
  state = {
    error: "",
    listaPedidos: [],
    precisaAtualizar: ""
  };

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de pedidos");

      await api
        .get("/pedidos")
        .then(res => {
          console.log("recebeu retorno");        
          if(JSON.stringify(this.state.listaPedidos) !== JSON.stringify(res.data)){
            this.setState({ listaPedidos: res.data });
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
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
  }

  componentDidMount() {
    this.atualizarLista();
  }

  montaMensagemNenhumDado(){
    return (
      <div className="typography-line">
          <h4>
            Ainda não há nenhum pedido cadastrada!
          </h4>
        </div>
    )
  }

  montaTabela(){
    return (
      <Table responsive>
        <thead className="text-primary">
          <tr>
            <th className="text-left">Remédio</th>
            <th className="text-center">Tamanho</th>
            <th className="text-center">Quantidade</th>
            <th className="text-center">Status</th>
            <th className="text-right" style={{ paddingRight: 25 }}>Ações</th> 
          </tr>
        </thead>
        <tbody>
          {this.state.listaPedidos.map((item, index) => {
            return (
              <tr key={item._id}>
                <td>{item.nomeRemedio}</td>
                <td className="text-center">{item.tamanho}</td>
                <td className="text-center">{item.quantidade}</td>
                <td className="text-center">{item.status}</td>
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

  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>

            <Col xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle tag="h4">Lista de Pedidos</CardTitle>
                </CardHeader>
                <CardBody>
                  { this.state.listaPedidos.length > 0 ? this.montaTabela() : this.montaMensagemNenhumDado(0)}
                </CardBody>
              </Card>
            </Col>

          </Row>
        </div>
      </div>
    );
  }
}

export default TelaPedidos;
