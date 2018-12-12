import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StyleSheet, AsyncStorage, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Toast } from 'native-base';
import api from '../../../services/api';

export default class ExibirPedido extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }).isRequired,
  };

  state = {
    id: null,
    dataCadastro: null,
    nomeMedico: null,
    nomeRemedio: null,
    quantidade: null,
    status: null,
    tamanho: null,
    crmMedico: null
  };

  async atualizar() {
    try {
      if(this.state.id !== "" && this.state.id !== null) {
        console.log("entrou para atualizar");
        console.log("id: " + this.state.id);
        await api.get('/pedidos/' + this.state.id)
        .then((res) => {

          const dataCadastro = new Date(res.data.dataCadastro);

          this.setState({ 
            dataCadastro: dataCadastro.toLocaleDateString(),
            nomeMedico: res.data.nomeMedico,
            nomeRemedio: res.data.medicamentoComercial.nome,
            quantidade: res.data.quantidade,
            status: res.data.status,
            crmMedico: res.data.crmMedico
          });

          console.log(res.data);
        })
        .catch((res) => {
          this.setState({ error: JSON.stringify(res)+"" });
          console.log(res);
        });
      }
      else {
        console.log("entrou mas nao tem id");
      }
    } 
    catch(err){
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
      console.log(err);
    }
  }

  async handleCancelarPedido () {
    try {

        console.log("entrou para cancelar");

        axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');

        await api.post('/pedidos/' + this.state.id + "/atualizarSituacao", {
          status: "CANCELADO"
        })
        .then((res) => {

          console.log(res.data);
          this.exibirToast();
          this.atualizar();
        })
        .catch((res) => {
          this.setState({ error: JSON.stringify(res)+"" });
          console.log(res);
        });

    } 
    catch(err){
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
      console.log(err);
    }

    //this.props.navigation.navigate('Principal');
  };

  
  exibirToast () {
    Toast.show({
      text: 'Pedido cancelado com sucesso!',
      buttonText: "Ok",
      duration: 3000,
      type: "success",
      position: "bottom"
    });
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => this.atualizar())
    ];

    const { navigation } = this.props;
    const idPedido = navigation.getParam('idPedido');
    console.log("entrou");
    console.log(idPedido);
    this.setState({ id: idPedido })
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  exibeBotaoCancelar() {
    if(this.state.status == "PENDENTE"){
      return (
          <Button block danger style={{ marginTop: 10, marginBottom: 30 }} onPress={() => this.handleCancelarPedido()}>
            <Text>Cancelar Pedido</Text>
          </Button>
      );
    }
  }

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../../images/return-icon.png')} resizeMode="contain" />
            </Button>
          </Left>
          <Body>
            <Title>Medicare</Title>
            <Subtitle>Detalhes do Pedido</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this.atualizar()}>
              <Image source={require('../../../images/refresh-icon.png')} resizeMode="contain" />
            </Button>
          </Right>
        </Header>

        <Content padder>

          <Form>
            <Item stackedLabel>
              <Label>Status do Pedido</Label>
              <Input disabled >{this.state.status}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Medicamento</Label>
              <Input disabled >{this.state.nomeRemedio}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Quantidade</Label>
              <Input disabled >{this.state.quantidade}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Data de Cadastro</Label>
              <Input disabled >{this.state.dataCadastro}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Nome do Medico</Label>
              <Input disabled >{this.state.nomeMedico}</Input>
            </Item>
            <Item stackedLabel last>
              <Label>CRM do Médico</Label>
              <Input disabled >{this.state.crmMedico}</Input>
            </Item>
          </Form>

          { this.exibeBotaoCancelar() }

        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  },
});
