// Cara fetch api menggunakan 3rd party library Axios

// element id news ditangkap dari html ke dalam variabel news
let news = document.getElementById('news');
// news kemudian berisi kembalian dari function load
news.innerHTML = load();

// // fetch cara 1: AXIOS
// // melakukan fetch news api menggunakan axios dan mengambil respons berupa artikel berita
// axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206').then(res => {
//     // news selanjutnya akan berisi kembalian dari function render dengan parameter adalah data articles ketika news api berhasil difetch
//     news.innerHTML = render(res.data.articles);
// })

// fetch cara 2: method FETCH
fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206')
    // respon dibuat ke dalam bentuk JSON terlebih dahulu
    .then(res => res.json())
    // kemudian datanya diambil
    .then(data => {
        news.innerHTML = render(data.articles);
    })

// membuat function getSearch sebagai event onclick untuk mendapatkan hasil pencarian dari input
let getSearch = () => {
    // membuat variabel inputVal untuk menangkap value dari inputan 
    let inputVal = document.getElementById('search').value;

    // // cara 1: AXIOS
    // // news api kembali difetch dengan axios tetapi dengan query sesuai value input
    // axios.get(`https://newsapi.org/v2/everything?q=${inputVal}&sortBy=popularity&language=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206`).then(res => {
    //     // news selanjutnya akan berisi kembalian dari function render dengan parameter berupa data articles ketika news api berhasil difetch
    //     news.innerHTML = render(res.data.articles);
    // })

    // cara 2: Fetch
    fetch(`https://newsapi.org/v2/everything?q=${inputVal}&sortBy=popularity&language=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206`)
        // respon dibuat ke dalam bentuk JSON terlebih dahulu
        .then(res => res.json())
        // kemudian datanya diambil
        .then(data => {
            news.innerHTML = render(data.articles);
        })
}

// Membuat function render untuk membuat card article berita sejumlah banyaknya respon data yang difetch
// render memiliki parameter result yang diterima dari hasil respon data api berupa array
function render(result){
    // membuat variabel card
    let card = "";
    // result yang berupa array akan dilakukan pengulangan
    result.map(data => {
        // membuat variabel convertDate yang merupakan hasil konversi dari format tanggal ISO 
        let convertDate = dateConvert(data.publishedAt);
        // Setiap pengulangan akan ditambahkan card sesuai jumlah data hasil respon api
        card += `<div class="mx-10 mb-6 max-w-sm rounded overflow-hidden shadow-lg">
                        <img class="w-full" src="${data.urlToImage}" alt="Sunset in the mountains">
                        <div class="px-6 py-4">
                            <div class="font-bold text-xl">${data.title}</div>
                            <p class="text-gray-400 mb-2">${data.author} - ${convertDate}</p>
                            <p class="text-gray-800 text-base">
                                ${data.description}
                            </p>
                        </div>
                        <button class="mx-6 mb-4 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-white text-sm font-bold py-2 px-4 border border-blue-700 rounded" onclick="window.open('${data.url}','_blank')">Read more...</button>
                    </div>`
    }); 
    // pengembalian render berupa card yang telah dilakukan pengulangan
    return card;
}

// Function load untuk membuat teks loading
function load() {
    return `<h1 class='mx-10 text-2xl font-bold'>Loading...</h1>`;
}

// membuat function dateConvert dengan parameter berupa tanggal untuk konversi dari format tanggal ISO ke format tanggal MM/DD/YY
function dateConvert(date){
        let inputDate = new Date(date);
        return inputDate.toLocaleString();
}