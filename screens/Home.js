import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import PalettePreview from '../components/PalettePreview';

const Home = ({ navigation, route }) => {
  const [colorPalettes, setColorPalettes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const newColorPalette = route.params
    ? route.params.newColorPalette
    : undefined;
  const fetchColorPalettes = useCallback(async () => {
    const res = await fetch(
      'https://color-palette-api.kadikraman.now.sh/palettes',
    );
    if (res.ok) {
      const data = await res.json();
      setColorPalettes(data);
    }
  }, []);

  useEffect(() => {
    fetchColorPalettes();
  }, [fetchColorPalettes]);

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchColorPalettes();
    setIsRefreshing(false);
  }, [fetchColorPalettes]);

  useEffect(() => {
    if (newColorPalette) {
      setColorPalettes((prevPalettes) =>
        [newColorPalette].concat(prevPalettes),
      );
    }
  }, [newColorPalette]);
  return (
    <FlatList
      style={styles.list}
      data={colorPalettes}
      keyExtractor={(item) => item.paletteName}
      renderItem={({ item }) => (
        <PalettePreview
          handlePress={() => {
            navigation.navigate('ColorPalette', item);
          }}
          colorPalette={item}
        />
      )}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
      ListHeaderComponent={
        <TouchableOpacity
          onPress={() => navigation.navigate('ColorPaletteModal')}
        >
          <Text style={styles.buttonText}>Add new color palette</Text>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 10,
    backgroundColor: 'white',
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 10,
    color: '#2aa198',
  },
});
export default Home;
