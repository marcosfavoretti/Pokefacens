export class Pokemon{
    name
    url
    photo
    type
    main_type
    constructor(name, url, photo, type){
        this.photo = photo
        this.name = name
        this.url = url
        this.type = type
        this.getMain_type(type)
    }
    getMain_type(){
        this.main_type = this.type[0].type.name //pega o primeiro tipo e fala que é o main type
    }
}