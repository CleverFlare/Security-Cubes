const navbar = document.querySelector('nav ul');
const nav = document.querySelector('nav');
const navLeftIcons = document.querySelector('nav .navLeftIcons');
const menu = document.querySelector('.menu');
const menuBurg = document.querySelector('.menu #menu-24px');
const menuClose = document.querySelector('.menu #close-24px');
const accountIcon = document.querySelector('nav .account');

menu.addEventListener('click', e => {
    e.preventDefault();
    switch(menuBurg.style.display) {
        case 'none':
            menuClose.style.display = 'none';
            menuBurg.style.display = 'block';
            navbar.style.left = '100%';
            break;
        default:
            menuClose.style.display = 'block';
            menuBurg.style.display = 'none';
            navbar.style.left = '0';
    }
});

function logOutIcon() {
    if(document.querySelector('nav a.logout') !== null) return;
    const logoutIconButton = document.createElement('a');
    logoutIconButton.classList.add('icon');
    logoutIconButton.classList.add('logout');
    logoutIconButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="24" height="24">
    <g>
        <path d="M170.698,448H72.757c-4.814-0.012-8.714-3.911-8.725-8.725V72.725c0.012-4.814,3.911-8.714,8.725-8.725h97.941   c17.673,0,32-14.327,32-32s-14.327-32-32-32H72.757C32.611,0.047,0.079,32.58,0.032,72.725v366.549   C0.079,479.42,32.611,511.953,72.757,512h97.941c17.673,0,32-14.327,32-32S188.371,448,170.698,448z" fill="currentColor"/>
        <path d="M483.914,188.117l-82.816-82.752c-12.501-12.495-32.764-12.49-45.259,0.011s-12.49,32.764,0.011,45.259l72.789,72.768   L138.698,224c-17.673,0-32,14.327-32,32s14.327,32,32,32l0,0l291.115-0.533l-73.963,73.963   c-12.042,12.936-11.317,33.184,1.618,45.226c12.295,11.445,31.346,11.436,43.63-0.021l82.752-82.752   c37.491-37.49,37.491-98.274,0.001-135.764c0,0-0.001-0.001-0.001-0.001L483.914,188.117z" fill="currentColor"/>
    </g>
    </svg>`;
    navLeftIcons.appendChild(logoutIconButton);

    const logoutIconListButton = document.createElement('li');
    logoutIconListButton.classList.add('burger');
    const logoutIconAnchor = document.createElement('a');
    logoutIconAnchor.innerText = 'Logout';
    logoutIconAnchor.classList.add('logout');
    logoutIconListButton.appendChild(logoutIconAnchor);
    navbar.appendChild(logoutIconListButton);


    const logoutButton = document.querySelector('nav .navLeftIcons .logout');
    const logoutAnchor = document.querySelector('nav ul .logout');

    logoutButton.addEventListener('click', logOut);
    logoutAnchor.addEventListener('click', logOut);
}

async function userData() {
    if(localStorage.getItem('token') === null) return;

    logOutIcon();

    return fetch('https://securitycubes.com/api/user/', { method: 'GET',
        headers: {
            Authorization: 'Token ' + localStorage.getItem('token')
        }
    }).then(res => {
        return res.json();
    })
}

userData();

function logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    if(location.pathname.includes('pages')) {
        location.href = '../index.html';
    } else {
        location.reload();
    }
    console.log('you\'re logged out');
}

navbar.addEventListener('click', e => {
    menuClose.style.display = 'none';
    menuBurg.style.display = 'block';
    navbar.style.left = '100%';
})

document.addEventListener('scroll', e => {
    if(window.scrollY > 0) {
        nav.style.backgroundColor = 'var(--richBlack)';
        nav.style.boxShadow = '0 10px 20px var(--richBlack)';
    } else {
        nav.style.backgroundColor = 'transparent';
        nav.style.boxShadow = '0 0 0 var(--richBlack)';
    }
})