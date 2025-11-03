import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  componentDidMount() {
    //aca va el db
  }

  render () {
    return (
        <View>
        <Text>Bienvenido al Home</Text>
        <Text>Posteos:</Text>
        <FlatList><Text>aca va la flatlist</Text></FlatList>
        </View>
    )
  }
}

export default Home;