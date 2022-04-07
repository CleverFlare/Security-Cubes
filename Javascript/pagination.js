const pages = document.querySelectorAll('.pagination .pages');
const next = document.querySelector('.pagination .next');
const prev = document.querySelector('.pagination .prev');
const gamesList = document.querySelector('.gridGames')
let pagesNum = 0;
let url = "../games.json"
function fetchGames(url) {
    fetch(url).then(response => {
        response.json().then(gameItems)
    }).catch(err => {
        console.log(err);
    })
}

function gameItems(jsonFile) {
    while(gamesList.firstChild) {
        gamesList.removeChild(gamesList.firstChild);
    }
    const games = jsonFile[pagesNum];
    for(const game of games) {
        const gameItem = document.createElement('a');
        gameItem.setAttribute('href', '');
        gameItem.setAttribute('class', 'gameItem');

        const gameTitle = document.createElement('h2');
        gameTitle.textContent = game.name;
        gameItem.appendChild(gameTitle);

        const gamePicture = document.createElement('img');
        gamePicture.setAttribute('src', game.image);
        gamePicture.setAttribute('alt', 'Descriptive image');
        gameItem.appendChild(gamePicture);

        gamesList.appendChild(gameItem)
    }
}

document.addEventListener('load', fetchGames(url))

function pagesUpdate() {
    fetchGames(url);
    for(page of pages) {
        page.classList.remove('active');
    }
    pages[pagesNum].classList.add('active');
}

next.addEventListener('click', e => {
    if(pagesNum < pages.length - 1) {
        pagesNum++;
        pagesUpdate();
    }
})
prev.addEventListener('click', e => {
    if(pagesNum > 0) {
        pagesNum--;
        pagesUpdate();
    }
})

pages.forEach(button => {
    button.addEventListener('click', e => {
        fetchGames(url);
        for(page of pages) {
            page.classList.remove('active');
        }
        button.classList.add('active')
        for(let i = 0; i <= pages.length - 1; i++) {
            if(pages[i].classList[1] === 'active') {
                pagesNum = i;
            }
        }
    })
})
