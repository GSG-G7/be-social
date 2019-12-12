/* eslint-disable global-require */
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Card = ({ img, content, deletePost, idPost }) => {
  return (
    <View style={styles.card}>
      <Image
        style={styles.userImage}
        source={require('../../../assets/rana.jpg')}
      />
      <View>
        <View style={styles.user}>
          <Text style={styles.fullname}>Rana Obeid</Text>
          <Text style={styles.username}>@ranasobeid95</Text>
          <TouchableOpacity
            onPress={() => {
              deletePost(idPost);
            }}
          >
            <Icon name="trash" style={styles.delete} />
          </TouchableOpacity>
        </View>
        {img && <Image source={{ uri: img }} style={styles.cardImage} />}
        <View style={styles.cardText}>
          <Text style={styles.date}>4 days ago</Text>
          <Text style={styles.contentPost}>{content}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 18,
    fontFamily: 'roboto',
    textAlign: 'center',
  },
  cardImage: {
    height: 150,
    width: '90%',
  },
  cardText: {
    width: '85%',
  },
  date: {
    fontSize: 10,
    color: 'grey',
  },
  contentPost: {
    fontSize: 12,
    color: 'black',
    marginTop: 20,
  },
  user: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  username: {
    color: 'grey',
  },
  userImage: {
    height: 60,
    width: 60,
    borderRadius: 30,
    margin: 10,
  },

  fullname: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  delete: {
    color: 'red',
    fontSize: 26,
    marginLeft: 70,
  },
});

export default Card;
