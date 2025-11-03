import React, { Component } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { db, auth } from "../firebase/config";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likeado: false,
    };
  }

  componentDidMount() {
    const { data } = this.props;
    if (data.likes.includes(auth.currentUser.email)) {
      this.setState({ likeado: true });
    }
  }

  like() {
    const { id, data } = this.props;
    const nuevosLikes = [...data.likes, auth.currentUser.email];

    db.collection("posts")
      .doc(id)
      .update({
        likes: nuevosLikes,
      })
      .then(() => this.setState({ likeado: true }))
      .catch((e) => console.log(e));
  }

  dislike() {
    const { id, data } = this.props;
    const nuevosLikes = data.likes.filter(
      (email) => email !== auth.currentUser.email
    );

    db.collection("posts")
      .doc(id)
      .update({
        likes: nuevosLikes,
      })
      .then(() => this.setState({ likeado: false }))
      .catch((e) => console.log(e));
  }

  deletePost() {
    const { id } = this.props;
    db.collection("posts").doc(id).delete();
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.card}>
        <Text style={styles.owner}>{data.owner}</Text>
        <Text style={styles.description}>{data.description}</Text>

        <Text style={styles.likes}>{data.likes.length} me gusta</Text>

        <Pressable
          onPress={() =>
            this.state.likeado ? this.dislike() : this.like()
          }
        >
          <Text style={styles.likeBtn}>
            {this.state.likeado ? "Quitar me gusta" : "Me gusta"}
          </Text>
        </Pressable>

        {data.owner === auth.currentUser.email && (
          <Pressable onPress={() => this.deletePost()}>
            <Text style={styles.deleteBtn}> Borrar</Text>
          </Pressable>
        )}
      </View>
    );
  }
}

export default NewPost;
""
const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f5f5f5",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
  },
  owner: { fontWeight: "bold", fontSize: 14 },
  description: { marginVertical: 5, fontSize: 16 },
  likes: { color: "gray", fontSize: 14 },
  likeBtn: { color: "#0080ff", marginTop: 5 },
  deleteBtn: { color: "red", marginTop: 5 },
});
