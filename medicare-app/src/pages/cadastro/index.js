import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Image, StyleSheet } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Form, Input, Item, Label, Toast, Container, Content, Text, Button } from 'native-base';

import api from '../../services/api';

// import {
//   Container,
//   Logo,
//   SuccessMessage,
//   Input,
//   ErrorMessage,
//   Button,
//   ButtonText,
//   SignInLink,
//   SignInLinkText,
//   Text
// } from './styles';

export default class Cadastro extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
      goBack: PropTypes.func,
    }).isRequired,
  };

  state = {
    nome: '',
    email: '',
    password: '',
    dataNascimento: '',
    documento:'',
    rg:'',
    endereco:'',
    descricao:'',
    nomeMae:'',
    tipo: 1,
    error: '',
    success: '',
  };

  handleSignUpPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
    } else {
      try {
        await api.post('/users/cadastrar', {
          nome: this.state.nome,
          email: this.state.email,
          password: this.state.password,
          dataNascimento: this.state.dataNascimento,
          documento: this.state.documento,
          rg: this.state.rg,
          endereco: this.state.endereco,
          descricao: this.state.descricao,
          nomeMae: this.state.nomeMae,
          tipo: 1,
        })
        .then((res) => {
          this.setState({ error: "then" });
          this.history = res.data
        })
        .catch((res) => {
          console.log(res)
          this.setState({ error: JSON.stringify(res)+"" });
        });
        console.log("ok");
        this.setState({ success: 'Conta criada com sucesso!', error: '' });

        setTimeout(this.goToLogin, 500);
      } catch (_err) {
        //console.log(_err);
        this.setState({ error: _err+'!' });
      }
    }
  };

  goToLogin = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({ routeName: 'Login' }),
      ],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <Container>

        <Content padder>

          <View style={{ alignSelf: "center", marginTop: 50, marginBottom: 40 }}>
            <Image source={require('../../images/logo.png')} resizeMode="contain" />
          </View>

          <Form>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Nome'
                value={this.state.nome}
                onChangeText={(nome) => this.setState({ nome })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Email'
                value={this.state.email}
                onChangeText={(email) => this.setState({ email })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Senha'
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Data de Nascimento'
                value={this.state.dataNascimeto}
                onChangeText={(dataNascimento) => this.setState({ dataNascimento })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Nome da Mãe'
                value={this.state.nomeMae}
                onChangeText={(nomeMae) => this.setState({ nomeMae })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Documento'
                value={this.state.documento}
                onChangeText={(documento) => this.setState({ documento })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='RG'
                value={this.state.rg}
                onChangeText={(rg) => this.setState({ rg })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Endereço'
                value={this.state.endereco}
                onChangeText={(endereco) => this.setState({ endereco })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Descrição'
                value={this.state.descricao}
                onChangeText={(descricao) => this.setState({ descricao })}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>

          </Form>

          {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}

          <Button block  style={styles.signUpButton} onPress={this.handleSignUpPress}>
            <Text>Criar Conta</Text>
          </Button>

          <Button transparent block style={styles.goToLogin} onPress={this.goToLogin}>
            <Text>Voltar ao Login</Text>
          </Button>

        </Content>
            
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  goToLogin: {
    marginTop: 20
  },
  signUpButton: {
    marginTop: 50
  },
  formInput: {
    marginTop: 15
  },
  errorMessage: {
    textAlign: 'center',
    color: '#ce2029',
    fontSize: 16,
    marginBottom: 15,
    marginHorizontal: 20,
  }
});