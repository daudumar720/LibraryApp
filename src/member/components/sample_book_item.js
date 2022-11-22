import {React, useState} from 'react';

import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import {Text, Card, Title, MD3LightTheme as Theme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

export default function SampleBookItem() {
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
          <Icon name="clock-o" size={17} color={Theme.colors.primary} />
          <Text style={styles.time}>Issued at 5 June, 2022</Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon name="calendar-minus-o" size={17} color={Theme.colors.onErrorContainer} />
          <Text style={{...styles.time, color: Theme.colors.onErrorContainer}}>Due at at 5 June, 2022</Text>
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
    marginHorizontal: 10,
  },

  cover: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  delete: {
    backgroundColor: 'purple',
    borderRadius: 10,
    width: 60,
    height: 90,
  },
  book: {
    color: Theme.colors.onSecondaryContainer,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  author: {
    color: Theme.colors.secondary,
    marginBottom: 5,
  },
  time: {
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
});
