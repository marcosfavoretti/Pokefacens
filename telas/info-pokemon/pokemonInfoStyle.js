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
        flexDirection:'row',
    },
    texto: {
        flex:1,
        width:'30%',
        paddingLeft:5,
        textTransform: 'capitalize',
    },
    img:{
        width:'55%'
    },
    elements:{
        alignItems:'center'
    }

}

export const PokemonStatusStyle = {
    text:{
        color:'white',
        fontSize:20,
        textAlign:'center',
        marginTop:20
    },
    container:{
        width:'100%',
    },
    statusText:{
        width:'18%',
        fontSize:15,
        color:'white'
    },
    bar:{
        backgroundColor:'white',
        height:25,
        width:'82%',
        borderRadius:3,
        padding:2
    },
    item:{
        flexDirection:'row',
        padding: 15
    }
}