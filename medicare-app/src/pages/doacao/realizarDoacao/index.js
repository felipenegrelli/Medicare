import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { StyleSheet } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Icon } from 'native-base';

export default class RealizarDoacao extends Component {
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

  handleDonationSave = () => {
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
            <Subtitle>Nova Doação</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Form>
            <Item floatingLabel>
              <Label>Nome</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Senha</Label>
              <Input />
            </Item>
          </Form>
          <Button block style={{ marginTop: 50 }} onPress={this.handleDonationSave}>
            <Text>Salvar</Text>
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
