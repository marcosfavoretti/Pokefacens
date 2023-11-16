import { useEffect, useState } from "react";
import { View, Text, Image, FlatList, ScrollView } from "react-native";
import axios from "axios";
import { PokemonInfoStyle, SeparatorStyle, MainPokemonStyle, PokemonStatusStyle } from "./pokemonInfoStyle";
import { elementIcon } from './elements.enum';




export const InfoPokemon = ({ route }) => {

    const [pokemon, setPokemon] = useState('');

    useEffect(() => {
        
        getPokemon(route.params.name).then(async (pokemon) => {
            
            const types = pokemon.types
            for (const type of types) {
                console.log(type.type)
                fightDetail(type.type.name).then((res) => {
                    console.log(res.força.map((filt) => filt.name));
                    if (!pokemon.força && !pokemon.fraqueza) {
                      pokemon['força'] = res.força.map((filt) => filt.name);
                      pokemon['fraqueza'] = res.fraqueza.map((filt) => filt.name);
                    } else {
                      // Usando concat para adicionar os novos valores ao array existente
                      pokemon['força'] = pokemon['força'].concat(res.força.map((filt) => filt.name));
                      pokemon['fraqueza'] = pokemon['fraqueza'].concat(res.fraqueza.map((filt) => filt.name));
                    }
                  
                    console.log('->' + pokemon.força);
                    setPokemon({ ...pokemon }); // Atualize o estado usando um novo objeto
                  });
            }
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
            <PokemonStatus stats={pokemon.stats} fraqueza={pokemon.fraqueza} força={pokemon.força}/>
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
            <Text numberOfLines={1} ellipsizeMode='clip' style={MainPokemonStyle.texto}>{props.fraqueza}{props.força}</Text>

            <Image style={MainPokemonStyle.img} source={{ uri: props.sprite }}></Image>
            <View style={{ width: '15%', justifyContent: "center" }}>
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

const renderElement = ({ item }) => {
    const imagePath = elementIcon[item.type.name];
    return (
        <View>
            <Image style={{ width: 40, height: 40 }} source={imagePath} />
        </View>
    )
}
const renderElement2 = ({ item }) => {
    const imagePath = elementIcon[item];
    return (
        <View>
            <Image style={{ width: 40, height: 40 }} source={imagePath} />
        </View>
    )
}
const PokemonStatus = (props) => {

    const getStatus = (stats, name) => {
        if (!stats) {
            return '0%'
        }
        let num
        switch (name) {
            case 'HP':
                num = (stats[0].base_stat / 300 * 100);
                return `${num < 100 ? num : 100}%`;
            case 'ATK':
                num = (stats[1].base_stat / 200 * 100);
                return `${num < 100 ? num : 100}%`;
            case 'DEF':
                num = (stats[2].base_stat / 200 * 100);
                return `${num < 100 ? num : 100}%`;
            case 'SPD':
                num = (stats[5].base_stat / 200 * 100);
                return `${num < 100 ? num : 100}%`;
        }
    }

    return (
        <ScrollView style={PokemonStatusStyle.container}>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>HP</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width: getStatus(props.stats, 'HP'),
                        height: '100%',
                        backgroundColor: '#C59028',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>ATK</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width: getStatus(props.stats, 'ATK'),
                        height: '100%',
                        backgroundColor: '#6C47BB',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>DEF</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width: getStatus(props.stats, 'DEF'),
                        height: '100%',
                        backgroundColor: '#7A797D',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>SPD</Text>
                <View style={PokemonStatusStyle.bar}>
                    <View style={{
                        width: getStatus(props.stats, 'SPD'),
                        height: '100%',
                        backgroundColor: '#57BB47',
                    }}>
                    </View>
                </View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>SP.ATK</Text>
                <View style={PokemonStatusStyle.bar}></View>
            </View>
            <View style={PokemonStatusStyle.item}>
                <Text style={PokemonStatusStyle.statusText}>FRAQ.</Text>
                <FlatList
                    data={props.fraqueza}
                    renderItem={renderElement2}
                    key={item => item.slot}
                    contentContainerStyle={MainPokemonStyle.elements2}
                />
                     </View>
            <View style={PokemonStatusStyle.item}>

                  <Text style={PokemonStatusStyle.statusText}>FOR.</Text>
                <FlatList
                    data={props.força}
                    renderItem={renderElement2}
                    key={item => item.slot}
                    contentContainerStyle={MainPokemonStyle.elements2}
                />
                                     </View>

       
        </ScrollView>
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
//
async function fightDetail(name) {
    try {
        console.log(name)
        const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
        const { damage_relations } = data
        const { double_damage_from } = damage_relations//fraqueza
        const { double_damage_to } = damage_relations//forte
        return { força: double_damage_to, fraqueza: double_damage_from };
    } catch (e) {
        throw e;
    }
}
//
