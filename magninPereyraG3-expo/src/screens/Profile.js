import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

function Profile({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil del usuario</Text>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.textButton}>Desloguearse</Text>
      </Pressable>
    </View>
  );
}
export default Profile;