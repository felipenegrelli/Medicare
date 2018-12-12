import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StackActions, NavigationActions } from 'react-navigation';
import { StyleSheet, View, AsyncStorage, TouchableOpacity, } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Icon, Thumbnail } from 'native-base';

import api from '../../../services/api';

export default class RealizarPedido extends Component {
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
    nomeRemedio: "",
    tamanho: null,
    quantidade: null,
    nomeMedico: "",
    error: "",
    query: ""

  };

   handleDonationSave = async () => {
     try{

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    
  
      await api.post('/pedidos', {
        nomeRemedio: this.state.nomeRemedio,
        tamanho: this.state.tamanho,
        quantidade: this.state.quantidade,
        nomeMedico: this.state.nomeMedico,
      })
      .then(res => {
        this.props.navigation.navigate('PedidosUsuario');
      })
      .catch((res) => {
        this.setState({ error: 'Houve um ao salvar o pedido: ' + _err.statusMessage });
      });

    } catch (_err) {
      this.setState({ error: 'Houve um ao salvar o pedido: ' + _err.statusMessage });
    }

  };


  async pesquisar(nome) {
    try {
      console.log("entrou para atualizar lista de pedidos");

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    

      await api.get('/medicamentos')
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
            <Subtitle>Novo Pedido</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Form>

            <Item stackedLabel>
              <Label>Medicamento</Label>
              <Input 
                value={this.state.nomeRemedio}
                onChangeText={(nomeRemedio) => this.setState({ nomeRemedio })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>


            <Item stackedLabel>
              <Label>Quantidade</Label>
              <Input 
                value={this.state.quantidade}
                onChangeText={(quantidade) => this.setState({ quantidade })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item stackedLabel>
              <Label>Nome do Médico</Label>
              <Input 
                value={this.state.nomeMedico}
                onChangeText={(nomeMedico) => this.setState({ nomeMedico })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
          </Form>

          {/* <View style={styles.prescritionLabel} >
            <Text style={styles.prescritionLabelText}>Foto da Prescrição Médica</Text>
          </View> */}

          {/* <View style={styles.prescritionCanvas}>

            <View style={styles.prescritionData}>
              <View style={styles.prescritionText}>
                <Text>Tire uma foto da Prescrição Médica</Text>
              </View>
              <View style={styles.prescritionImage}>
                <Thumbnail></Thumbnail>
              </View>
            </View>

            <View style={styles.prescritionButtons}>
              <Button bordered primary style={{ marginRight: 5 }}>
                <Text>Tirar Foto</Text>
              </Button>
              <Button bordered danger disabled>
                <Text>Remover Foto</Text>
              </Button>
            </View>

          </View> */}

          {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}

          <Button block style={styles.saveButton} onPress={this.handleDonationSave}>
            <Text>Salvar</Text>
          </Button>

        </Content>

      </Container >
    );
  }
}

const styles = StyleSheet.create({
  formInput: {
    marginTop: 15
  },
  saveButton: {
    marginTop: 10
  },
  prescritionCanvas: {
    height: 220,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ccc',
    color: '#fff',
    padding: 12,
    textAlign: 'center',
    marginLeft: 0
  },
  prescritionData: {
    alignItems: 'center',
    textAlign: 'center',
    height: 150,
  },
  prescritionButtons: {
    height: 70,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prescritionLabel: {
    marginLeft: 0,
    marginTop: 20
  },
  prescritionLabelText: {
    color: "#999"
  },
  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  }
});
