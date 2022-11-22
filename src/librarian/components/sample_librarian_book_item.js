import {React, useState} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {Text, Card, Title} from 'react-native-paper';

import * as RootNavigation from '../../navigation_service'

export default function SampleBookItem({navigation}) {
  return (
    <TouchableOpacity onPress={() => RootNavigation.navigate('BookDetails')}>
      <Card style={styles.container} mode="elevated">
        <Card.Cover
          source={require('../../../assets/covers/the-color-purple.jpg')}
          style={styles.cover}
        />
        <Card.Content>
          <Text style={styles.book}>The Color Purple</Text>
          <Text style={styles.author}>Alice Walker</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  cover: {
    height: 245,
  },
  book: {
    color: '#222',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 7,
    marginBottom: 2,
  },
  author: {
    color: '#666',
    textAlign: 'center',
  },
});
