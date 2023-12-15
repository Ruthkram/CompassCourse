let clickCount = 0;

document.addEventListener('DOMContentLoaded', () => {
    displayTodos();

    document.body.addEventListener('click', () => {
        clickCount += 1;

        const clickCountEl = document.getElementById('click-count');

        if (clickCountEl) {
            clickCountEl.textContent = clickCount;
        }
    });

    const addButton = document.getElementById('add-todo');

    if (addButton) {
        addButton.addEventListener('click', () => {
            const input = document.getElementById('todo-input');
            const newValue = input.value.trim();

            if (newValue != "") {
                saveTodoInCookie(newValue);

                const list = document.getElementById('todo-items');
                const li = document.createElement('li');
                li.classList.add('list-group-item')
                li.textContent = newValue;
                list.appendChild(li);

                input.value = "";

                // Trigger Canvas Confetti
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }
        });
    }
});

function saveTodoInCookie(todo) {
    let todoCookie = getTodosFromCookie();
    todoCookie.push(todo);
    document.cookie = "todos=" + JSON.stringify(todoCookie) + ";path=/";
}

function getTodosFromCookie() {
    const cookieString = document.cookie.split('; ').find(row => row.startsWith('todos='));
    if (cookieString) {
        const cookieValue = cookieString.split('=')[1];
        try {
            return JSON.parse(decodeURIComponent(cookieValue));
        }

        catch (e) {
            return [];
        }
    }
    return [];
}

function displayTodos() {
    const todos = getTodosFromCookie();
    const list = document.getElementById('todo-items');

    list.innerHTML = '';

    todos.forEach(todoInCookie => {
        const li = document.createElement('li')
        li.classList.add('list-group-item');
        li.textContent = todoInCookie;
        list.appendChild(li);
    })

}
//API Function Code
document.getElementById('fetch-pokemon').addEventListener('click', () => {
    const pokemonName = document.getElementById('pokemon-input').value.trim().toLowerCase();

    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => response.json())
            .then(data => displayPokemonData(data))
            .catch(error => console.error('Error:', error));
    }
});

function displayPokemonData(pokemonData) {
    const infoDiv = document.getElementById('pokemon-info');

    if (pokemonData) {
        infoDiv.innerHTML = `
            <p>Name: ${pokemonData.name}</p>
            <p>ID: ${pokemonData.id}</p>
            <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        `;
    } else {
        infoDiv.innerHTML = `<p>Pokemon not found</p>`;
    }
}