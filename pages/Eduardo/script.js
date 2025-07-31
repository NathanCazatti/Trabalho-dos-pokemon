// Fetch and display first Grass-type Pokémon names, pictures and characteristics
async function fetchAndDisplayGrassTypePokemon() {
  const typeUrl = 'https://pokeapi.co/api/v2/type/grass';  // Alterado para tipo planta

  try {
    const response = await fetch(typeUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch Grass-type Pokémon list');
    }
    const data = await response.json();

    // Take first 20 pokemons
    const pokemonEntries = data.pokemon.slice(0, 124);

    // Fetch each Pokemon's data to get sprites and stats
    const detailedPromises = pokemonEntries.map(async (entry) => {
      try {
        const res = await fetch(entry.pokemon.url);
        if (!res.ok) {
          throw new Error(`Failed to fetch data for ${entry.pokemon.name}`);
        }
        const pokemonData = await res.json();
        
        // Extract stats
        const stats = pokemonData.stats.map(stat => ({
          name: stat.stat.name,
          value: stat.base_stat
        }));

        return {
          name: pokemonData.name,
          sprite: pokemonData.sprites.front_default,
          stats: stats,
        };
      } catch (e) {
        console.error(e);
        return null;
      }
    });

    const detailedPokemonList = (await Promise.all(detailedPromises)).filter(Boolean);

    // Create or select container element
    let container = document.getElementById('grass-pokemon-list');
    if (!container) {
      container = document.createElement('div');
      container.id = 'grass-pokemon-list';
      container.style.padding = '16px';
      container.style.fontFamily = 'Arial, sans-serif';
      container.style.display = 'grid';
      container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(240px, 1fr))';
      container.style.gap = '16px';
      document.body.appendChild(container);
    }

    // Clear previous content and add title
    container.innerHTML = '<h2 style="grid-column: 1 / -1; text-align: center;">Grass-type Pokémon</h2>';

    // Create cards for each Pokemon with image, name and stats
    detailedPokemonList.forEach(({ name, sprite, stats }) => {
      const card = document.createElement('div');
      card.style.display = 'flex';
      card.style.flexDirection = 'column';
      card.style.alignItems = 'center';
      card.style.padding = '12px';
      card.style.border = '1px solid #ccc';
      card.style.borderRadius = '12px';
      card.style.backgroundColor = 'rgba(255,255,255,0.9)';
      card.style.backdropFilter = 'blur(8px)';
      card.style.boxShadow = '0px 0px 15px rgba(0, 0, 0, 0.1)';
      card.style.transition = 'transform 0.2s ease';

      card.addEventListener('mouseover', () => {
        card.style.transform = 'scale(1.05)';
      });

      card.addEventListener('mouseout', () => {
        card.style.transform = 'scale(1)';
      });

      const img = document.createElement('img');
      img.src = sprite || 'https://via.placeholder.com/96';
      img.alt = `${name} sprite`;
      img.width = 96;
      img.height = 96;
      img.style.marginBottom = '8px';

      const nameEl = document.createElement('span');
      nameEl.textContent = name.charAt(0).toUpperCase() + name.slice(1);
      nameEl.style.fontWeight = '600';
      nameEl.style.fontSize = '1.2rem';
      nameEl.style.textAlign = 'center';

      // Create stats section
      const statsEl = document.createElement('div');
      statsEl.style.marginTop = '10px';
      statsEl.style.fontSize = '0.9rem';
      statsEl.style.textAlign = 'center';

      stats.forEach(stat => {
        const statEl = document.createElement('div');
        statEl.textContent = `${stat.name.charAt(0).toUpperCase() + stat.name.slice(1)}: ${stat.value}`;
        statEl.style.margin = '4px 0';
        statsEl.appendChild(statEl);
      });

      card.appendChild(img);
      card.appendChild(nameEl);
      card.appendChild(statsEl);
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching or displaying Grass-type Pokémon:', error);
    let container = document.getElementById('grass-pokemon-list');
    if (!container) {
      container = document.createElement('div');
      container.id = 'grass-pokemon-list';
      container.style.color = 'red';
      container.style.padding = '16px';
      container.style.fontFamily = 'Arial, sans-serif';
      document.body.appendChild(container);
    }
    container.textContent = 'Failed to load Grass-type Pokémon list.';
  }
}

// Call the function to fetch and display immediately
fetchAndDisplayGrassTypePokemon();

