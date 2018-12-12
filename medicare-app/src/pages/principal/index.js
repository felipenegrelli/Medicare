import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, AsyncStorage, View, Image } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Left, Right, Form, Item, Input, Label } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Principal extends Component {
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

  };

  onPressMinhasDoacoes = () => {
    this.props.navigation.navigate('DoacoesUsuario');
  };

  onPressMeusPedidos = () => {
    this.props.navigation.navigate('PedidosUsuario');
  };

  onPressLogoff = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('id');
    AsyncStorage.removeItem('nome');
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <Container>

        <Header noLeft>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right>
            <Button transparent onPress={() => this.onPressLogoff()}>
              <Text>Sair</Text>
            </Button>
          </Right>
        </Header>

        <Content padder>

          <Button block style={{ marginTop: 20 }} onPress={this.onPressMinhasDoacoes}>
            <Text>Minhas Doações</Text>
          </Button>

          <Button block style={{ marginTop: 20 }} onPress={this.onPressMeusPedidos}>
            <Text>Meus Pedidos</Text>
          </Button>

          <Text>{}</Text>

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  }
});
