import { Image, View } from "react-native"
import { PokedexStyle } from "../Pokedex.style"

export const LoadScreen = () => {
    return (
        <View style={PokedexStyle.canva_load}>
            <Image source={require('../../assets/load.gif')} style={PokedexStyle.load_image} />
        </View>
    )
}