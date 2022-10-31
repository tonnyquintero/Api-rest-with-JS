const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/images/favourites';
const API_KEY = 'api_key=ec4e811b-482b-43c5-b0de-2c841686e0f7';

const spanError = document.getElementById('error');

async function reloadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random')
    console.log(data)


    if (res.status !==200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status;

    } else  {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');


        img1.src = data[0].url;
        img2.src = data[1].url;

    }
}

async function loadFavoritesmMichis() {
    const res = await fetch(`${API_URL_FAVORITES}&${API_KEY}`);
    const data = await res.json();

    console.log('Favorites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
    }

}

reloadRandomMichis();
loadFavoritesmMichis()