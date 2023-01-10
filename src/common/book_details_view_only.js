import {React} from 'react';

import {ScrollView, StyleSheet, View, Image} from 'react-native';

import {Text, IconButton, useTheme} from 'react-native-paper';

export default function BookDetailsScreenViewOnly({route, navigation}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 25,
      backgroundColor: colors.background,
    },
    title: {
      fontWeight: 'bold',
      fontSize: 24,
      color: colors.onBackground,
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
      height: 310,
      width: 200,
      alignSelf: 'center',
      borderRadius: 8,
      marginBottom: 10,
    },
    detailContainer: {
      marginVertical: 8,
    },
    heading: {
      color: colors.onTertiaryContainer,
      backgroundColor: colors.tertiaryContainer,
      alignSelf: 'flex-start',
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: 7,
      fontSize: 13,
    },
    body: {
      color: colors.onBackground,
      marginHorizontal: 5,
      marginTop: 4,
    },
  });

  const book = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon="arrow-left"
          size={24}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.title}>Book Details</Text>
      </View>

      <Image source={{uri: book.image}} style={styles.cover} />

      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Name</Text>
        <Text
          style={{
            ...styles.body,
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          {book.name}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Author</Text>
        <Text
          style={{
            ...styles.body,
            fontWeight: 'bold',
            fontSize: 17,
          }}>
          {book.author}
        </Text>
      </View>
      <View style={styles.detailContainer}>
        <Text style={styles.heading}>Description</Text>
        <Text style={{...styles.body, fontSize: 16}}>{book.description}</Text>
      </View>
      <View style={{height: 40}} />
    </ScrollView>
  );
}
