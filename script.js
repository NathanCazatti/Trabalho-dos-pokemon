// Sample Pokémon data
const pokemonData = {
    charizard: {
        name: "Charizard",
        number: "#006",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/84fb2415-330a-4af9-ba4b-92cef891b64c.png",
        alt: "Charizard em pose de batalha com asas abertas e chamas saindo da boca",
        types: ["Fogo", "Voador"],
        weight: "90.5 kg",
        height: "1.7 m",
        description: "Charizard voa pelo céu em busca de oponentes poderosos. Ele respira fogo de temperaturas incrivelmente altas que podem derreter qualquer coisa. No entanto, nunca vira sua fúria contra qualquer oponente mais fraco do que ele.",
        stats: {
            hp: 78,
            attack: 84,
            defense: 78,
            spAttack: 109,
            spDefense: 85,
            speed: 100
        }
    },
    pikachu: {
        name: "Pikachu",
        number: "#025",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/fc2b1350-f1fc-45e8-b356-66dc8c6e3bce.png",
        alt: "Pikachu alegre com bochechas elétricas e cauda em forma de raio",
        types: ["Elétrico"],
        weight: "6.0 kg",
        height: "0.4 m",
        description: "Pikachu pode gerar eletricidade poderosa, porém não perigosa, nas bochechas. Aparece frequentemente em residências, onde rouba pequenos pedaços de energia elétrica de tomadas não vigiadas.",
        stats: {
            hp: 35,
            attack: 55,
            defense: 40,
            spAttack: 50,
            spDefense: 50,
            speed: 90
        }
    },
    gyarados: {
        name: "Gyarados",
        number: "#130",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c0038faf-c0df-488a-9890-d4d2be21078b.png",
        alt: "Gyarados emergindo da água com expressão furiosa e corpo serpentino",
        types: ["Água", "Voador"],
        weight: "235.0 kg",
        height: "6.5 m",
        description: "Gyarados é um Pokémon extremamente agressivo conhecido por destruir cidades em sua fúria. Há registros de sua fúria queimando vilas inteiras após tempestades.",
        stats: {
            hp: 95,
            attack: 125,
            defense: 79,
            spAttack: 60,
            spDefense: 100,
            speed: 81
        }
    },
    bulbasaur: {
        name: "Bulbasaur",
        number: "#001",
        image: "https://placehold.co/400x400",
        alt: "Bulbasaur sorrindo com o bulbo nas costas brilhando suavemente",
        types: ["Planta", "Venenoso"],
        weight: "6.9 kg",
        height: "0.7 m",
        description: "Bulbasaur pode ser visto dormindo sob a luz do sol. Há uma semente nas suas costas que cresce imensamente desde o seu nascimento. A semente absorve nutrientes para o Pokémon crescer.",
        stats: {
            hp: 45,
            attack: 49,
            defense: 49,
            spAttack: 65,
            spDefense: 65,
            speed: 45
        }
    },
    snorlax: {
        name: "Snorlax",
        number: "#143",
        image: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/1f1c1e1e-1c1e-4c1e-8c1e-1c1e1c1e1c1e.png",
        alt: "Snorlax dormindo tranquilamente",
        types: ["Normal"],
        weight: "460.0 kg",
        height: "2.1 m",
        description: "Snorlax é conhecido por sua grande quantidade de sono. Ele pode dormir por longos períodos e é muito difícil de acordar.",
        stats: {
            hp: 160,
            attack: 110,
            defense: 65,
            spAttack: 65,
            spDefense: 110,
            speed: 30
        }
    }
};

function openModal(pokemonId) {
    const pokemon = pokemonData[pokemonId];
    const modal = document.getElementById('pokemonModal');
    const modalContent = document.getElementById('modalContent');
    
    modalContent.innerHTML = `
        <div class="p-6">
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1">
                    <div class="bg-gray-200 rounded-lg p-6 flex justify-center">
                        <img src="${pokemon.image}" alt="${pokemon.alt}" class="h-64 w-64 object-contain">
                    </div>
                </div>
                <div class="flex-1">
                    <h2 class="text-3xl font-bold">${pokemon.name} <span class="text-gray-500 text-xl">${pokemon.number}</span></h2>
                    
                    <div class="flex gap-2 my-3">
                        ${pokemon.types.map(type => `
                            <span class="type-badge ${getTypeColorClass(type)}">${type}</span>
                        `).join('')}
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 my-4">
                        <div>
                            <span class="text-gray-600">Altura:</span>
                            <span class="font-semibold block">${pokemon.height}</span>
                        </div>
                        <div>
                            <span class="text-gray-600">Peso:</span>
                            <span class="font-semibold block">${pokemon.weight}</span>
                        </div>
                    </div>
                    
                    <p class="text-gray-700 mt-4">${pokemon.description}</p>
                </div>
            </div>
            
            <div class="mt-8">
                <h3 class="text-xl font-semibold mb-4">Estatísticas Base</h3>
                <div class="space-y-3">
