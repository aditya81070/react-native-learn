import React from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
} from 'react-native';

const PalettePreview = ({
  handlePress,
  colorPalette: { paletteName, colors },
}) => {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.text}>{paletteName}</Text>
      <FlatList
        style={styles.list}
        data={colors.slice(0, 5)}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item: { hexCode } }) => (
          <View style={[styles.box, { backgroundColor: hexCode }]} />
        )}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
  },
  box: {
    height: 30,
    width: 30,
    marginRight: 10,
    shadowColor: '#ddd',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 2,
  },
  list: {
    marginBottom: 20,
    flexDirection: 'row',
  },
});
export default PalettePreview;
