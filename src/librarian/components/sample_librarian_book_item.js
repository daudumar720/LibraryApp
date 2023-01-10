import {React, useState} from 'react';

import {StyleSheet, TouchableOpacity} from 'react-native';

import {Text, Card, Title, useTheme} from 'react-native-paper';

import * as RootNavigation from '../../navigation_service';

export default function SampleBookItem({book}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin: 10,
      backgroundColor: colors.surfaceVariant,
    },
    cover: {
      width: 144,
      height: 225,
      resizeMode: 'cover',
    },
    book: {
      color: colors.onBackground,
      fontSize: 16,
      textAlign: 'center',
      marginTop: 7,
      marginBottom: 2,
    },
    author: {
      color: colors.secondary,
      textAlign: 'center',
    },
  });

  return (
    <TouchableOpacity
      onPress={() => RootNavigation.navigate('BookDetails', book)}>
      <Card style={styles.container} mode="elevated">
        <Card.Cover source={{uri: book.image}} style={styles.cover} />
        <Card.Content>
          <Text style={styles.book}>{book.name}</Text>
          <Text style={styles.author}>{book.author}</Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
}
