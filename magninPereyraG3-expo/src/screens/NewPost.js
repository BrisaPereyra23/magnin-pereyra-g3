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
      return;
    }
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

  like = () => { // no vimos con => pero lo pongo para que no marque error y hay que preguntar
    if (!this.props.data.likes.includes (auth.currentUser.email)){
      this.props.data.likes.push (auth.currentUser.email)
      db.collection ("posts").doc (this.props.id).update ({
        likes: this.props.data.likes
      })
    }}
  
  dislike = () => {
    let nuevaLista = [];
    for (let i=0; i< this.props.data.likes.length; i++){
      if (this.props.data.likes[i] !== auth.currentUser.email){
        nuevaLista.push (this.props.data.likes[i])
      }
    }
    db.collection ("posts").doc (this.props.id).update ({
      likes: nuevaLista
    })
  }
  
  comentar = () => {
    if (this.state.comments !== ""){
      let comments;

      if (this.props.data.comments){
        comentario = this.props.data.comments;
      } else {
        comentario = [];
      }

      comentario.push ({
        owner: auth.currentUser.email,
        comment: this.state.comments
      })
      
      db.collection ("posts").doc (this.props.id).update ({ comments: comentario })
      this.setState ({ comments: "" })
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Nuevo Post</Text>

        <TextInput
          style={styles.field}
          placeholder="Escribí tu post..."
          multiline
          onChangeText={(text) => this.setState({ description: text })}
          value={this.state.description}
        />

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
