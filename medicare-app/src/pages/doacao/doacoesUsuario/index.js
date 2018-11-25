import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Container, Header, Content, List, ListItem, Text, Body, Title, Subtitle, Left, Right, Button, Icon, Fab } from 'native-base';

export default class DoacoesUsuario extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    listaDoacoes: [
      {
        codigo: 1,
        nome: "Paracetamol - 500 mg",
        data: "09/10/2018"
      },
      {
        codigo: 2,
        nome: "Sibutramina - 25 mg",
        data: "12/10/2018"
      },
      {
        codigo: 3,
        nome: "Fluoxetina - 15 mg",
        data: "16/10/2018"
      },
    ]
  }

  handleListItemClick = (item) => {
    this.props.navigation.navigate('ExibirDoacao');
  }

  render() {

    return (
      <Container>

        <Header noRight>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Medicare</Title>
            <Subtitle>Minhas Doações</Subtitle>
          </Body>
          <Right>

          </Right>

        </Header>

        <Content padder>

          <List>
            {this.state.listaDoacoes.map((item, index) => {
              return (
                <ListItem key={item.codigo}
                  button={true}
                  onPress={() => this.handleListItemClick(item)}
                  first={index === 0}
                  last={index === this.state.listaDoacoes.length-1}
                >
                  <Body>
                    <Text>{item.nome}</Text>
                    <Text note>{item.data}</Text>
                  </Body>
                  <Right>
                      <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              )
            })}
          </List>

        </Content>

        <View style={{ flex: 1 }}>
          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('RealizarDoacao')}>
            <Icon name="add" />
          </Fab>
        </View>

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
