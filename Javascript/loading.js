const loadingContainer = document.createElement('div');
loadingContainer.classList.add('loadingCont');
loadingContainer.style.backgroundColor = 'black';
loadingContainer.style.zIndex = '1000000000';
loadingContainer.style.transition = '1s';
loadingContainer.style.display = 'flex';
loadingContainer.style.justifyContent = 'center';
loadingContainer.style.alignItems = 'center';
loadingContainer.style.position = 'fixed';
loadingContainer.style.top = '0';
loadingContainer.style.left = '0';
loadingContainer.style.right = '0';
loadingContainer.style.bottom = '0';


const loadingGif = document.createElement('img');
loadingGif.src = (location.pathname.includes('pages'))? '../Images/Loading GIF.gif' : 'Images/Loading GIF.gif';
loadingGif.style.width = '110px';
loadingGif.style.height = '110px';

loadingContainer.appendChild(loadingGif);

document.body.appendChild(loadingContainer);

function removeLoader() {
    const getLoadingContainer = document.querySelector('.loadingCont');
    getLoadingContainer.addEventListener('transitionend', e => {
        document.body.removeChild(getLoadingContainer);
    })
    getLoadingContainer.style.opacity = '0';
}