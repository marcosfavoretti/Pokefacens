import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TextInput, TouchableOpacity } from "react-native";
import { PokedexStyle } from "./Pokedex.style";
import axios from "axios";
import { Pokemon } from "./objects/pokemon";
import { Colorback } from "./objects/type.enum";

export const Pokedex = ({ navigation }) => {
    const [pokemons, setPokemons] = useState([]);
    const [display_pokemons, setDisplay] = useState([]);
    const [filter, setFilter] = useState('');

    const [dataReady, setDataReady] = useState(false); // Estado para controlar se os dados estão prontos

    useEffect(() => {
        const getPokemons = async () => {
            try {
                const res = await axios.get(
                    "https://pokeapi.co/api/v2/pokemon?offset=20&limit=200"
                );
                const mypoke = await Promise.all(
                    res.data.results.map(async (item) => {
                        let [uri_photo, types] = await getSomeDatas(item.url);
                        //console.log(uri_photo);
                        return new Pokemon(item.name, item.url, uri_photo, types);
                    })
                );
                setPokemons(mypoke);
                setDisplay(mypoke)
                setDataReady(true);
            } catch (error) {
                console.error("Não foi possível pegar os pokemons:", error);
            }
        };

        getPokemons();
    }, []);

    useEffect(() => { //para o filtro
        console.log(filter)
        if (filter === '') {
            setDisplay(pokemons)
            return
        }
        let filter_data = pokemons.filter((filt) => {
            return String(filt.name).indexOf(filter.toLowerCase()) === 0
        })
        setDisplay(filter_data)

    }, [filter])

    // Função para buscar a foto
    async function getSomeDatas(url) {
        let res = await axios.get(url);
        return [res.data.sprites.front_default, res.data.types];
    }

    const renderItem = ({ item }) => {
        const backgroundColor = Colorback[item.main_type]; // Obtém a cor do objeto item
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

    const handlenewFilter = (option) => {
        setFilter(option)
    }
    return (

        <View style={PokedexStyle.main_container}>
            {dataReady ? (
                <FlatList
                    style={PokedexStyle.scoll_container}
                    data={display_pokemons}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.name}
                    numColumns={2}
                />
            ) : null}
            {dataReady ? (
                <View style={PokedexStyle.filter}>
                    <TextInput
                        value={filter}
                        placeholder="filtrar pokemon ..."
                        onChangeText={(option) => {
                            handlenewFilter(option);
                        }}
                    />
                </View>
            ) : null}
        </View>

    );
};
