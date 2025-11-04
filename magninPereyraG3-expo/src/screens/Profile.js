import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 22, marginBottom: 20 },
  info: { fontSize: 16, marginBottom: 30 },
  button: { backgroundColor: "grey", padding: 10, borderRadius: 8 },
  textButton: { color: '#fff', fontSize: 16 },
});

