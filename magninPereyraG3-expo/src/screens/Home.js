import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { db } from "../firebase/config";
import Post from "../components/Post";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loading: true,
    };
  }

  componentDidMount() {
    db.collection("posts").orderBy("createdAt", "desc").onSnapshot((docs) => {
      let postsAct = [];
      docs.forEach((doc) => {
        postsAct.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      this.setState({
        posts: postsAct,
        loading: false,
      });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Car Crew</Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="red" /> //ver si color se puede hacer en css
        ) : this.state.posts.length === 0 ? (
          <Text style={styles.noPosts}>Todavía no hay publicaciones.</Text>
        ) : (
          <FlatList
            data={this.state.posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Post id={item.id} data={item.data} />
            )}
          />
        )}
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#fff" },
  title: { fontSize: 24, textAlign: "center", marginVertical: 10 },
  noPost: {}
});

