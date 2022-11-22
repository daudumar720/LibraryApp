import {React, useState} from 'react';

import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import {Text, Card, Button, MD3LightTheme as Theme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function SampleRequestBookItem() {
  return (
    <TouchableOpacity style={styles.container} onPress={() => {}}>
      <Card.Cover
        source={require('../../../assets/covers/the-color-purple.jpg')}
        style={styles.cover}
      />
      {/* <View style={styles.delete}></View> */}
      <View style={styles.innerContainer}>
        <Text style={styles.book}>The Color Purple</Text>
        <Text style={styles.author}>Alice Walker</Text>
        <View style={styles.dateContainer}>
          <Icon name="user-circle-o" size={17} color={Theme.colors.primary} />
          <Text style={styles.member}>John Doe</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            style={styles.rejectButton}
            mode="contained-tonal"
            textColor='#de0a26'
            onPress={() => {}}>
            Reject
          </Button>
          <Button
            style={styles.issueButton}
            mode="contained-tonal"
            textColor='#68bb59'
            onPress={() => {}}>
            Issue
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    elevation: 1,
    shadowRadius: 10,
    borderRadius: 10,
    backgroundColor: Theme.colors.secondaryContainer,
    alignItems: 'center',
  },
  innerContainer: {
    marginHorizontal: 20,
    marginVertical: 10
  },

  cover: {
    width: 100,
    height: 140,
    borderRadius: 10,
  },
  book: {
    color: Theme.colors.onSecondaryContainer,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  author: {
    color: Theme.colors.secondary,
    marginBottom: 5,
  },
  member: {
    marginLeft: 10,
    fontSize: 12,
    color: Theme.colors.primary,
  },
  dateContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  buttonsContainer: {
    marginLeft: 55,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'space-between',
    marginVertical: 3,
  },
});
