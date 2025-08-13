document.addEventListener('DOMContentLoaded', async () => {
  const loadingElement = document.getElementById('loading');
  const container = document.getElementById('pokemonContainer');
  
  try {
      const ghostTypeResponse = await fetch('https://pokeapi.co/api/v2/type/8/');
      const ghostTypeData = await ghostTypeResponse.json();
      
      const ghostPokemon = ghostTypeData.pokemon.slice(0, 92);
      
      loadingElement.textContent = `Carregando ${ghostPokemon.length} pokemon `;
      
      const pokemonDetails = [];
      
      for (const pokemon of ghostPokemon) {
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
      loadingElement.textContent = 'Failed to summon the ghosts. Try again later!';
      console.error('Error fetching Pokemon data:', error);
  }
});
