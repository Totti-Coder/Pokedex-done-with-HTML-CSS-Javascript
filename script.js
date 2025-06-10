const MAX_POKEMON = 386;
const listWrapper = document.querySelector(".list-wrapper");
const searchInput = document.querySelector("#search-input");
const numberFilter = document.querySelector("#number");
const nameFilter = document.querySelector("#name");
const notFoundMessage = document.querySelector("#not-found-message");
const darkModeIcon = document.getElementById("dark-mode-icon");
const iconDark = "imgs/solrock.png";
const iconLight = "imgs/lunatone.png"; 

let allPokemons = [];

/* Function to obtain the list of pokemons from the PokeApi */
fetch(`https://pokeapi.co/api/v2/pokemon?limit=${MAX_POKEMON}`)
  .then((response) => response.json())
  .then((data) => {
    allPokemons = data.results;
    displayPokemons(allPokemons);
  });

/* This function preloads a Pokémon's data before redirecting the user to another page (details.html)*/
async function fetchPokemonDataBeforeRedirect(id) {
  try {
    const [pokemon, pokemonSpecies] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
        res.json()
      ),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`).then((res) =>
        res.json()
      ),
    ]);
    return true;
  } catch (error) {
    console.error("Failed to fetch Pokemon data before redirect");
  }
}
/* Function that displays Pokemon details (id, image and name) */
function displayPokemons(pokemon) {
  listWrapper.innerHTML = "";

  pokemon.forEach((pokemon) => {
    const pokemonID = pokemon.url.split("/")[6];
    const listItem = document.createElement("div");
    listItem.className = "list-item";
    listItem.innerHTML = `
        <div class="number-wrap">
            <p class="caption-fonts">#${pokemonID}</p>
        </div>
        <div class="img-wrap">
            <img src="https://raw.githubusercontent.com/pokeapi/sprites/master/sprites/pokemon/other/dream-world/${pokemonID}.svg" alt="${pokemon.name}" />
        </div>
        <div class="name-wrap">
            <p class="body2-fonts">#${pokemon.name}</p>
        </div>
    `;
    /* When you click in a Pokemon it sends you to the details.html if there's no error. */
    listItem.addEventListener("click", async () => {
      const success = await fetchPokemonDataBeforeRedirect(pokemonID);
      if (success) {
        window.location.href = `./details.html?id=${pokemonID}`;
      }
    });

    listWrapper.appendChild(listItem);
  });
}

/* This code implements the search function to filter the list of Pokémon as the user types in the search field. */
searchInput.addEventListener("keyup", handleSearch);

function handleSearch() {
  const searchTerm = searchInput.value.toLowerCase();
  let filteredPokemons;

  /* If you sort by number */
  if (numberFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) => {
      const pokemonID = pokemon.url.split("/")[6];
      return pokemonID.startsWith(searchTerm);
    });

    /* If you sort by name */
  } else if (nameFilter.checked) {
    filteredPokemons = allPokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().startsWith(searchTerm)
    );
  } else {
    filteredPokemons = allPokemons;
  }

  displayPokemons(filteredPokemons);

  if (filteredPokemons.length === 0) {
    notFoundMessage.style.display = "block";
  } else {
    notFoundMessage.style.display = "none";
  }
}

const closeButton = document.querySelector(".search-close-icon");
closeButton.addEventListener("click", clearSearch);

/* Function to clear the search */
function clearSearch() {
  searchInput.value = "";
  displayPokemons(allPokemons);
  notFoundMessage.style.display = "none";
}

/* Dark mode functions */
const toggle = document.getElementById('toggle');
const pokemonList = document.querySelector('.pokemon-list');
const searchWrap = document.querySelector('.search-wrap');
const searchingInput = document.getElementById('search-input');
const sortWrap = document.querySelector('.sort-wrap');
const sortWrapper = document.querySelector('.sort-wrapper');
const filterWrap = document.querySelector('.filter-wrap');
const filterWrapper = document.querySelector('.filter-wrapper');

toggle.addEventListener('change', () => {
  const isDark = toggle.checked;
  
  pokemonList.classList.toggle('dark', isDark);
  searchWrap.classList.toggle('dark', isDark);
  searchingInput.classList.toggle('dark', isDark);
  sortWrap.classList.toggle('dark', isDark);
  sortWrapper.classList.toggle('dark', isDark);
  filterWrap.classList.toggle('dark', isDark);
  filterWrapper.classList.toggle('dark', isDark);
  
  
  document.querySelectorAll('.list-item').forEach(item => {
    item.classList.toggle('dark', isDark);
  });
});

toggle.addEventListener("change", () => {
  if (toggle.checked) {
    
    darkModeIcon.src = iconLight;
    darkModeIcon.alt = "Light mode icon";
  } else {
    
    darkModeIcon.src = iconDark;
    darkModeIcon.alt = "Dark mode icon";
  }
});


