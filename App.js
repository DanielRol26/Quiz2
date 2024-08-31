import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const PokemonApp = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    fetchPokemonList();
  }, []);

  const fetchPokemonList = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
      const data = await response.json();
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon) => {
          const detailResponse = await fetch(pokemon.url);
          return detailResponse.json();
        })
      );
      setPokemonList(pokemonDetails);
    } catch (error) {
      console.error('Error fetching Pokemon list:', error);
    }
  };

  const renderPokemonItem = ({ item }) => (
    <View style={styles.pokemonItem}>
      <Image
        source={{ uri: item.sprites.front_default }}
        style={styles.pokemonImage}
      />
      <View style={styles.pokemonInfo}>
        <Text style={styles.pokemonName}>{item.name}</Text>
        <Text style={styles.pokemonDetail}>Height: {item.height}</Text>
        <Text style={styles.pokemonDetail}>Weight: {item.weight}</Text>
        <Text style={styles.pokemonDetail}>
          Types: {item.types.map(type => type.type.name).join(', ')}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokédex</Text>
      <FlatList
        data={pokemonList}
        renderItem={renderPokemonItem}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#00796b',
  },
  pokemonItem: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  pokemonImage: {
    width: 90,
    height: 90,
    marginRight: 15,
    borderRadius: 45,
    backgroundColor: '#f5f5f5',
  },
  pokemonInfo: {
    flex: 1,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#00796b',
    marginBottom: 5,
  },
  pokemonDetail: {
    fontSize: 16,
    color: '#757575',
  },
});

export default PokemonApp;
