import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { List, ListItem, Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Thumbnail } from 'native-base';

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
    idRemedio: null,
    nomeRemedio: "",
    quantidade: null,
    nomeMedico: "",
    crmMedico: "",
    error: "",
    listaMedicamentos: []
  };

   handleDonationSave = async () => {
     try{
      console.log("entrou para salvar");
      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    
      let obj = {
        medicamentoComercial: this.state.idRemedio,
        quantidade: this.state.quantidade,
        nomeMedico: this.state.nomeMedico,
        crmMedico: this.state.crmMedico
      };
      console.log(obj);
      await api.post('/pedidos', obj)
      .then(res => {
        this.props.navigation.navigate('PedidosUsuario');
      })
      .catch((res) => {
        console.log(res);
        this.setState({ error: 'Houve um ao salvar o pedido: ' + res.statusMessage });
      });

    } catch (_err) {
      console.log(_err);
      this.setState({ error: 'Houve um ao salvar o pedido: ' + _err.statusMessage });
    }

  };


  async pesquisar(nome) {
    try {
      this.setState({ 
        idRemedio: null,
        nomeRemedio: nome
       });
      console.log("entrou para pesquisar");

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');    

      await api.get('/medicamentos/medicamentoscomerciais?medicamento=' + nome)
      .then((res) => {
        console.log("recebeu retorno");     
        console.log(res.data);
        if(JSON.stringify(this.state.listaMedicamentos) != JSON.stringify(res.data)){
          this.setState({ listaMedicamentos: res.data });
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

  selecionaItem(item){
    this.setState({ 
      idRemedio: item._id,
      nomeRemedio : item.nome,
      listaMedicamentos: []
     });

  }

  perdeFoco(){    
    this.setState({ listaMedicamentos: null });
    if(this.state.idRemedio == null){
      this.setState({ nomeRemedio: "" });
    }
  }

  mostaListaAutocomplete () {
    if(this.state.listaMedicamentos != null && this.state.listaMedicamentos.length > 0){
      return (
        <List>
          {this.state.listaMedicamentos.map((item, index) => {
            return (
              <View key={item._id}>
              <ListItem 
                onPress={() => this.selecionaItem(item)}               
                >
                <Body>
                  <Text>{item.nome}</Text>
                  <Text note>{item.medicamento.nomeMedicamento}</Text>
                </Body>
              </ListItem>
              </View>
            )
          })}
        </List>
      );
    }
    else{
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
                onChangeText={(nomeRemedio) => this.pesquisar(nomeRemedio)}
                onBlur={() =>  this.perdeFoco()}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            { this.mostaListaAutocomplete()}

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

            <Item stackedLabel>
              <Label>CRM do Médico</Label>
              <Input 
                value={this.state.crmMedico}
                onChangeText={(crmMedico) => this.setState({ crmMedico })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
          </Form>

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
