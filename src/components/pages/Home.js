import React, { Component } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import Nav from '../utils/Nav';

import firebase from '../../models';
import Card from '../utils/Card';

const database = firebase.firestore();
const postRef = database.collection('posts');

class Home extends Component {
  state = {
    posts: [],
  };

  componentDidMount() {
    postRef
      .get()
      .then(docs => {
        const allPost = [];
        docs.forEach(doc => {
          const postContent = doc.data();
          postContent.id = doc.id;
          allPost.push(postContent);
        });
        this.setState({
          posts: allPost,
        });
      })
      .catch(error => {
        console.log('Error getting document:', error);
      });
  }

  newPost = () => {
    database.collection('posts').onSnapshot(docs => {
      const posts = [];
      docs.forEach(doc => {
        const storedPost = doc.data();
        storedPost.idPost = doc.id;
        posts.push(storedPost);
      });
      this.setState({ posts });
    });
  };

  deleteContent = idPost => {
    const { posts } = this.state;

    const filteredArray = posts.filter(card => card.idPost !== idPost);
    this.setState({ posts: filteredArray });
    database
      .collection('posts')
      .doc(idPost)
      .delete();
  };

  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: '#45a1f1',
    },
    headerTintColor: '#fff',
    headerLeft: (
      <Icon
        name="home"
        style={{ color: '#fff', fontSize: 30, marginLeft: 10 }}
      />
    ),
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { posts } = this.state;
    this.newPost();

    const {
      navigation: { navigate },
    } = this.props;

    return (
      <View style={styles.homeSec}>
        <View style={styles.list}>
          <FlatList
            data={posts}
            renderItem={({ item }) => (
              <Card
                img={item.image}
                content={item.text}
                idPost={item.idPost}
                deletePost={this.deleteContent}
              />
            )}
            keyExtractor={(ele, idx) => idx}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  alignSelf: 'center',
                  height: 0.5,
                  backgroundColor: 'grey',
                  width: '100%',
                }}
              />
            )}
          />
        </View>
        <Nav navigate={navigate} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  homeSec: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
});

export default Home;
