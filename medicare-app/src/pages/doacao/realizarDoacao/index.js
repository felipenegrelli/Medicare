import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { StackActions, NavigationActions } from 'react-navigation';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Container, Header, Content, Button, Text, Body, Title, Subtitle, Left, Right, Form, Item, Input, Label, Icon, Thumbnail, DatePicker } from 'native-base';

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
    nomeMedicamento: "",
    tamanho: null,
    quantidade: null,
    nomeMedico: "",
    dataValidade: "",
    error: ""
  };

   handleDonationSave = async () => {
     try{

      axios.defaults.headers.common['Authorization'] = await AsyncStorage.getItem('token');

      const dataValidadeFormatada = this.state.dataValidade.getFullYear() + "-" + 
      this.state.dataValidade.getMonth() + "-" +
      this.state.dataValidade.getDate();
  
      await api.post('/doacoes', {
        nomeMedicamento: this.state.nomeMedicamento,
        tamanho: this.state.tamanho,
        quantidade: this.state.quantidade,
        dataValidade: dataValidadeFormatada
      })
      .then(res => {
        console.log(res);
        this.props.navigation.navigate('DoacoesUsuario');
      })
      .catch((res) => {
        console.log(res);
        this.setState({ error: 'Houve um ao salvar o pedido: ' + res.statusMessage });
      });

    } 
    catch (_err) {
      console.log(_err);
      this.setState({ error: 'Houve um ao salvar o pedido: ' + _err.statusMessage });
    }

  };

  alteraData = (dataValidade) => {
    console.log("entou");
    this.setState({ dataValidade })
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
            <Subtitle>Nova Doação</Subtitle>
          </Body>
          <Right />
        </Header>

        <Content padder>

          <Form>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Nome do Medicamento'
                value={this.state.nomeMedicamento}
                onChangeText={(nomeMedicamento) => this.setState({ nomeMedicamento })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Tamanho (mg)'
                value={this.state.tamanho}
                onChangeText={(tamanho) => this.setState({ tamanho })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Quantidade'
                value={this.state.quantidade}
                onChangeText={(quantidade) => this.setState({ quantidade })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <DatePicker
                locale={"ptBr"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={true}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Data de Validade"
                textStyle={{ color: "#555" }}
                placeHolderTextStyle={{ color: "#555" }}
                format="YYYY-DD-MM"
                onDateChange={(dataValidade) => this.alteraData(dataValidade)}
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
  }
});
