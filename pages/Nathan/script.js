// Fetch and display first 20 Ghost-type Pokémon names and pictures on the page
async function fetchAndDisplayGhostTypePokemon() {
    const typeUrl = 'https://pokeapi.co/api/v2/type/ghost';
  
    try {
      const response = await fetch(typeUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch Ghost-type Pokémon list');
      }
      const data = await response.json();
  
      // Take first 20 pokemons
      const pokemonEntries = data.pokemon.slice(0, 20);
  
      // Fetch each Pokemon's data to get sprites (pictures)
      const detailedPromises = pokemonEntries.map(async (entry) => {
        try {
          const res = await fetch(entry.pokemon.url);
          if (!res.ok) {
            throw new Error(`Failed to fetch data for ${entry.pokemon.name}`);
          }
          const pokemonData = await res.json();
          return {
            name: pokemonData.name,
            sprite: pokemonData.sprites.front_default,
          };
        } catch (e) {
          console.error(e);
          return null;
        }
      });
  
      const detailedPokemonList = (await Promise.all(detailedPromises)).filter(Boolean);
  
      // Create or select container element
      let container = document.getElementById('ghost-pokemon-list');
      if (!container) {
        container = document.createElement('div');
        container.id = 'ghost-pokemon-list';
        container.style.padding = '16px';
        container.style.fontFamily = 'Arial, sans-serif';
        container.style.display = 'grid';
        container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
        container.style.gap = '16px';
        document.body.appendChild(container);
      }
  
      // Clear previous content and add title
      container.innerHTML = '<h2 style="grid-column: 1 / -1; text-align: center;">20 Ghost-type Pokémon</h2>';
  
      // Create cards for each Pokemon with image and name
      detailedPokemonList.forEach(({ name, sprite }) => {
        const card = document.createElement('div');
        card.style.display = 'flex';
        card.style.flexDirection = 'column';
        card.style.alignItems = 'center';
        card.style.padding = '12px';
        card.style.border = '1px solid #ccc';
        card.style.borderRadius = '12px';
        card.style.backgroundColor = 'rgba(255,255,255,0.9)';
        card.style.backdropFilter = 'blur(8px)';
  
        const img = document.createElement('img');
        img.src = sprite || 'https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4e663cd1-2886-4274-91dc-7bdcc19450e8.png';
        img.alt = `${name} sprite`;
        img.width = 96;
        img.height = 96;
        img.style.marginBottom = '8px';
  
        const nameEl = document.createElement('span');
        nameEl.textContent = name.charAt(0).toUpperCase() + name.slice(1);
        nameEl.style.fontWeight = '600';
        nameEl.style.fontSize = '1rem';
        nameEl.style.textAlign = 'center';
  
        card.appendChild(img);
        card.appendChild(nameEl);
        container.appendChild(card);
      });
    } catch (error) {
      console.error('Error fetching or displaying Ghost-type Pokémon:', error);
      // Optionally display error message to user
      let container = document.getElementById('ghost-pokemon-list');
      if (!container) {
        container = document.createElement('div');
        container.id = 'ghost-pokemon-list';
        container.style.color = 'red';
        container.style.padding = '16px';
        container.style.fontFamily = 'Arial, sans-serif';
        document.body.appendChild(container);
      }
      container.textContent = 'Failed to load Ghost-type Pokémon list.';
    }
  }
  
  // Call the function to fetch and display immediately
  fetchAndDisplayGhostTypePokemon();
  
  