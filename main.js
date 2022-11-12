const  api = axios.create({
    baseURL: 'https://api.thecatapi.com/v1'
});

api.defaults.headers.common['X-API-KEY'] = 'live_fAkiaYHjeH5pgHCvyr3FKA79HR5kj5ZoRL1BJU7waZYFkdqfoaKqcb8aNZYzrH9A';

const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=6';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites?api_key=';
const API_KEY = 'live_fAkiaYHjeH5pgHCvyr3FKA79HR5kj5ZoRL1BJU7waZYFkdqfoaKqcb8aNZYzrH9A';
const API_DELETE_FAVOURITE = (id) => `https://api.thecatapi.com/v1/favourites/${id}?api_key=`


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
        const btn2 = document.getElementById('btn2');
        const img3 = document.getElementById('img3');
        const btn3 = document.getElementById('btn3');
        const img4 = document.getElementById('img4');
        const btn4 = document.getElementById('btn4');
        const img5 = document.getElementById('img5');
        const btn5 = document.getElementById('btn5');
        const img6 = document.getElementById('img6');
        const btn6 = document.getElementById('btn6');


        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        img4.src = data[3].url;
        img5.src = data[4].url;
        img6.src = data[5].url;
        img1.width = 150
        img2.width = 150
        img3.width = 150
        img4.width = 150
        img5.width = 150
        img6.width = 150

        btn1.onclick = () => saveFavouritesMichi(data[0].id)
        btn2.onclick = () => saveFavouritesMichi(data[1].id)
        btn3.onclick = () => saveFavouritesMichi(data[2].id)
        btn4.onclick = () => saveFavouritesMichi(data[3].id)
        btn5.onclick = () => saveFavouritesMichi(data[4].id)
        btn6.onclick = () => saveFavouritesMichi(data[5].id)

    }
}

async function loadFavoritesmMichis() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY': API_KEY
        }
    });
    const data = await res.json();

    console.log('Favorites')
    console.log(data)

    if (res.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + res.status + data.message;
    } else {
        const section = document.getElementById('favoritesMichis')
        section.innerHTML = ""
        

        data.forEach(kitty => {
            const article = document.createElement('article')
            article.className = 'nose'
            const img = document.createElement('img')
            const btn = document.createElement('button')
            const btnText = document.createTextNode('Sacar al gatito de favoritos 😿');

            img.src = kitty.image.url
            img.width = 150
            img.height = 150
            btn.appendChild(btnText);
            btn.onclick = () => deleteFavouritesMichi(kitty.id)
            article.appendChild(img)
            article.appendChild(btn)
            section.appendChild(article)
        });
    }

}

async function saveFavouritesMichi(id) {

//     -----------Con Axios------
    const { data, status } = await api.post('/favourites', {
        image_id: id,
    });

//          ------Sin Axios-----
//     const resi = await fetch(API_URL_FAVORITES, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-API-KEY': API_KEY
//         },
//         body: JSON.stringify({
//             image_id: id
//         }),
// });

//     const data = await resi.json();
    console.log('Save')

    
    if (status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + status + data.message;
    } else {
        console.log('Gatito guardado en favoritos');
        loadFavoritesmMichis()
    }
}

async function deleteFavouritesMichi(id) {
    const resi = await fetch(API_DELETE_FAVOURITE(id), {
        method: 'DELETE',
        headers: {
            'X-API-KEY': API_KEY
        }
});

    const data = await resi.json();

    if (resi.status !== 200) {
        spanError.innerHTML = 'Hubo un error: ' + resi.status + data.message;
    } else {
        console.log('Gatito eliminado de favoritos');
        loadFavoritesmMichis()
    }
}


saveFavouritesMichi()
reloadRandomMichis();
loadFavoritesmMichis()