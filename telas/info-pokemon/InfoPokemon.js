import { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import axios from "axios";
import { PokemonInfoStyle, SeparatorStyle, MainPokemonStyle } from "./pokemonInfoStyle";


export const InfoPokemon = ({ route }) => {
    const [pokemon, setPokemon] = useState('');

    useEffect(() => {
        getPokemon(route.params.name).then((pokemon) => {
            setPokemon(pokemon);
        });
    }, [])

    return (
        <View style={PokemonInfoStyle.container}>
            <View style={PokemonInfoStyle.topBar}>
                <Image resizeMode="contain" style={PokemonInfoStyle.bola} source={require('../../assets/Bola.png')}></Image>
                <Image resizeMode="contain" style={PokemonInfoStyle.bolinhas} source={require('../../assets/bolinhas.png')}></Image>
                <Image resizeMode="contain" style={PokemonInfoStyle.titulo} source={require('../../assets/Titulo.png')}></Image>
            </View>
            <SeparatorLine />
            <View style={PokemonInfoStyle.pokemonContent}>
                <MainPokemon 
                    name={pokemon.name} 
                    sprite={pokemon?.sprites?.other["official-artwork"]?.front_default}
                    types={pokemon.types}     
                />
            </View>
        </View>
    )
}

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

export const MainPokemon = (props) => {
    console.log(props.types);
    return (
    <View style={MainPokemonStyle.container}>
        <Text>{props.name}</Text>
       <Image width={200} height={200} source={{uri:props.sprite}}></Image>
       <FlatList 
        data={props.types}
        renderItem={renderElement}
        key={item => item.slot}
       />
    </View>
    )
}

const renderElement = ({ item }) =>{
    return(
        <View>
            <Text>{item.type.name}</Text>
        </View>
    )
}

const getPokemon = async (name) => {
    try {
        const pokemon = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return pokemon.data;
    } catch (e) {
        throw e;
    }
}

