export class Pokemon {
    pokedex_index
    name
    photo
    type
    
    main_type

    constructor(idx,name, photo, type) {
        this.pokedex_index = idx
        this.photo = photo.front_default
        this.name = name
        this.type = type
        this.getMain_type(type)
    }
    getMain_type() {
        this.main_type = {
            name: this.type[0].type.name,
            url: this.type[0].type.url
        } //pega o primeiro tipo e fala que é o main type
    }
}