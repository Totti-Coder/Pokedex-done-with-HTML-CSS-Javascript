const currentPokemonID = null

document.addEventListener("DOMContentLoaded", () => {
    const MAX_POKEMONS = 151
    const pokemonID = new URLSearchParams(window.location.search).get("id")
    const id = parseInt(pokemonID, 10) //We get the ID of the pokemon which is an string so we need to change it into an integer.


    if(id < 1 || id > MAX_POKEMONS){
        return (window.location.href="./index.html") //if the id is smaller than 1 or 151 we come back to the home page.
    }

    currentPokemonID = id
    localPokemon(id)
})

async function loadPokemons(id){

    try{
        const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json())
    ]);
    const abilitiesWrap =document.querySelector(".pokemon-detail-wrap .pokemon-detail-move")
    abilitiesWrap.innerHTML = ""
        return true
    }

    catch(error){
        console.error("An error has ocurred while fetching Pokemons data:", error)
            return false
    }
}