// DOM elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const spriteContainer = document.getElementById("sprite-container");

// Function to fetch Pokémon data
async function fetchPokemonData(query) {
    try {
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${query.toLowerCase()}`);
        if (!response.ok) {
            throw new Error("Pokémon not found");
        }
        const data = await response.json();
        displayPokemonData(data);
    } catch (error) {
        alert(error.message);
    }
}

// Function to display Pokémon data
function displayPokemonData(data) {
    // Clear previous data
    spriteContainer.innerHTML = "";
    types.innerHTML = "";

    // Set Pokémon name and ID
    pokemonName.textContent = data.name.toUpperCase();
    pokemonId.textContent = `#${data.id}`;

    // Set weight and height
    weight.textContent = `Weight: ${data.weight}`;
    height.textContent = `Height: ${data.height}`;

    // Set types
    data.types.forEach(type => {
        const typeElement = document.createElement("span");
        typeElement.textContent = type.type.name.toUpperCase();
        types.appendChild(typeElement);
    });

    // Set stats
    hp.textContent = data.stats[0].base_stat;
    attack.textContent = data.stats[1].base_stat;
    defense.textContent = data.stats[2].base_stat;
    specialAttack.textContent = data.stats[3].base_stat;
    specialDefense.textContent = data.stats[4].base_stat;
    speed.textContent = data.stats[5].base_stat;

    // Set sprite
    const sprite = document.createElement("img");
    sprite.id = "sprite";
    sprite.src = data.sprites.front_default;
    spriteContainer.appendChild(sprite);
}

// Event listener for search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchPokemonData(query);
    } else {
        alert("Please enter a Pokémon name or ID");
    }
});