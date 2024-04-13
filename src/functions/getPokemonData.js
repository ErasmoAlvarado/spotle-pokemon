import axios from "axios";

export async function getPokemonData() {
    try {
        const respose = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0")
        const PokemonData = []
        const pokemonName = []
        const pokemonUrl = []
        for (let index = 0; index < 1302; index++) {
            const pokemon =  respose.data["results"][index.toString()]
            PokemonData.push([pokemon["name"],pokemon["url"]])
            pokemonName.push(pokemon["name"])
            pokemonUrl.push(pokemon["url"])
        }
        return PokemonData
    } catch (error) {
        console.error(error)
    }
}