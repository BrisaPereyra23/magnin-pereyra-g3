import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { auth, db } from '../firebase/config'; 

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  onSubmit () {
    
  }

  render() {
    return (
      <View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
  
});

export default NewPost;
