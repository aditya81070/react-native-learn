import React from 'react';
import { Text, StyleSheet, FlatList } from 'react-native';

import ColorBox from '../components/ColorBox';

const ColorPalette = ({ route }) => {
  const { paletteName, colors } = route.params;
  return (
    <FlatList
      ListHeaderComponent={<Text style={styles.text}>{paletteName}</Text>}
      contentContainerStyle={styles.container}
      data={colors}
      keyExtractor={(item) => item.colorName}
      renderItem={({ item: { colorName, hexCode } }) => (
        <ColorBox colorName={colorName} hexCode={hexCode} />
      )}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: 'white',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ColorPalette;
