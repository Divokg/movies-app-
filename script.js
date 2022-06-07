
const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=04c35731a5ee918f014970082a0088b1&language=en-US&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w500";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");



getMovies(API_URL);




async function getMovies(url){
    const response = await fetch(url);
    const responseData = await response.json();

    console.log(responseData);

    showMovies(responseData.results);

}



function showMovies(movies){
//----------------------clear movies
        main.innerHTML = "";

    movies.forEach(movie => {
        const {poster_path, title, vote_average, overview} = movie;

        const movieEl = document.createElement("div");
        movieEl.classList.add("movie");

        movieEl.innerHTML =`
        <img src="${IMGPATH + poster_path}" alt="${title}">
        <div class="movie-info">
            <h3>${title}</h3>
            <span class="${changeRateColor(vote_average)}">${vote_average}</span>
        </div>
        
        <div class = "overview">${overview}</div>
        
        `;

        main.appendChild(movieEl);
    });

}



function changeRateColor(rate){
    if (rate >= 8){
        return "green";
    }
    else if (rate >= 5){
            return "orange";
        }else return "red";
    }


form.addEventListener("submit",(e)=>{
    e.preventDefault();

    const searchTerm = search.value;

    if(searchTerm){

        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
} )







