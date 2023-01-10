import {Image, StyleSheet, Text, View} from 'react-native';
import {useTheme} from 'react-native-paper';

export function EmptyState({title, subtitle}) {
  const {colors} = useTheme();

  const styles = StyleSheet.create({
    container: {
      display: 'flex',
      marginTop: 130,
      marginHorizontal: 40,
      alignItems: 'center',
      flex: 1,
    },
    cover: {
      width: 150,
      height: 150,
      resizeMode: 'contain',
    },
    title: {
      fontSize: 25,
      marginTop: 20,
      fontWeight: '600',
      marginBottom: 10,
      textAlign: 'center',
      color: colors.onBackground,
    },
    subtitle: {
      lineHeight: 20,
      fontSize: 15,
      textAlign: 'center',
      color: colors.onSurfaceVariant,
    },
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.cover}
        source={require('../../assets/icons/book.png')}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
