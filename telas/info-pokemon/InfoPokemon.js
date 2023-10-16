import { useEffect, useState } from "react";
import { View, Text, Image, FlatList } from "react-native";
import axios from "axios";
import { PokemonInfoStyle, SeparatorStyle, MainPokemonStyle, PokemonStatusStyle } from "./pokemonInfoStyle";
import { elementIcon } from './elements.enum';


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
            <Text style={PokemonStatusStyle.text}>Base Status</Text>
            <PokemonStatus stats={pokemon.stats} />
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
    return (
    <View style={MainPokemonStyle.container}>
        
        <Text numberOfLines={1} ellipsizeMode='clip' style={MainPokemonStyle.texto}>{props.name}</Text>
        <Image style={MainPokemonStyle.img} source={{uri:props.sprite}}></Image>
        <View style={{width:'15%',justifyContent:"center"}}>
            <FlatList
                data={props.types}
                renderItem={renderElement}
                key={item => item.slot}
                contentContainerStyle={MainPokemonStyle.elements}
            />
        </View>
    </View>
    )
}

const renderElement = ({ item }) =>{
    const imagePath = elementIcon[item.type.name];
    return(
        <View>
            <Image style={{width:40,height:40}} source={imagePath} />
        </View>
    )
}

const PokemonStatus = (props)=>{

    const getStatus = (stats,name)=>{
        if(!stats){
            return '0%'
        }
        let num
        switch(name){
            case 'HP':
                num = (stats[0].base_stat/300*100);
                return `${num < 100 ? num : 100}%`;
            case 'ATK':
                num = (stats[1].base_stat/200*100);
                return `${num < 100 ? num : 100}%`;
            case 'DEF':
                num = (stats[2].base_stat/200*100);
                return `${num < 100 ? num : 100}%`;
            case 'SPD':
                num = (stats[5].base_stat/200*100);
                return `${num < 100 ? num : 100}%`;
        }
    }

    return(
        <View style={PokemonStatusStyle.container}>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>HP</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width:getStatus(props.stats,'HP'),
                        height:'100%',
                        backgroundColor:'#C59028',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>ATK</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width:getStatus(props.stats,'ATK'),
                        height:'100%',
                        backgroundColor:'#6C47BB',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>DEF</Text>
                <View style={PokemonStatusStyle.bar}>
                        <View style={{
                            width:getStatus(props.stats,'DEF'),
                            height:'100%',
                            backgroundColor:'#7A797D',
                        }}>
                        </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>SPD</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width:getStatus(props.stats,'SPD'),
                        height:'100%',
                        backgroundColor:'#57BB47',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>SP.ATK</Text>
                <View style={PokemonStatusStyle.bar}></View>
            </View>
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

