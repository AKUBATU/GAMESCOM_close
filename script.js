const apiKey = ''; // Ganti dengan API Key Anda
const steamId = '76561198844912638'; // Ganti dengan Steam ID pengguna

async function getOwnedGames() {
    // Gunakan proxy CORS
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${apiKey}&steamid=${steamId}&include_appinfo=true&format=json`;

    try {
        const response = await fetch(proxyUrl + apiUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Data fetched:', data);

        if (data.response && data.response.games && data.response.games.length > 0) {
            displayGames(data.response.games);
        } else {
            console.error('No games found for this user or invalid Steam ID.');
        }
    } catch (error) {
        console.error('Error fetching data from Steam API:', error);
    }
}

function displayGames(games) {
    const gamesContainer = document.getElementById('games-grid');
    gamesContainer.innerHTML = ''; // Kosongkan kontainer

    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');

        const gameImage = document.createElement('img');
        gameImage.src = `https://media.steampowered.com/steam/apps/${game.appid}/header.jpg`;
        gameImage.alt = game.name;

        const gameTitle = document.createElement('h3');
        gameTitle.textContent = game.name;

        const gameButton = document.createElement('button');
        gameButton.classList.add('play-button');
        gameButton.textContent = 'Play Now';
         gameButton.href = `https://store.steampowered.com/app/${game.appid}/`;
        gameButton.addEventListener('click', () => {
            alert(`Launching ${game.name}`);
        });

        gameCard.appendChild(gameImage);
        gameCard.appendChild(gameTitle);
        gameCard.appendChild(gameButton);
        gamesContainer.appendChild(gameCard);
    });
}

// Panggil fungsi untuk mendapatkan game
getOwnedGames(); // Pastikan ini ada di akhir file

/* skrip HTML */

/* sticky NavBar */
window.addEventListener('scroll', function(){
    var header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

/* Responsive NavBar */

function toggleMenu() {
    const toggleMenu = document.querySelector('.toggleMenu');
    const nav = document.querySelector('.nav');
    toggleMenu.classList.toggle('active');
    nav.classList.toggle('active');
}

    /* Scrolling Animation Effect */
    window.addEventListener('scroll',function(){
        var anime = document.querySelectorAll('.animeX');

        for(var s = 0; s < anime.length; s++){
            var windowheight = window.innerHeight;
            var animetop = anime[s].getBoundingClientRect().top;
            var animepoint = 150;

            if(animetop < windowheight - animepoint){
                anime[s].classList.add('active');
            }
            else{
                anime[s].classList.remove('active');
            }
        }
    })

/* Filterable Cards */

let list = document.querySelectorAll('.list');
let card = document.querySelectorAll('.card');

for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function() {
        for (let j = 0; j < list.length; j++) {
            list[j].classList.remove('active');
        }
        this.classList.add('active');

        let datafilter = this.getAttribute('data-filter');

        for( let k=0; k<card.length; k++){
            card[k].classList.remove('active');
            card[k].classList.add('hide');

            if(card[k].getAttribute('data-item') == datafilter || datafilter == 'all'){
                card[k].classList.remove('hide');
                card[k].classList.add('active');
            }
        }
    });
}

/* join Us */
document.querySelector("#show-login").addEventListener("click",function(){
    document.querySelector(".popup").classList.add("active");
});
document.querySelector(".popup .close-btn").addEventListener("click",function(){
    document.querySelector(".popup").classList.remove("active");
});
