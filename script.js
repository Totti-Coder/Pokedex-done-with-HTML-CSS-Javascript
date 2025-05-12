const MAX_POKEMON = 151;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMSG = document.querySelector("#not-found-msg");
const closeButton = document.querySelector(".search-close-icon")

let allPokemons = [];

fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    showPokemons(allPokemons);
  });

async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) => res.json()),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) => res.json())
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon Data before redirect");
  }
}

function showPokemons(pokemonList) {
  listWrapper.innerHTML = "";

  pokemonList.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
      <div class="number-wrap">
        <p class="caption-fonts">#${pokemonID}</p>
      </div>
      <div class="image-wrap">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
      </div>
      <div class="name-wrap">
        <p class="body3-fonts">${pokemon.name}</p>
      </div>
    `;

    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./details.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

searchInput.addEventListener("keyup", filterResults);

function filterResults() {
  const searchTerm = searchInput.value.toLowerCase();
  let searchedPokemons;

  if (numberFilter.checked) {
    searchedPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });
  } else if (nameFilter.checked) {
    searchedPokemons = allPokemons.filter((pokemon) => {
      return pokemon.name.toLowerCase().startsWith(searchTerm);
    });
  } else {
    searchedPokemons = allPokemons;
  }

  showPokemons(searchedPokemons);

  if (searchedPokemons.length === 0) {
    notFoundMSG.style.display = "block";
  } else {
    notFoundMSG.style.display = "none";
  }
}

closeButton.addEventListener("click", clearSearch)
function clearSearch(){
    searchInput.value = ""
    showPokemons(allPokemons)
    notFoundMSG.style.display ="none"
}
