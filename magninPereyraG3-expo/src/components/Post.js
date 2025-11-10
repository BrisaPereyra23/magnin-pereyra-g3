import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import firebase from 'firebase';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '', 
    };
  }

  like() {
  db.collection('posts')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)
    });
}

dislike() {
  db.collection('posts')
    .doc(this.props.id)
    .update({
      likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
    });
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

        <Pressable
          style={styles.btn}
          onPress={() => this.props.navigation.navigate('Comments', { id: this.props.id })}>
          <Text style={styles.btnText}>Ver comentarios</Text>
        </Pressable>
      </View>
    );
  }
}
export default Post;
      
const styles = StyleSheet.create({

  card: {
  borderRadius: 14,
  borderWidth: 1,
  borderColor: "#ddd",
  padding: 15,
  marginVertical: 10,
  backgroundColor: "#fff",
  borderBottomWidth: 3,
  borderBottomColor: "#ccc",
  backgroundColor: "#fefefe",
  },
  owner: {
    fontWeight: "bold",
    color: "#131111",
    fontSize: 15,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: "#131111",
    marginBottom: 10,
  },
  likeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
    marginBottom: 10,
  },
  likesText: {
    fontSize: 15,
    color: "#ff4d4d",
    fontWeight: "bold",
  },
  btnLike: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btnDislike: {
    backgroundColor: "#555",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  btn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 25,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  btnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    padding: 8,
    color: "#131111",
    marginBottom: 6,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  commentSection: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
});
