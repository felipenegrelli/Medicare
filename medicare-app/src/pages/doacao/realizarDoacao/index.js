import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { List, ListItem, Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, DatePicker } from 'native-base';

import api from '../../../services/api';

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
    idMedicamento: null,
    nomeMedicamento: null,
    quantidade: null,
    dataValidade: "",
    error: "",
    listaMedicamentos: []
  };

   handleDonationSave = async () => {
     try{

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');

      const dataValidadeFormatada = this.state.dataValidade.getFullYear() + "-" + 
      this.state.dataValidade.getMonth() + "-" +
      this.state.dataValidade.getDate();
  
      await api.post('/doacoes', {
        medicamentoComercial: this.state.idMedicamento,
        quantidade: this.state.quantidade,
        dataValidade: dataValidadeFormatada
      })
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('DoacoesUsuario');
      })
      .catch((res) => {
        console.log(res);
        this.setState({ error: 'Houve um erro ao salvar o pedido: ' + res.statusMessage });
      });

    } 
    catch (_err) {
      console.log(_err);
      this.setState({ error: 'Houve um erro ao salvar o pedido: ' + _err.statusMessage });
    }

  };

  alteraData = (dataValidade) => {
    console.log("entou");
    this.setState({ dataValidade })
  }

  async pesquisar(nome) {
    try {
      this.setState({ 
        idMedicamento: null,
        nomeMedicamento: nome
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
      idMedicamento: item._id,
      nomeMedicamento : item.nome,
      listaMedicamentos: []
     });

  }

  perdeFoco(){    
    this.setState({ listaMedicamentos: null });
    if(this.state.idMedicamento == null){
      this.setState({ nomeMedicamento: "" });
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
                noIndent
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
            <Subtitle>Nova Doação</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Form>

            <Item stackedLabel style={styles.formInput}>
              <Label>Medicamento</Label>
              <Input 
                value={this.state.nomeMedicamento}
                onChangeText={(nomeMedicamento) => this.pesquisar(nomeMedicamento)}
                onBlur={() =>  this.perdeFoco()}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            { this.mostaListaAutocomplete()}

            <Item stackedLabel style={styles.formInput}>
              <Label>Quantidade</Label>
              <Input 
                value={this.state.quantidade}
                onChangeText={(quantidade) => this.setState({ quantidade })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Text style={{ color: "#555", marginLeft: 15, marginTop: 15 }}>Data de Validade</Text>
            <View style={{ backgroundColor: "#fff", flex: 1 }}>
                <DatePicker
                  placeHolderText=" "
                  locale={"ptBr"}
                  timeZoneOffsetInMinutes={undefined}
                  modalTransparent={true}
                  animationType={"fade"}
                  androidMode={"default"}
                  textStyle={{ color: "#555", flex: 1 }}
                  placeHolderTextStyle={{ color: "#555" }}
                  format="YYYY-DD-MM"
                  onDateChange={(dataValidade) => this.alteraData(dataValidade)}
                />
              </View>

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
  }
});
