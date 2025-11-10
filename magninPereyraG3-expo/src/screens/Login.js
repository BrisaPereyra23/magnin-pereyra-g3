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
});};

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
          value={this.state.email}/>

        <TextInput
          style={styles.field}
          placeholder="Contraseña"
          secureTextEntry
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}/>

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password)}>
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </Pressable>

        <Pressable
          style={[styles.button, styles.buttonAlt]}
          onPress={() => this.props.navigation.navigate('Register')}>
          <Text style={styles.buttonText}>Registrate</Text>
        </Pressable>

        {this.state.error !== '' && (
        <Text style={styles.errorText}>{this.state.error}</Text>)}
      </View>
    );
  }
}

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: "#ff4d4d",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  field: {
    width: "90%",
    backgroundColor: "#2b2b2b",
    color: "#f2f2f2",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "90%",
    backgroundColor: "#ff4d4d",
    borderRadius: 10,
    paddingVertical: 12,
    marginTop: 5,
    marginBottom: 10,
  },
  buttonAlt: {
    backgroundColor: "#333",
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  errorText: {
    color: "#ff8080",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "500",
  },
});

