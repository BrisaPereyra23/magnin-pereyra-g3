import react from 'react';
import React, { Component } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';

class Post extends Component {
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
      <View style={styles.card}>
        <Text style={styles.owner}>{this.props.data.owner}</Text>
        <Text>{this.props.data.description}</Text>
        <Text>Likes: {this.props.data.likes.length}</Text>

        <Pressable style={styles.btn} onPress={() => this.like()}>
          <Text style={styles.btnText}>Like</Text>
        </Pressable>

        <Pressable style={styles.btn} onPress={() => this.dislike()}> {/*ver si lo vimos asi */}
          <Text style={styles.btnText}>Dislike</Text>
        </Pressable>

        {/*<TextInput
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
              <Text key={i}>
                {c.owner}: {c.text}
              </Text>
            ))} chequear creo que falta el contructor con comment vacio */}
      </View>
    );
  }
  }
const styles = StyleSheet.create({
    container: {},});

export default Post;
