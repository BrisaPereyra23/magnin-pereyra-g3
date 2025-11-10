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
          placeholder="Escribí tu post..."
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

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  title: { fontSize: 22, textAlign: "center", marginBottom: 15 },
  field: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "grey",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
  error: { color: "red", textAlign: "center", marginTop: 10 },
});

export default NewPost;