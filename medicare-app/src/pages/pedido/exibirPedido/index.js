import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Icon } from 'native-base';

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
    nome: "Paracetamol 500 mg",
    data_validade: "05/2019",
    quantidade: 20,
    status: "Pendente"
  };

  async atualizar() {
    try {

      await api.get('/pedidos/')
      .then((res) => {
        this.setState({ listaPedidos: res.data});
      })
      .catch((res) => {
        this.setState({ error: JSON.stringify(res)+"" });
      });

    } 
    catch(err){
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
  }

  handleCancelarPedido = () => {
    this.props.navigation.navigate('Principal');
  };

  render() {
    return (
      <Container>

        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Medicare</Title>
            <Subtitle>Detalhes do Pedido</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this.atualizar()}>
              <Icon name='refresh' />
            </Button>
          </Right>
        </Header>

        <Content padder>

          <Form>
            <Item stackedLabel>
              <Label>Nome do Medicamento</Label>
              <Input disabled >{this.state.nome}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Data de Validade</Label>
              <Input disabled >{this.state.data_validade}</Input>
            </Item>
            <Item stackedLabel>
              <Label>Quantidade</Label>
              <Input disabled >{this.state.quantidade}</Input>
            </Item>
            <Item stackedLabel last>
              <Label>Status do Pedido</Label>
              <Input disabled >{this.state.status}</Input>
            </Item>
          </Form>

          <Button block danger style={{ marginTop: 50 }} onPress={this.handleCancelarPedido}>
            <Text>Cancelar Pedido</Text>
          </Button>

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
