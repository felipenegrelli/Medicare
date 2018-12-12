import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StyleSheet, AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Toast } from 'native-base';
import api from '../../../services/api';

export default class ExibirDoacao extends Component {
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
    nomeMedicamento: null,
    dataCadastro: null,
    dataValidade: null,
    quantidade: null,
    status: null
  };

  
  async atualizar() {
    try {
      if(this.state.id !== "" && this.state.id !== null) {
        console.log("entrou para atualizar");
        console.log("id: " + this.state.id);
        await api.get('/doacoes/' + this.state.id)
        .then((res) => {

          const dataCadastro = new Date(res.data.dataCadastro);
          const dataValidade = new Date(res.data.dataValidade);

          this.setState({ 
            nomeMedicamento: res.data.medicamentoComercial.nome,
            dataCadastro: dataCadastro.toLocaleDateString(),
            dataValidade: dataValidade.toLocaleDateString(),            
            quantidade: res.data.quantidade,
            status: res.data.status
          });

          console.log(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
      }
      else {
        console.log("entrou mas nao tem id");
      }
    } 
    catch(err){
      console.log(err);
    }
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => this.atualizar())
    ];

    const { navigation } = this.props;
    const idDoacao = navigation.getParam('idDoacao');
    console.log("entrou");
    console.log(idDoacao);
    this.setState({ id: idDoacao })
  }
  
  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  async handleCancelarDoacao () {
    try {
        console.log("entrou para cancelar");
        console.log("ID: "+ this.state.id);
        axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');

        await api.post('/doacoes/' + this.state.id + "/atualizarSituacao", {
          status: "CANCELADO"
        })
        .then((res) => {
          console.log(res.data);
          Toast.show({
            text: 'Doação cancelada com sucesso!',
            buttonText: "Ok",
            duration: 3000,
            type: "success",
            position: "bottom"
          });
          this.atualizar();
        })
        .catch((res) => {
          console.log(res);
          Toast.show({
            text: 'Ocorreu um erro ao tentar cancelar a doação!',
            buttonText: "Ok",
            duration: 3000,
            type: "danger",
            position: "bottom"
          });
        });

    } 
    catch(err){
      console.log(err);
      Toast.show({
        text: 'Ocorreu um erro ao tentar cancelar a doação!',
        buttonText: "Ok",
        duration: 3000,
        type: "danger",
        position: "bottom"
      });
    }
  };

  exibeBotaoCancelar() {
    if(this.state.status == "PENDENTE"){
      return (
          <Button block danger style={{ marginTop: 10, marginBottom: 30 }} onPress={() => this.handleCancelarDoacao()}>
            <Text>Cancelar Doação</Text>
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
            <Subtitle>Detalhes da Doação</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Form>
            <Item stackedLabel last>
              <Label>Status da Doação</Label>
              <Input disabled >{this.state.status}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Data de Cadastro</Label>
              <Input disabled >{this.state.dataCadastro}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Medicamento</Label>
              <Input disabled >{this.state.nomeMedicamento}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Data de Validade</Label>
              <Input disabled >{this.state.dataValidade}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Quantidade</Label>
              <Input disabled >{this.state.quantidade}</Input>
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
