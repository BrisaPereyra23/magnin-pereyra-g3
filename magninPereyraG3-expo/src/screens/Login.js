import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth } from '../firebase/config';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: ''
    };
  }

  onSubmit (email, password) {

  if (!email.includes('@')) {
    this.setState({ error: 'Email mal formateado' });
    return;
  }
  if (password.length < 6) {
    this.setState({ error: 'La contraseña debe tener al menos 6 caracteres' });
    return;
  }


  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      this.props.navigation.navigate('HomeTab');
    })
    .catch((error) => { 
  console.log('Error al iniciar sesión:', error);

  if (error.code === 'auth/invalid-email') {
    this.setState({ error: 'Email mal formateado' });
  } else if (error.code === 'auth/wrong-password') {
    this.setState({ error: 'Contraseña incorrecta' });
  } else if (error.code === 'auth/user-not-found') {
    this.setState({ error: 'Usuario no encontrado' });
  } else {
    this.setState({ error: 'Ocurrió un problema al iniciar sesión. Intente nuevamente.' });
  }
});

};

  render() {

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Login</Text>

        <TextInput
          style={styles.field}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}
        />

        <TextInput
          style={styles.field}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}
        />

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonAlt]}
          onPress={() => this.props.navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Ir a Registro</Text>
        </Pressable>

        {this.state.error !== '' && (
        <Text style={styles.errorText}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
  
});

export default Login;
