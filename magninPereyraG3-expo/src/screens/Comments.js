import React, { Component } from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: "",
      post: null
    };
  }
  componentDidMount() {
   
  const postId =this.props.route.params.id


  if (postId) {
    db.collection("posts").doc(postId).onSnapshot((doc) => {
        if (doc.exists) {
          this.setState({
            post: { id: doc.id, data: doc.data() },});
        }
      });
  }
}

  comentar() {
    if (this.state.comment !== "" && this.state.post) {
      const postId = this.state.post.id;
      const comentarios = this.state.post.data.comments ? this.state.post.data.comments : [];

      comentarios.push({
        owner: auth.currentUser.email,
        comment: this.state.comment,
      });

      db.collection("posts")
        .doc(postId)
        .update({ comments: comentarios })
        .then(() => {
          this.setState({ comment: "" });
        })
        .catch((error) => console.log(error));
    }
  }

  render() {
  const post = this.state.post;

  return (
    <View style={styles.container}>
      {
        post && post.data ? (
          <View>
            <View style={styles.postHeader}>
              <Text style={styles.owner}>{post.data.owner}</Text>
              <Text style={styles.description}>{post.data.description}</Text>
            </View>

            {post.data.comments && post.data.comments.length > 0 ?
             post.data.comments.map((c, i) => (
                <View key={i} style={styles.commentBlock}>
                  <Text style={styles.commentOwner}>{c.owner}</Text>
                  <Text style={styles.commentText}>{c.comment}</Text>
                </View>
              )):<Text style={styles.noComments}>Aún no hay comentarios.</Text>}
            <TextInput
              style={styles.input}
              placeholder="Escribí un comentario..."
              value={this.state.comment}
              onChangeText={(text) => this.setState({ comment: text })}/>
            <Pressable style={styles.btn} onPress={() => this.comentar()}>
              <Text style={styles.btnText}>Comentar</Text>
            </Pressable>
          </View>
        ):(<Text style={styles.loadingText}>Cargando publicación...</Text>)
      }
    </View>
  );
}

}

export default Comment
const styles = StyleSheet.create({
  container: {},})//pasar el css de comentarios aca