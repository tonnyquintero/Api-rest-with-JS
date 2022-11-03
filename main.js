const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=2';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?';
const API_KEY = 'api_key=live_fAkiaYHjeH5pgHCvyr3FKA79HR5kj5ZoRL1BJU7waZYFkdqfoaKqcb8aNZYzrH9A';

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
        const btn1 = document.getElementById('btn1')
        const img2 = document.getElementById('img2');
        const btn2 = document.getElementById('btn2')


        img1.src = data[0].url;
        img2.src = data[1].url;

        btn1.onclick = () => saveFavouritesMichi(data[0].id)
        btn2.onclick = () => saveFavouritesMichi(data[1].id)

    }
}

async function loadFavoritesmMichis() {
    const res = await fetch(`${API_URL_FAVORITES}&${API_KEY}`);
    const data = await res.json();

    console.log('Favorites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
    } else {
        data.forEach(kitty => {
            const section = document.getElementById('favoritesMichis')
            const article = document.createElement('article')
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Sacar al gatito de favoritos');

            img.src = kitty.image.url
            img.width = 150
            btn.appendChild(btnText);
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        });
    }

}

async function saveFavouritesMichi(id) {
    const resi = await fetch(`${API_URL_FAVORITES}&${API_KEY}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: id
        }),
});

    const data = await resi.json();
    console.log('Save')
    console.log(resi)

    
    if (resi.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + resi.status + data.message;
    }
}


saveFavouritesMichi()
reloadRandomMichis();
loadFavoritesmMichis()