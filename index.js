// Using Axios
let news = document.getElementById('news');
news.innerHTML = load();
axios.get('https://newsapi.org/v2/top-headlines?country=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206').then(res => {
    news.innerHTML = render(res.data.articles);
})

// Live Search
let getSearch = () => {
    let inputVal = document.getElementById('search').value;
    axios.get(`https://newsapi.org/v2/everything?q=${inputVal}&sortBy=popularity&language=id&apiKey=9d773bd0c3cc4e669a70b9afa886b206`).then(res => {
        document.getElementById('news').innerHTML = render(res.data.articles);
    })
    console.log(typeof res.data.articles.publishedAt)
}



function render(result){
    let card = "";
    result.map(data => {
        let convertDate = dateConvert(data.publishedAt);
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
    
    return card;
}

function load() {
    return `<h1 class='mx-10 text-2xl font-bold'>Loading...</h1>`;
}

function dateConvert(date){
        let inputDate = new Date(date);
        return inputDate.toLocaleString();
}