import { StyleSheet } from "react-native";

export const PokemonInfoStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D92534',
    },
    topBar: {
        flexDirection: 'row',
        marginTop: 35,
        justifyContent: "center",
        height:110,
    },
    bola: {
        width:'18%',
        marginTop: 10
    },
    bolinhas: {
        width: '15%',
        height: 18
    },
    titulo: {
        width:'60%',
        marginTop: 10
    },
    pokemonContent:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:30
    }
});

export const SeparatorStyle = {
    container: {
        height: 30,
        flexDirection: 'row',
    },
    line1: {
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        width: '30%',
        height: '100%'
    },
    line2: {
        width: '10%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        transform: [{ rotate: '-35deg' }]
    },
    diagonalLine: {
        width: '125%',
        height: 2,
        backgroundColor: 'black',

    },
    line3: {
        borderTopColor: 'black',
        borderTopWidth: 2,
        width: '60%',
        height: '100%'
    }
}

export const MainPokemonStyle = {
    container: {
        backgroundColor: '#D9D9D9',
        width: '95%',
        height: 230,
        borderRadius:5,
        flexDirection:'row'
    }
}