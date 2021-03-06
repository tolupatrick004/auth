import React, { Component } from 'react';
import { Text } from 'react-native'; 
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    loading: false
  }

  onButtonPress = () => {
    const { email, password } = this.state;

    this.setState(() => ({ error: '', loading: true }));

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      this.onLoginSuccess();
    })
    .catch(() => {
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
          this.onLoginSuccess();
        })
        .catch(() => {
          this.onLoginFailure();
        });
    });  
  }

  onLoginSuccess = () => {
    this.setState(() => ({
      email: '',
      password: '',
      loading: false,
      error: ''
    }));
  }

  onLoginFailure = () => {
    this.setState(() => ({
      error: 'Authentication Failed',
      loading: false
    }));
  }

  renderButton = () => {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }
    return (
      <Button onPress={this.onButtonPress}>
        Log in
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            onChangeText={email => this.setState({ email })} 
          />
        </CardSection>
        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={style.errorTextStyle}>
          {this.state.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
    );
  }
}

const style = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default LoginForm;
