// Função para buscar os primeiros 20 Pokémons do tipo elétrico
fetch('https://pokeapi.co/api/v2/type/electric/')
  .then(response => response.json())
  .then(data => {
    // A resposta contém um array com os Pokémons do tipo Elétrico
    const pokemonsElectric = data.pokemon.slice(0, 20); // Pegando os primeiros 20 Pokémons

    // Selecionando o elemento da lista na página
    const pokemonList = document.getElementById('pokemon-list');

    // Percorrendo os Pokémon e adicionando à lista
    pokemonsElectric.forEach(pokemon => {
      // Obtemos os detalhes do Pokémon
      fetch(pokemon.pokemon.url)
        .then(response => response.json())
        .then(pokemonData => {
          const listItem = document.createElement('li');
          
          // Criar a estrutura HTML para cada Pokémon
          const pokemonName = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.slice(1);
          const pokemonImage = pokemonData.sprites.front_default;
          const pokemonWeight = pokemonData.weight / 10;  // Peso em kg
          const pokemonHeight = pokemonData.height / 10;  // Altura em metros

          listItem.innerHTML = `
            <div class="pokemon-info">
              <img src="${pokemonImage}" alt="${pokemonName}">
              <div class="pokemon-details">
                <span><strong>${pokemonName}</strong></span>
                <span>Peso: ${pokemonWeight} kg</span>
                <span>Altura: ${pokemonHeight} m</span>
              </div>
            </div>
          `;

          // Adiciona o Pokémon à lista
          pokemonList.appendChild(listItem);
        })
        .catch(error => console.error('Erro ao buscar os detalhes do Pokémon:', error));
    });
  })
  .catch(error => {
    console.error('Erro ao buscar os Pokémons:', error);
  });
