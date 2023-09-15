import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function App() {
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonId, setPokemonId] = useState(1); // ID initial du Pokémon

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then((response) => response.json())
      .then((data) => {
        setPokemonData(data);
      })
      .catch((error) => console.error(error));
  }, [pokemonId]);

  const previousPokemon = () => {
    if (pokemonId > 1) {
      setPokemonId(pokemonId - 1);
    }
  };

  const nextPokemon = () => {
    setPokemonId(pokemonId + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>POKEMON APP</Text>
      <View style={styles.listConteneur}>
         <Text style={styles.liste}>Liste des Pokémons : </Text>
      </View>
      
      {pokemonData && <PokemonDetail data={pokemonData} />}

      <View style={styles.navigationButtons}>
        <TouchableOpacity style={styles.button} onPress={previousPokemon}>
          <Text style={styles.buttonText}>Précédent</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={nextPokemon}>
          <Text style={styles.buttonText}>Suivant</Text>
        </TouchableOpacity>

      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const PokemonDetail = ({ data }) => {
  return (
    <View style={styles.conteneurdonner}>
      <View style={styles.donnerdgn}>
        <Image
          source={{ uri: data.sprites.front_default }}
          style={styles.image}
        />
        <View style={styles.textConteneur}>
        <Text style={styles.donner}>
          Nom: {data.name}
        </Text>
        <Text style={styles.donner}>
          Poids: {data.weight}
        </Text>
        <Text style={styles.donner}>
          Taille: {data.height}
        </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ABF5F6'
  },
  titre: {
    display: 'flex',
    textAlign: 'center',
    backgroundColor: '#2A2172',
    padding: 20,
    marginTop: 40,
    padding:10,
    fontWeight: 'bold',
    color: 'white',
  },

  listConteneur: {
    display: 'flex',
    alignItems: 'center',
  },
  
  liste: {
    marginTop: 50,
    fontSize:20,
    fontWeight: 'bold',
    color: '#2A2172',
  },
  textConteneur:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:-50

  },
  donnerdgn: {
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'lightblue',
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: 5,
  },
  image: {
    paddingTop: 90,
    width: '50%',
    height: '50%',
  },
  donner: {
    paddingVertical: 20,
    paddingTop: 90,
    fontWeight: 'bold',
    paddingRight: 5,
    alignItems: 'center',
    alignContent: 'center',
    color: '#2A2172',
  },

  navigationButtons: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: -150,
  },
  button: {
    backgroundColor: '#262CF2',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
