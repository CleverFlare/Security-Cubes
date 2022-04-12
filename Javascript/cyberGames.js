
if(!localStorage.getItem('token')) {
    localStorage.setItem('destination', 'cyberGames.html');
    location.href = 'account.html'
};
const gamesList = document.querySelector('.gridGames');
async function gameItems() {
    await userData().then(json => {
        if(json.planType === 'Free plan !') {
            location.href = 'http://127.0.0.1:5500/index.html#pricing';
        }
        console.log(json);
    })
    await fetch('https://securitycubes.com/api/getGames/', {
        headers: { Authorization: "Token " + localStorage.getItem('token') }
    }).then(res => {
        res.json().then(games => {
            for(const game of games) {
                const gameItem = document.createElement('a');
                gameItem.setAttribute('href', '../game page/game.html');
                gameItem.setAttribute('class', 'gameItem');

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.GameName;
                gameItem.appendChild(gameTitle);

                const gamePicture = document.createElement('img');
                gamePicture.setAttribute('src', game.GamePhoto);
                gamePicture.setAttribute('alt', 'Descriptive image');
                gameItem.appendChild(gamePicture);

                gameItem.addEventListener('click', e => {
                    localStorage.setItem('GameCodeUrl', game.GameCodeUrl);
                    localStorage.setItem('GameDataUrl', game.GameDataUrl);
                    localStorage.setItem('GameFrameworkUrl', game.GameFrameworkUrl);
                    localStorage.setItem('GameLoderUrl', game.GameLoderUrl);
                })

                gamesList.appendChild(gameItem);
            }
            removeLoader();
        })
    })
}
gameItems()