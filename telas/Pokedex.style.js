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
    filter: {
        position: "absolute",
        width: "80%",
        height: 50,
        backgroundColor: 'white',
        justifyContent: "center",
        alignItems: "center",
        top: "80%",
        borderColor: 'black',
        borderWidth: 1

    },
    load_image: {
        resizeMode: "center"
    },
    canva_load: {
        flex: 1,
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center'
    }
});

