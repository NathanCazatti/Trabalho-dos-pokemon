async function fetchFirePokemons() {
  const listEl = document.getElementById('pokemonList');
  listEl.innerHTML = 'Carregando...';

  try {
    const response = await fetch('https://pokeapi.co/api/v2/type/fire');
    const data = await response.json();

    const pokemons = data.pokemon.slice(0, 20); // só 20 pra não pesar

    listEl.innerHTML = '';

    // Cria as duas colunas
    const col1 = document.createElement('div');
    const col2 = document.createElement('div');
    col1.className = 'pokemon-column';
    col2.className = 'pokemon-column';

    const half = Math.ceil(pokemons.length / 2);

    for (let i = 0; i < pokemons.length; i++) {
      const p = pokemons[i];
      const pokeResponse = await fetch(p.pokemon.url);
      const pokeData = await pokeResponse.json();

      const card = document.createElement('div');
      card.className = 'pokemon-card';

      const types = pokeData.types.map(t => t.type.name).join(', ');

      card.innerHTML = `
        <img src="${pokeData.sprites.front_default}" alt="${pokeData.name}" />
        <div class="pokemon-name">${pokeData.name}</div>
        <div class="pokemon-types">${types}</div>
      `;

      if (i < half) {
        col1.appendChild(card);
      } else {
        col2.appendChild(card);
      }
    }

    listEl.appendChild(col1);
    listEl.appendChild(col2);

  } catch (error) {
    listEl.innerHTML = 'Erro ao carregar os Pokémons.';
    console.error(error);
  }
}

fetchFirePokemons();
