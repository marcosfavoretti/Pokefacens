import { StyleSheet } from "react-native";

export const PokedexStyle = StyleSheet.create({
    main_container: {
        flex: 1,
        display: "flex",
        flexDirection: 'column',
        alignItems: "center",
        backgroundColor: '',
    },
    scroll_container: {
        backgroundColor: 'white'
    },
    pokeCanva: {
        backgroundColor: 'gray',
        margin: 5,
        width: 160,
        height: 160,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center'
    }
    ,
    name: {
        color: 'white'
    },
    filter:{
        marginLeft:"3%",
        width:"80%"
    },

    filter_canva: {
        backgroundColor: 'white',
        padding: '1%',
        borderRadius: 3,
        display:'flex',
        flexDirection:'row',
        width:'95%'
    },
    load_image: {
        resizeMode: "center"
    },
    canva_load: {
        flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    },
    center:{
        display:'flex',
        width: '100%',
        justifyContent:"center",
        alignItems:"center",
        marginBottom:'3%',
        marginTop:"3%"
    }

});

