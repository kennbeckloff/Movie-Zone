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
getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=864abc344e6193436694c57936f427a3&page=${Math.floor(Math.random() * 10) + 1}`);
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

//calling functions to display Movie Properties
function showMovies(data) {
    info.innerHTML = ``;
    data.forEach(movie => {
        const {title,poster_path,vote_average,overview} = movie;
        const movie_element = document.createElement('div');
        movie_element.classList.add('movie');
        movie_element.innerHTML = `
            <img src="${image_base_url + poster_path}" alt="${movie.title}">
            <div class="movie-info">
            
                <h3>${TitleConcatinate(title)}</h3>
                <span class="${getcolor(vote_average)}" id="green"><i class="fas fa-star"></i>${movie.vote_average}</span>
            </div>
            <div class="overview">
                <h3>${title}</h3>
                <br>
                <h6> Release Date:</h6>  <p>${movie.release_date}</p>
                <h2> Rating:</h2>  <p>${(vote_average).toFixed(2)}</p>
                <h2>Cast:</h2>  <p></p>
                <h2>Plot:</h2>
                <p>${movie.overview}</p>
            </div>
        `;
        //apending child
        info.appendChild(movie_element);
    });
 }

 //function concatinating movie title
 function TitleConcatinate(title) {   
    if(title.length >= 30) {
        return (title.substring(0,30) + "...");
    } else {
       return title;
    }
 }

 //function to Movie Rating
 function getcolor(rating) {
    if(rating >=8 ) {
       return 'green'
    }else if(rating >=5) {
    return 'orange'
    }else {
        return 'red'
    }  
}

//movie search
document.getElementById('form').addEventListener('submit' , (event) => {
    event.preventDefault();
    const searchItem = search.value;
    if(searchItem) {
        getMovies(search_url + '&query=' + searchItem)
    } else {
        getMovies(api_url)
    }    
})

//search items
document.getElementById('search-container').addEventListener('click' , (event) => {
    event.preventDefault();
    const searchItem = search.value;
    if(searchItem) {
        getMovies(search_url + '&query=' + searchItem)
    } else {
        getMovies(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=864abc344e6193436694c57936f427a3`)
    }    
})
