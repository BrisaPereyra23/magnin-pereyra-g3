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
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#0d0d0d", 
  },
  title: {
    fontSize: 34,
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "900",
    color: "#ff1e1e",
    textTransform: "uppercase",
    letterSpacing: 2,
    textShadowColor: "#000", 
    textShadowOffset: { width: 2, height: 2 },      /* bno no me copa que sea offset o lo de text transform o sea anda por el inspeccionar que te lo tira asi pero hagamoslo manual*/
    textShadowRadius: 6,     
    borderBottomWidth: 2,
    borderBottomColor: "#ff1e1e",
    paddingBottom: 6,
  },
  noPosts: {
    fontSize: 16,
    textAlign: "center",
    color: "#ccc",
    marginTop: 20,
  },
});