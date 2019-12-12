import React, { Component } from 'react';
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import 'firebase/firestore';
import 'firebase/storage';

import Icon from 'react-native-vector-icons/FontAwesome';

import firebase from '../../models';

const database = firebase.firestore();
const storage = firebase.storage();
const storageRef = storage.ref();

class Post extends Component {
  state = {
    text: null,
    image: null,
    posts: [],
  };

  componentDidMount() {
    this.addPost();
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.android) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      storageRef.child(result.uri);
      this.setState({ image: result.uri });
    }
  };

  addPost = () => {
    database.collection('posts').onSnapshot(docs => {
      const posts = [];

      docs.forEach(doc => {
        const docId = doc.id;
        const storedPost = doc.data();
        storedPost.id = docId;
        posts.push(storedPost);
      });
      this.setState({ posts });
    });
  };

  onSave = () => {
    const { text, image } = this.state;
    const {
      navigation: { navigate },
    } = this.props;
    if (text !== null && image !== null) {
      database
        .collection('posts')
        .doc()
        .set({ text, image });
      this.setState({
        posts: [],
        image: null,
        text: null,
      });
      navigate('Home');
    } else {
      console.log('require');
    }
  };

  static navigationOptions = {
    title: 'Post',
    headerStyle: {
      backgroundColor: '#45a1f1',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  render() {
    const { image } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.postSec}>
          <View style={styles.content}>
            <TextInput
              style={styles.input}
              type="text"
              placeholder="Type your post"
              onChangeText={val => this.setState({ text: val })}
            />
            {image && <Image source={{ uri: image }} style={styles.img} />}
          </View>
          <TouchableOpacity>
            <Icon name="camera" style={styles.icon} onPress={this.pickImage} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.btn} onPress={this.onSave}>
          <Text style={styles.textBtn}>Post</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
  },
  postSec: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: 'grey',
    borderWidth: 0.5,
    margin: 5,
  },
  icon: {
    fontSize: 26,
    marginTop: 60,
    marginRight: 5,
    color: 'grey',
    flex: 1,
  },
  content: {
    flex: 1,
  },
  btn: {
    backgroundColor: '#144c83',
    width: 100,
    height: 40,
    borderRadius: 5,
    alignSelf: 'flex-end',
    marginEnd: 10,
    elevation: 12,
  },
  textBtn: {
    color: 'white',
    marginTop: 10,
    textAlign: 'center',
  },
  input: {
    width: '85%',
    height: 80,
    margin: 5,
  },
  img: {
    width: '85%',
    height: 200,
    margin: 5,
  },
});
export default Post;
