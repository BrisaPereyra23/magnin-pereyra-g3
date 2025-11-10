import React from 'react';
import { Component } from 'react';
import { ActivityIndicator } from 'react-native';
import { View, Text,FlatList, Pressable, StyleSheet} from 'react-native';
import { db, auth } from '../firebase/config';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true,
      username: '',
    };
  }
  cerrarSesion (){
    auth.signOut()
    this.props.navigation.navigate('Login')
  }
  componentDidMount() {
  db.collection('posts') .where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc').limit(5).onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      this.setState({
        posteos: posts,
        loading: false,
      });
    });
  db.collection('users') .where('email', '==', auth.currentUser.email).onSnapshot(docs => {
      let userData = null;
      docs.forEach(doc => {
        userData = doc.data();
      });
      if (userData) {
        this.setState({ username: userData.username });
      }
    });
}

  render () {
    const posteos = this.state.posteos;
    const loading  = this.state.loading;
    return (
    <View style={styles.container}>
      <Text style={styles.title}> {this.state.username}</Text>
      <Text style={styles.info}>Email: {auth.currentUser ? auth.currentUser.email : ''}</Text> 
      <Text style={styles.subtitle}> Últimos Posteos </Text>
      {loading && (<ActivityIndicator size="large" color="#e50914" />)}
      {!loading && posteos.length === 0 && (<Text style={styles.noPosts}> Aún no publicaste nada.</Text>)}
      {!loading && posteos.length > 0 && (
        <FlatList
          data={posteos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
        <View style={styles.postCard}>
          <Text style={styles.postText}> {item.data.description}</Text>
          <Text style={styles.postDate}> Este post se publico:{new Date(item.data.createdAt.toDate()).toLocaleDateString()}</Text>
        </View>
          )}/>)}
      <Pressable style={styles.button} onPress={() => this.cerrarSesion()}> 
        <Text style={styles.textButton}>Cerrar sesión</Text>
      </Pressable>
    </View>
  );}
} 
export default Profile;

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e0e0e',
  },
title: {
  fontSize: 28,
  fontWeight: 'bold',
  color: '#e50914',
  marginBottom: 20,
  textAlign: 'center',
  borderBottomWidth: 2,
  borderBottomColor: '#b00610', 
  paddingBottom: 4,
},
subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e50914',
    textAlign: 'center',
  },
  postDate: {
  fontSize: 12,
  color: '#666',
  marginTop: 5,
},

button: {
  backgroundColor: '#e50914',
  paddingVertical: 12,
  paddingHorizontal: 25,
  borderRadius: 25,
  borderBottomWidth: 4,
  borderBottomColor: '#b00610', 
  alignItems: 'center',
  margin: 24,
},

info: {
    color:'#fff',
    fontSize: 18,
    marginBottom: 20,
    fontWeight: '500',
},

noPosts: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
},

postCard: {
    padding: 3,
    margin: 2,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    
},
  
postText: {
    color:'#0e0e0e' ,
    fontSize: 16,
},

textButton: {
    color: '#0e0e0e',
    fontSize: 18,
    fontWeight: 'bold',
},
});
