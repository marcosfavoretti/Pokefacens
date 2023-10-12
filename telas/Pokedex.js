import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { PokedexStyle } from "./Pokedex.style";
import axios from "axios";
import { Pokemon } from "./objects/pokemon";
import { Colorback } from "./objects/type.enum";
import { LoadScreen } from "./load/LoadScreen";
import {PokemonInfoStyle, SeparatorStyle} from "./info-pokemon/pokemonInfoStyle"
import Icon from 'react-native-vector-icons/FontAwesome';

export const Pokedex = ({ navigation }) => {
    const [pokemons, setPokemons] = useState([]);
    const [display_pokemons, setDisplay] = useState([]);
    const [filter, setFilter] = useState('');

    const [dataReady, setDataReady] = useState(false); // Estado para controlar se os dados estão prontos

    useEffect(() => {
        const getPokemons = async () => {
            try {
                let pokemons = []
                let render_pokemons = 200
                for (let idx = 1; idx <= render_pokemons; idx++) { // Usar um loop de 1 a 10                    
                    const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idx}`)
                    let { name, sprites, types } = pokemon.data
                    pokemons.push(new Pokemon(idx, name, sprites, types))
                }
                setPokemons(pokemons);
                setDisplay(pokemons)
                setDataReady(pokemons);
            } catch (error) {
                console.error("Não foi possível pegar os pokemons:", error);
            }
        };

        getPokemons();
    }, []);

    useEffect(() => { //para o filtro
        if (filter === '') {
            setDisplay(pokemons)
            return
        }
        let filter_data = pokemons.filter((filt) => {
            return String(filt.name).indexOf(filter.toLowerCase()) === 0
        })
        setDisplay(filter_data)

    }, [filter])

   

    const renderItem = ({ item }) => {
        const backgroundColor = Colorback[item.main_type.name]; // Obtém a cor do objeto item
        return (
            <TouchableOpacity style={[PokedexStyle.pokeCanva, { backgroundColor }]}
            onPress={()=> navigation.navigate('InfoPokemon',{name:item.name})}
            >
                {dataReady ? (
                    <Image source={{ uri: item.photo }} style={{ width: 100, height: 100 }} />
                ) : null}
                <Text style={PokedexStyle.name}>{item.name}</Text>
            </TouchableOpacity>
        );
    };



   
    const SeparatorLine = () => {
        return (
            <View style={SeparatorStyle.container}>
                <View style={SeparatorStyle.line1}></View>
                <View style={SeparatorStyle.line2}>
                    <View style={SeparatorStyle.diagonalLine}></View>
                </View>
                <View style={SeparatorStyle.line3}></View>
            </View>
        )
    }

    return (
        
        <View style={PokemonInfoStyle.container}>
            <View style={PokemonInfoStyle.topBar}>
                <Image resizeMode="contain" style={PokemonInfoStyle.bola} source={require('../assets/Bola.png')}></Image>
                <Image resizeMode="contain" style={PokemonInfoStyle.bolinhas} source={require('../assets/bolinhas.png')}></Image>
                <Image resizeMode="contain" style={PokemonInfoStyle.titulo} source={require('../assets/Titulo.png')}></Image>
            </View>

            <SeparatorLine></SeparatorLine>
            
            <View style={PokedexStyle.center}>
                <View style={PokedexStyle.filter_canva}>
                    <Icon name="search" size={20} color="gray" />
                    <TextInput
                        style={PokedexStyle.filter}
                        value={filter}
                        placeholder="Search..."
                        onChangeText={setFilter}
                    />
                </View>
            </View>

            <View style={PokedexStyle.main_container}>
                {dataReady ? (
                    <FlatList
                        style={PokedexStyle.scoll_container}
                        data={display_pokemons}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.name}
                        numColumns={2}
                    />
                ) : <LoadScreen />}
                
            </View>
        </View>
    );


};
