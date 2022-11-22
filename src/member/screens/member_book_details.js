import {React, useState} from 'react';

import {ScrollView, StyleSheet, View, Image} from 'react-native';

import {Text, Searchbar, IconButton} from 'react-native-paper';

export default function MemberBookDetailsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => console.log('Pressed')}
        />
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Image
        source={require('../../../assets/covers/the-color-purple.jpg')}
        style={styles.cover}
      />

      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Name</Text>
        <Text style={{...styles.body, fontWeight: 'bold', fontSize: 17}}>
          The Color Purple
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Author</Text>
        <Text style={{...styles.body, fontWeight: 'bold', fontSize: 17}}>
          Alice Walker
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text style={{...styles.body, fontSize: 16}}>
          Published to unprecedented acclaim, The Color Purple established Alice
          Walker as a major voice in modern fiction. This is the story of two
          sisters--one a missionary in Africa and the other a child wife living
          in the South--who sustain their loyalty to and trust in each other
          across time, distance, and silence.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginHorizontal: 20,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  cover: {
    height: 270,
    width: 200,
    alignSelf: 'center',
    backgroundColor: 'blue',
    borderRadius: 8,
    marginBottom: 10,
  },
  detailContainer: {
    marginVertical: 8,
  },
  heading: {
    color: '#228844',
    backgroundColor: '#33aa4466',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 7,
    fontSize: 13,
  },
  body: {
    color: '#333dd',
    marginHorizontal: 5,
    marginTop: 4,
  },
});
