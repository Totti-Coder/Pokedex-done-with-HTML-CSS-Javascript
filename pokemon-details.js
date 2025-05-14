let currentPokemonID = null

document.addEventListener("DOMContentLoaded", () => {
    const MAX_POKEMONS = 151
    const pokemonID = new URLSearchParams(window.location.search).get("id")
    const id = parseInt(pokemonID, 10) //We get the ID of the pokemon which is an string so we need to change it into an integer.


    if(id < 1 || id > MAX_POKEMONS){
        return (window.location.href="./index.html") //if the id is smaller than 1 or 151 we come back to the home page.
    }

    currentPokemonID = id
    loadPokemons(id)
})

async function loadPokemons(id){

    try{
        const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json())
    ]);
    const abilitiesWrapper = document.querySelector(".pokemon-detail-wrap .pokemon-detail-move")
    abilitiesWrapper.innerHTML = ""
    if(currentPokemonID === id){
        showPokemonDetails(pokemon)
        const flavorText = getEnglishFavorText(pokemon-Species)
        document.querySelector(".body3-fonts.pokemon-description").textContent = flavorText
        
        const [leftArrow, rightArrow] = ["#leftArrow", "#righttArrow"].map((sel) =>
        document.querySelector(sel))

        leftArrow.removeEventListener("click", explorePokemon)
        rightArrow.removeEventListener("click", explorePokemon)

        if(id !== 1){
            leftArrow.addEventListener("click", () => {
                explorePokemon(id-1)
            })
        }
        if(id !== 151) {
            rightArrow.addEventListener("click", () =>{
                explorePokemon(id+1)
            })
        }
        window.history.pushState({}, "", `./detail.html?id=${id}`)
        }

        return true
    }

    catch(error){
        console.log("An error has ocurred while fetching Pokemons data:", error)
            return false
    }
}

async function explorePokemon(id){
    currentPokemonID = id
    await loadPokemons(id)
}

const pokemonColors = {
    normal: "A8A878",
    water: "A8A878",
    grass: "A8A878",
    bug: "A8A878",
    fire: "A8A878",
    dragon: "A8A878",
    flying: "A8A878",
    electric: "A8A878",
    rock: "A8A878",
    steel: "A8A878",
    fairy: "A8A878",
    dark: "A8A878",
    ghost: "A8A878",
    poison: "A8A878",
    fighting: "A8A878",
    ice: "A8A878",
    ground: "A8A878",
    psychic: "A8A878",
}

function applyElementStyles(elements, cssProperty, value){
    elements.forEach((element) => {
        element.style[cssProperty] = value
    })
}

function rgbaFromHex(hexColor) {
    return [
        parseInt(hexColor.slice(1, 3), 16),
        parseInt(hexColor.slice(3, 5), 16),
        parseInt(hexColor.slice(5, 7), 16),
    ].join(", ")
}

function applyBackgroundColor(pokemon){
    const mainType = pokemon.types[0].type.name
    const color = pokemonColors[mainType]

    if(!color){
        console.warn(`This color is not defined yet: ${mainType}`)
        return
    }
    const detailingMainElement = document.querySelector(".detail-main")
    applyElementStyles([detailingMainElement],
    "background", color)
    applyElementStyles([detailingMainElement],
    "borderColor", color)
}