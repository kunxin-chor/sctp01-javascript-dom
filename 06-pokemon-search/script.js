async function loadData(pokemonName) {
    // all RESTFul API endpoints is a function that is exposed over a URL
    // so like all functions, endpoints must be able to recieve parameters
    // so for the pokeapi case, the pokemon that we want to search for is
    // embedded after the end after the 'pokemon/'
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    return response.data;
}

function renderMoves(moves) {
    let html = '';
    for (let m of moves) {
        html += `<li class="list-group-item">${m.move.name}</li>`;
    }
    return html;
}

document.addEventListener("DOMContentLoaded", async function(){
    document.querySelector("#search-btn").addEventListener("click", async function(){
        const pokemonName = document.querySelector("#pokemon-name").value;
        const pokemon = await loadData(pokemonName);
        console.log(pokemon.moves);
        document.querySelector("#output").innerHTML = `
            <h1>${pokemon.name}</h1>
            <img src="${pokemon.sprites.front_shiny}"/>
            <ul class="list-group">
                ${renderMoves(pokemon.moves)}
            </ul>
        `
    })
})