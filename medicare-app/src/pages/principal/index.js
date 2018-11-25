import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet, View, Image } from 'react-native';
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

  render() {
    return (
      <Container>

        <Header noLeft>
          <Left />
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>

        <Content padder>

          {/* <View style={{ alignSelf: "center", marginTop: 50, marginBottom: 40 }}> */}
          {/* <Logo source={require('../../images/logo.png')} resizeMode="contain" /> */}
          {/* <Image source={require('../../images/logo.png')} resizeMode="contain" /> */}
          {/* </View> */}

          {/* <Form>
            <Item floatingLabel>
              <Label>Usuário</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Senha</Label>
              <Input />
            </Item>
          </Form> */}

          {/* <Button block  style={{marginTop: 50}}>
            <Text>Login</Text>
          </Button> */}

          {/* <Button transparent block style={styles.createButton}>
            <Text>Criar Conta</Text>
          </Button> */}

          <Button block style={{ marginTop: 20 }} onPress={this.onPressMinhasDoacoes}>
            <Text>Minhas Doações</Text>
          </Button>

          <Button block style={{ marginTop: 20 }} onPress={this.onPressMeusPedidos}>
            <Text>Meus Pedidos</Text>
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
  red: {
    color: 'red',
  },
});
