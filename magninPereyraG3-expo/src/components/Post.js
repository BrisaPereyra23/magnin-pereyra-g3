import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Post extends Component {
  constructor(props) {
  super(props);
  this.state = {
    comment: "", 
  };
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
        if (this.state.comment !== ""){
          let comentario;
    
          if (this.props.data.comments){
            comentario = this.props.data.comments;
          } else {
            comentario = [];
          }
    
          comentario.push ({
            owner: auth.currentUser.email,
            comment: this.state.comment
          })
          
          db.collection ("posts").doc (this.props.id).update ({ comments: comentario })
          this.setState ({ comments: "" })
          
        }
      }
      render() {
    return (
      <View style={styles.card}>
      <Text style={styles.owner}>{this.props.data.owner}</Text>
      <Text style={styles.description}>{this.props.data.description}</Text>

      <View style={styles.likeRow}>
        <Text style={styles.likesText}>❤️ {this.props.data.likes.length}</Text>

        <Pressable style={styles.btnLike} onPress={() => this.like()}>
          <Text style={styles.btnText}>Like</Text>
        </Pressable>

        <Pressable style={styles.btnDislike} onPress={() => this.dislike()}>
          <Text style={styles.btnText}>Dislike</Text>
        </Pressable>
      </View>
    

        <TextInput
          style={styles.input}
          placeholder="Escribí un comentario..."
          value={this.state.comment}
          onChangeText={(text) => this.setState({ comment: text })}
        />

         <Pressable style={styles.btn} onPress={() => this.comentar()}>
          <Text style={styles.btnText}>Comentar</Text>
        </Pressable>

          {this.props.data.comments && this.props.data.comments.length > 0 && (
          <View style={styles.commentSection}>
          {this.props.data.comments.map((c, i) => (
          <Text key={i}> {c.owner}: {c.comment}</Text>
    ))}
  </View>
)}
</View>
);
      }
    }

export default Post;
      
const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#333",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "#fff",
  },
  owner: {
    fontWeight: "bold",
    color: 'rgb#131111(19 17 17)',
    fontSize: 15,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
   color: 'rgb#131111(19 17 17)',
    marginBottom: 10,
  },
  likeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 15,
    marginBottom: 10,
  },
  likesText: {
    fontSize: 15,
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  likeBtn: {
    backgroundColor: "#2b2b2b",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ff4d4d",
  },
  likeText: {
    color: "#ff4d4d",
    fontWeight: "600",
  },
  dislikeBtn: {
    backgroundColor: "#2b2b2b",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#999",
  },
  dislikeText: {
    
    fontWeight: "600",
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: "#333",
    paddingTop: 10,
    color: "rgb(19, 17, 17)"
  },
  input: {
    backgroundColor: "#262626",
    borderRadius: 8,
    padding: 8,
    color: 'rgb#131111(19 17 17)',
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#444",
  },
  commentButton: {
    color: "#ff4d4d",
    textAlign: "right",
    fontWeight: "bold",
  },
});