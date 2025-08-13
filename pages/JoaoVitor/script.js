document.addEventListener('DOMContentLoaded', async () => {
  const loadingElement = document.getElementById('loading');
  const container = document.getElementById('pokemonContainer');
  
  try {
      // Mudado para o tipo Dragon (ID 16)
      const dragonTypeResponse = await fetch('https://pokeapi.co/api/v2/type/16/');
      const dragonTypeData = await dragonTypeResponse.json();
      
      // Seleciona até 92 Pokémons do tipo Dragon
      const dragonPokemon = dragonTypeData.pokemon.slice(0, 92);
      
      loadingElement.textContent = `Carregando ${dragonPokemon.length} pokémons do tipo Dragon...`;
      
      const pokemonDetails = [];
      
      for (const pokemon of dragonPokemon) {
          const response = await fetch(pokemon.pokemon.url);
          const data = await response.json();
          pokemonDetails.push(data);
      }
      
      loadingElement.style.display = 'none';
      
      pokemonDetails.forEach(pokemon => {
          const card = document.createElement('div');
          card.className = 'pokemon-card';
          
          card.innerHTML = `
              <div class="pokemon-image">
                  <img src="https://placehold.co/120x120" alt="Official artwork of ${pokemon.name}" />
              </div>
              <h2 class="pokemon-name">${pokemon.name.replace(/-/g, ' ')}</h2>
              <div class="pokemon-details">
                  <p><span>Pokedex #:</span> <span>${pokemon.id}</span></p>
                  <p><span>Height:</span> <span>${pokemon.height / 10}m</span></p>
                  <p><span>Weight:</span> <span>${pokemon.weight / 10}kg</span></p>
                  <p><span>Types:</span> <span>
                      ${pokemon.types.map(type => 
                          `<span class="ghost-badge">${type.type.name}</span>`
                      ).join(' ')}
                  </span></p>
                  <p><span>Abilities:</span> <span>
                      ${pokemon.abilities
                          .filter(a => !a.is_hidden)
                          .map(a => a.ability.name.replace(/-/g, ' '))
                          .join(', ')}
                  </span></p>
              </div>
          `;
          
          const img = card.querySelector('img');
          const officialArt = pokemon.sprites.other['official-artwork'].front_default;
          if (officialArt) {
              img.onload = () => img.style.opacity = 1;
              img.src = officialArt;
              img.alt = `Official artwork of ${pokemon.name}`;
          }
          
          container.appendChild(card);
      });
      
  } catch (error) {
      loadingElement.textContent = 'Falha ao carregar os Pokémons do tipo Dragon. Tente novamente mais tarde!';
      console.error('Erro ao buscar dados dos Pokémons:', error);
  }
});
