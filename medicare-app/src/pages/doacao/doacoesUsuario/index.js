import React, { Component } from 'react';
import { StyleSheet, View, Image, AsyncStorage } from 'react-native';
import { Container, Header, Content, List, ListItem, Text, Body, Title, Subtitle, Left, Right, Button, Fab } from 'native-base';
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

      await api.get('/doacoes/user')
      .then((res) => {
        console.log("recebeu retorno");        
        if(JSON.stringify(this.state.listaDoacoes) != JSON.stringify(res.data)){
          this.setState({ listaDoacoes: res.data });
          console.log("alterou estado");
        }        
      })
      .catch((res) => {
        console.log("erro 1"); 
        console.log(JSON.stringify(res));
        this.setState({ error: JSON.stringify(res)+"" });
      });

    } 
    catch(err){
      console.log("erro 2"); 
      console.log(JSON.stringify(err));
      this.setState({ error: 'Ocorreu um erro ao atualizar a lista de pedidos!' });
    }
  }

  handleListItemClick = (idDoacao) => {
    this.props.navigation.navigate('ExibirDoacao', { idDoacao: idDoacao});
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

        <Header noRight>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Image source={require('../../../images/return-icon.png')} resizeMode="contain" />
            </Button>
          </Left>
          <Body>
            <Title>Medicare</Title>
            <Subtitle>Minhas Doações</Subtitle>
          </Body>
          <Right>
            <Button transparent onPress={() => this.atualizarLista()}>
                <Image source={require('../../../images/refresh-icon.png')} resizeMode="contain" />
              </Button>
          </Right>

        </Header>

        <Content padder>

          <List>
            {this.state.listaDoacoes.map((item, index) => {
              return (
                <ListItem key={item._id}
                  avatar
                  button={true}
                  onPress={() => this.handleListItemClick(item._id)}
                  first={index === 0}
                  last={index === this.state.listaDoacoes.length-1}
                >
                  <Left>
                      { this.montaIconeStatus(item.status) }
                    </Left>
                  <Body>
                    <Text>{item.medicamentoComercial.nome}</Text>
                    <Text note>Quantidade: {item.quantidade} - Data: { (new Date(item.dataCadastro)).toLocaleDateString() }</Text>
                  </Body>
                  <Right>
                    <Image source={require('../../../images/next-icon.png')} resizeMode="contain" />
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
            style={{ backgroundColor: '#5067FF' }}
            position="bottomRight"
            onPress={() => this.props.navigation.navigate('RealizarDoacao')}>
            <Image source={require('../../../images/add-icon.png')} resizeMode="contain" />
          </Fab>
        </View>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  }
});
