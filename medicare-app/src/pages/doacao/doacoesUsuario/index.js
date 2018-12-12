import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Body, Title, Subtitle, Left, Right, Button, Icon, Fab } from 'native-base';
import axios from 'axios';
import api from '../../../services/api';

export default class DoacoesUsuario extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    listaDoacoes: []
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => this.atualizarLista())
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de doacoes");
      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    

      await api.get('/doacoes')
      .then((res) => {
        console.log("recebeu retorno");        
        if(JSON.stringify(this.state.listaDoacoes) != JSON.stringify(res.data)){
          this.setState({ listaDoacoes: res.data });
          console.log("alterou estado");
        }        
      })
      .catch((res) => {
        console.log(res);
        this.setState({ error: JSON.stringify(res)+"" });
      });

    } 
    catch(err){
      console.log(err);
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
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
                <ListItem key={item._id}
                  button={true}
                  onPress={() => this.handleListItemClick(item)}
                  first={index === 0}
                  last={index === this.state.listaDoacoes.length-1}
                >
                  <Body>
                    <Text>{item.nomeMedicamento + " - " + item.tamanho + " mg"}</Text>
                    <Text note>Quantidade: {item.quantidade}</Text>
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
