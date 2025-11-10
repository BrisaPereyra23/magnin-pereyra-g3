import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      error: ''
    };
  }

  onSubmit (email, password, username) {
    if (!email.includes('@')) {
      this.setState({ error: 'Email mal formateado' });
      return;
    }
    if (password.length < 6) {
      this.setState({ error: 'La contraseña debe tener al menos 6 caracteres' });
      return;
    }

  auth.createUserWithEmailAndPassword(email, password)
    .then((response) => {
      console.log('Usuario creado:', response.user.email);

      db.collection('users')
        .add({
          email: email,
          username: username,
          createdAt: new Date(),
        })
        .then(() => {
          console.log('Datos del usuario guardados en Firestore');
          this.setState({
            email: '',
            password: '',
            username: '',
            error: '',
          });
          this.props.navigation.navigate('Login');
        })
        .catch((err) => {
          console.log('Error guardando en Firestore:', err);
          this.setState({ error: 'No se pudo guardar el usuario en la base de datos.' });
        });
    })
    .catch((error) => {
      console.log('Error al crear usuario:', error);
      if (error.code === 'auth/email-already-in-use') {
        this.setState({ error: 'El email ya está registrado' });
      } else {
        this.setState({ error: 'Error al registrarse. Intente nuevamente.' });
      }
    });
};

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Formulario de Registro</Text>

        <TextInput
          style={styles.field}
          placeholder="Email"
          onChangeText={(text) => this.setState({ email: text })}
          value={this.state.email}/>

        <TextInput
          style={styles.field}
          placeholder="Usuario"
          onChangeText={(text) => this.setState({ username: text })}
          value={this.state.username}/>

        <TextInput
          style={styles.field}
          placeholder="Contraseña"
          onChangeText={(text) => this.setState({ password: text })}
          value={this.state.password}/>

        <Pressable style={styles.button} onPress={() => this.onSubmit(this.state.email, this.state.password, this.state.username)}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </Pressable>

        <Pressable
          style={[styles.button, {  }]}
          onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Ir a Login</Text>
        </Pressable>
        {this.state.error !== '' && (
          <Text style={styles.errorText}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}

export default Register;

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

