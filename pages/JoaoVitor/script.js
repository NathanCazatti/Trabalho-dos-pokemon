
  document.addEventListener('DOMContentLoaded', () => {
  const divs = document.querySelectorAll('.campos .caracteristicas');
  
  // Função para criar o conteúdo HTML do Pokémon
  function criarConteudoPokemon(data) {
    return `
      <h3>${data.name.toUpperCase()} (ID: ${data.id})</h3>
      <img src="${data.sprites.front_default}" alt="${data.name}" />
      <p><strong>Tipo(s):</strong> ${data.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Altura:</strong> ${data.height / 10} m</p>
      <p><strong>Peso:</strong> ${data.weight / 10} kg</p>
      <p><strong>Habilidades:</strong> ${data.abilities.map(a => a.ability.name).join(', ')}</p>
      <p><strong>Experiência Base:</strong> ${data.base_experience}</p>
    `;
  }

  // Buscar e preencher cada div com um Pokémon diferente
  divs.forEach((div, index) => {
    const pokemonId = index + 1; // IDs 1 a 9

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(response => response.json())
      .then(data => {
        div.innerHTML = criarConteudoPokemon(data);
      })
      .catch(err => {
        div.textContent = 'Erro ao carregar Pokémon';
        console.error(err);
      });
  });
});
