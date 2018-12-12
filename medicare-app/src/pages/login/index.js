import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { View, Image, StyleSheet, AsyncStorage  } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Form, Input, Item, Label, Toast, Container, Content, Text, Button } from 'native-base';

import api from '../../services/api';

export default class Login extends Component {
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
    email: 'felipenegrelli@gmail.com',
    password: 'Felipe123',
    error: '',
  };

  // state = {
  //   email: 'felipenegrelli@gmail.com',
  //   password: 'Felipe123',
  //   error: '',
  // };

  handleEmailChange = (email) => {
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  handleCreateAccountPress = () => {
    this.props.navigation.navigate('Cadastro');
  };

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } 
    else {
      try {
        
        const response = await api.post('/users/login', {
          email: this.state.email,
          password: this.state.password,
        });

        await AsyncStorage.setItem('token', response.data.token);
        await AsyncStorage.setItem('id', response.data._id);

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Principal', params: { token: response.data.token } }),
          ],
        });
        this.props.navigation.dispatch(resetAction);

      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        console.log(_err)
      }
    }
  };

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
              placeholder='Email'
                value={this.state.email}
                onChangeText={this.handleEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item regular style={styles.formInput}>
              <Input 
                placeholder='Senha'
                value={this.state.password}
                onChangeText={this.handlePasswordChange}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
          </Form>

          {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}

          <Button block  style={styles.loginButton} onPress={this.handleSignInPress}>
            <Text>Login</Text>
          </Button>

          <Button transparent block style={styles.createButton} onPress={this.handleCreateAccountPress}>
            <Text>Criar Conta</Text>
          </Button>

        </Content>
              
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  createButton: {
    marginTop: 20
  },
  loginButton: {
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
