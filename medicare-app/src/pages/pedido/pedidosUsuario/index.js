import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Toast, Container, Header, Content, List, ListItem, Text, Body, Title, Subtitle, Left, Right, Button, Icon, Fab } from 'native-base';
import axios from 'axios';
import api from '../../../services/api';

export default class PedidosUsuario extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    error: '',
    listaPedidos: [],
    precisaAtualizar: ''
  }

  async atualizarLista() {
    try {
      console.log("entrou para atualizar lista de pedidos");

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    

      await api.get('/pedidos/user')
      .then((res) => {
        console.log("recebeu retorno");        
        if(JSON.stringify(this.state.listaPedidos) != JSON.stringify(res.data)){
          this.setState({ listaPedidos: res.data });
          console.log("alterou estado");
          console.log(res.data);
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

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener("didFocus", () => this.atualizarLista())
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  handleClick = (idPedido) => {
    this.props.navigation.navigate('ExibirPedido', { idPedido: idPedido})
  }

  montaIconeStatus(status) {
    let cor = "";
    let icone = "";
    let letra = "";

    switch(status) {
      case "PENDENTE":
        cor = "#FF9501";
        icone = "reload1";
        letra = "P";
        break;
        case "RECUSADO":
        cor = "#FF0000";
        icone = "refresh";
        letra = "R";
        break;
        case "ACEITO":
        cor = "#00CC00";
        icone = "refresh";
        letra = "A";
        break;
        case "ENTREGUE":
        cor = "#FF9501";
        icone = "refresh";
        letra = "E";
        break;
        case "CANCELADO":
        cor = "#FF0000";
        icone = "cancel";
        letra = "C";
        break;

    }

    return (
      <Button style={{ backgroundColor: cor }}>
          <Text bold>{letra}</Text>
      </Button>
      );
  }

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
              <Subtitle>Meus Pedidos</Subtitle>
            </Body>
            <Right>
              <Button transparent onPress={() => this.atualizarLista()}>
                <Icon name='refresh' />
              </Button>
            </Right>

          </Header>

          <Content padder>

            {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
            <List>
              {this.state.listaPedidos.map((item, index) => {
                return (
                  <View key={item._id}>
                  <ListItem 
                    avatar
                    button={true}
                    onPress={() => this.handleClick(item._id)}
                    first={index === 0}
                    last={index === this.state.listaPedidos.length - 1}                  
                    >
                    <Left>
                      { this.montaIconeStatus(item.status )}
                    </Left>
                    <Body>
                      <Text>{item.nomeRemedio + " - " + item.tamanho + " mg"}</Text>
                      <Text note>Quantidade: {item.quantidade}</Text>
                    </Body>
                    <Right>
                      <Icon name="arrow-forward" />
                    </Right>
                  </ListItem>
                  </View>
                )
              })}
            </List>

          </Content>

          <Fab
            active={true}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('RealizarPedido')}>
            <Icon name="add" />
          </Fab>

        </Container>
      );
    }
  }

  const styles = StyleSheet.create({
    createButton: {
      marginTop: 20
    },
    errorMessage: {
      textAlign: 'center',
      color: '#ce2029',
      fontSize: 16,
      marginBottom: 15,
      marginHorizontal: 20,
    }
  });
