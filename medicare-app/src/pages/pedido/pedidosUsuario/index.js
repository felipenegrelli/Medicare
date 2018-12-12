import React, { Component } from 'react';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { Toast, Container, Header, Content, List, ListItem, Text, Body, Title, Subtitle, Left, Right, Button, Fab } from 'native-base';
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

  montaIconeStatus = (status) => {
    const iconePendente = require("../../../images/waiting-icon.png");
    const iconeRecusado = require("../../../images/refused-icon.png");
    const iconeAceito = require("../../../images/approved-icon.png");
    const iconeEntregue = require("../../../images/delivered-icon.png");
    const iconeCancelado = require("../../../images/cancelled-icon.png");

    try{
      console.log("Entrou montar Icone");
      if(status != null){
        let icone = "";
        console.log("Status: " + status);
        switch(status) {
  
          case "RECUSADO":
            return (<Image source={iconeRecusado} resizeMode="contain" />);
            break;
          case "PENDENTE":
            return (<Image source={iconePendente} resizeMode="contain" />);
            break;
          case "ACEITO":
            return (<Image source={iconeAceito} resizeMode="contain" />);
            break;
          case "ENTREGUE":
            return (<Image source={iconeEntregue} resizeMode="contain" />);
            break;
          case "CANCELADO":
            return (<Image source={iconeCancelado} resizeMode="contain" />);
            break;
        }        
      }
      else {
        return null;
      }
    }
    catch(_err) {
      console.log(_err);
      return null;
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
              <Subtitle>Meus Pedidos</Subtitle>
            </Body>
            <Right>
              <Button transparent onPress={() => this.atualizarLista()}>
                <Image source={require('../../../images/refresh-icon.png')} resizeMode="contain" />
              </Button>
            </Right>

          </Header>

          <Content padder>

            {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
            <List>
              {this.state.listaPedidos.map((item, index) => {
                return (
                  <View key={ item._id }>
                  <ListItem 
                    avatar
                    button={ true }
                    onPress={ () => this.handleClick(item._id) }
                    first={ index === 0 }
                    last={ index === this.state.listaPedidos.length - 1 }                  
                    >
                    <Left>
                      { this.montaIconeStatus(item.status) }
                    </Left>
                    <Body>
                      <Text>{ item.medicamentoComercial.nome }</Text>
                      <Text note>Quantidade: { item.quantidade } - Data: { (new Date(item.dataCadastro)).toLocaleDateString() }</Text>
                    </Body>
                    <Right>
                    <Image source={require('../../../images/next-icon.png')} resizeMode="contain" />
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
            <Image source={require('../../../images/add-icon.png')} resizeMode="contain" />
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
      fontSize: 16,
      marginBottom: 15,
      marginHorizontal: 20,
    }
  });
