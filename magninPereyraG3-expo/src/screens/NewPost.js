import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: "",
      error: "",
      comments: "",
    };
  }

  crearPost() {
    if (this.state.description === "") {
      this.setState({ error: "El post no puede estar vacío." });
      return;}
    db.collection("posts")
      .add({
        owner: auth.currentUser.email,
        description: this.state.description,
        likes: [],
        comments: [],
        createdAt: new Date(), 
      })
      .then(() => {
        this.setState({ description: "", error: "" });
        this.props.navigation.navigate("Home");
      })
      .catch(() => {
        this.setState({ error: "Error al crear el post." });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.field}
          placeholder="Escribí sobre tu auto, una carrera o una anécdota en la ruta..."
          multiline
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}/>

        <Pressable style={styles.button} onPress={() => this.crearPost()}>
          <Text style={styles.buttonText}>Publicar</Text>
        </Pressable>

        {this.state.error !== "" && (
          <Text style={styles.error}>{this.state.error}</Text>
        )}
      </View>
    );
  }
}


export default NewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0e0e',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#e50914',
    textAlign: 'center',
    marginBottom: 25,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  field: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 15,
    minHeight: 100,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e50914',
    paddingVertical: 12,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#e50914',
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: '#ff4d4d',
    textAlign: 'center',
    marginTop: 10,
    fontSize: 14,
  },
});
