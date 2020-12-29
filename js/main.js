
const api_key =  '1a5fae69501ad035aaac560eb7dcc5a6';
const api_url = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=1a5fae69501ad035aaac560eb7dcc5a6&page=1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=1a5fae69501ad035aaac560eb7dcc5a6&query=';
const movies = document.getElementById('movies');
const form = document.getElementById('form');
const search = document.getElementById('search');
const searchBTN = document.getElementById('searchBtn');

getMovies(api_url);
async function getMovies(url){
    const resp = await fetch(url);
    const respData = await resp.json();
    console.log(respData);
    
  showMovies(respData.results);

}

function showMovies(movieData){
    movies.innerHTML = '';
    movieData.forEach((movie) => {
        const movieEl = document.createElement('div');
        movieEl.classList.add('movie');
        movieEl.innerHTML =`
        <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">
        <div class="movie-info">
        <h3>${movie.title}</h3>
        <span class="${getClassByRate(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
        ${movie.overview}
        </div>
       
        `;
        
        movies.appendChild(movieEl);
});
}
function getClassByRate(vote){
if(vote >= 8 ){
return 'green';
} else if(vote >= 5){
    return 'orange';
}
else{
    return 'red';
}
}



searchBTN.addEventListener('click', (e) =>{
    e.preventDefault();

   const searchTerm = search.value;
   if(searchTerm){
       const apiNew = SEARCHAPI + searchTerm;
       getMovies(apiNew);
       search.value  = '';
   }
   
})