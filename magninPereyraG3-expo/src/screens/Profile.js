import React from 'react';
import { Component } from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';
import { auth }  from '../firebase/config';

class Profile extends Component {
  render () {
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del usuario</Text>

      <Text style={styles.info}>Email: {auth.currentUser ? auth.currentUser.email : ''}</Text>

      <Pressable style={styles.button} onPress={() => this.props.navigation.navigate('Login')}> 
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );}
} 
export default Profile;

const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },
title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#e50914',
  marginBottom: 20,
  textAlign: 'center',
  borderBottomWidth: 2,
  borderBottomColor: '#b00610', 
  paddingBottom: 4,
},
info: {
    color: '#fff',
    fontSize: 18,
    marginBottom: 35,
  },
button: {
  backgroundColor: '#e50914',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
  borderBottomWidth: 4,
  borderBottomColor: '#b00610', 
  alignItems: 'center',
},
textButton: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
