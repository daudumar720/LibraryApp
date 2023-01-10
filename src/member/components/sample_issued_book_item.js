import {React, useState} from 'react';

import {StyleSheet, Image, View, TouchableOpacity} from 'react-native';

import {Text, Card, useTheme} from 'react-native-paper';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as RootNavigation from '../../navigation_service';

export default function SampleIssuedBookItem({issuedBook}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      marginVertical: 10,
      display: 'flex',
      flexDirection: 'row',
      elevation: 1,
      shadowRadius: 10,
      borderRadius: 10,
      backgroundColor: colors.secondaryContainer,
      alignItems: 'center',
    },
    innerContainer: {
      marginHorizontal: 10,
    },

    cover: {
      width: 95,
      height: 145,
      borderRadius: 10,
    },
    delete: {
      backgroundColor: 'purple',
      borderRadius: 10,
      width: 60,
      height: 90,
    },
    book: {
      color: colors.onSecondaryContainer,
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    author: {
      color: colors.secondary,
      marginBottom: 5,
    },
    time: {
      marginLeft: 10,
      fontSize: 12,
      color: colors.tertiary,
    },
    dateContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 3,
    },
  });

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() =>
        RootNavigation.navigate('BookDetailsViewOnly', issuedBook)
      }>
      <Card.Cover source={{uri: issuedBook.image}} style={styles.cover} />
      <View style={styles.innerContainer}>
        <Text style={styles.book}>{issuedBook.name}</Text>
        <Text style={styles.author}>{issuedBook.author}</Text>
        <View style={styles.dateContainer}>
          <Icon name="clock-o" size={17} color={colors.tertiary} />
          <Text style={styles.time}>Issued at {issuedBook.issuedAt}</Text>
        </View>
        <View style={styles.dateContainer}>
          <Icon name="calendar-minus-o" size={14} color={colors.tertiary} />
          <Text style={{...styles.time, color: colors.tertiary}}>
            Due at {issuedBook.dueAt}
          </Text>
        </View>

        <View style={styles.dateContainer}>
          <Icon name="dollar" size={17} color={colors.tertiary} />
          <Text
            style={{...styles.time, color: colors.tertiary, marginLeft: 18}}>
            Late fine: {issuedBook.fine}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
