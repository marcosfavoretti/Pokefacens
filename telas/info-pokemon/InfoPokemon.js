import { Text } from "react-native"


export const InfoPokemon = ({route}) =>{

    return (
        <Text>Pokemon : {route.params.name}</Text>
    )
}