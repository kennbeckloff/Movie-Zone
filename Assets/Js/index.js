//getting data from the TMDH Api
const base_url = "https://api.themoviedb.org/3"
const api_key = "api_key=864abc344e6193436694c57936f427a3"
const dicovery = "/discover/movie?sort_by=popularity.desc&"
const api_url = base_url + dicovery + api_key
const image_base_url = "https://image.tmdb.org/t/p/w500";
const search_url = base_url + '/search/movie?' + api_key;

//get movies to be displayed in Display Section
const info = document.querySelector(".displayMovie");

//linking API to get Movies
getMovies(api_url);
function getMovies(api_url) {   
        fetch(api_url)
        .then(function(response) { 
            return response.json()
        })
        .then(function (data){            
            if(data.results){
                showMovies(data.results);              
            }else{
                info.innerHTML= `<h2 class="no-reults">No Matching Results Were Found<h2>`;
            }
        })
        .catch(error => console.log(error))
}
