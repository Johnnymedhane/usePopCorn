import { useState, useEffect,useRef } from "react";
import StarRating from "./starRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useCloseMove } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
 

 const KEY = 'eeae3065';

export default function App() {
const [query, setQuery]= useState("")

const [selectedId, setSelectedId] = useState(null)

const {movies, isLoading, error} = useMovies(query);
  
  const [watched, setWatched] = useLocalStorageState([], 'watched');

function handleSelect(id){
  setSelectedId(selectedId => selectedId === id ? null: id);
 }

function handleCloseMovie(){
  setSelectedId(null);

 }

 function handleAddWatch(movie){
   setWatched(watched => [...watched, movie])
  //  localStorage.setItem('watched', JSON.stringify([...watched, movie]))
 
}

function handleDeleteMovie(id){
   setWatched(watched => watched.filter(movie => movie.imdbID !==id))
}
 
 
  

  return (
  <>
  <NavBar>
    <Logo/>
    <Search query={query} setQuery={setQuery} />
      <NumResult movies={movies}/> 
  </NavBar>
  <Main>
  
    <Box movies={movies}>
      {isLoading && <Loader />}
      {!isLoading && !error && <MoviesList movies={movies} onSelect={handleSelect} onAddWatched={handleAddWatch} />}
      { error && <ErrorMessage message ={error}/>  }
    </Box>
  <Box>
    {selectedId ? (
    <MovieDetails selectedId={selectedId} 
    onCloseMovie={handleCloseMovie}
    onAddWatched={handleAddWatch}
    watched={watched}
    /> 
    ) : (
    <>
    <WatchedSummery watched={watched} />
      <WatchedMoviesList watched={watched} 
      onDeleteWatched={handleDeleteMovie}/>
      </>
      )}
  </Box>
  </Main>
  </>
  )
}

function Loader() {
  return <p className="loader"> loading... </p>
}
function ErrorMessage({message}){
  return <p className="error">
    <span>⛔{message}</span>
    </p>
}
function NavBar({children}) {
  
  return(
     <nav className="nav-bar">
     {children}
      </nav>
  )
}


function Logo(){
  return (
  <div className="logo">
          <span role="img">🍿</span>
          <h1>usePopcorn</h1>
        </div>
  )
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useCloseMove('Enter', () => {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    setQuery('')
  });
  
 
  return(
    <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
        />
      )
    }
function NumResult({movies}){
  return(
     <p className="num-results">
          Found <strong>{movies.length}</strong> results
        </p>
  )
}

 function Main({children}) {
return( 
  <main className="main">
 {children}
  </main>
  )
}
  


function Box({ children}) {
  const [isOpen, setIsOpen] = useState(true);
 
  return(
  <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? "–" : "+"}
          </button>
          {isOpen && children  }
        </div>
        )
      }
  function MoviesList({movies, onSelect}){
   
    return(
       <ul className="list list-movies">
              {movies?.map((movie) => (
               <Movie movie={movie}  key={movie.imdbID} onSelect={onSelect} />
              ))}
            </ul>
    )
  }

function Movie({movie, onSelect}){
  return(
     <li onClick={()=> onSelect(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

  /*function WatchedBox() {
  
  const [isOpen2, setIsOpen2] = useState(true);
  
  
    return(
      <div className="box">
          <button className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}>
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <> 
            <WatchedSummery watched={watched} />
            <WatchedMoviesList watched={watched} />
            </>
          )}
        </div>
    )
  }*/
 function MovieDetails({selectedId, onCloseMovie, onAddWatched, watched}){
  const [movie, setMovie] = useState({});
  const [isloading, setIsLoading] = useState(false);
   const [userRating, setUserRating] = useState('')


   
   const countRef = useRef(0);
   useEffect(() => {
    if(userRating)countRef.current = countRef.current ++;
   console.log(countRef.current)
   }, [userRating]
   )
  

  const isWatched= watched.map((movie) => movie.imdbID).includes(selectedId);

   const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title, 
    Year: year,
     Poster: poster,
     Runtime:runtime, 
     imdbRating, 
     Plot: plot, 
     Released:released, 
     Actors: actors, 
     Director: director, 
     Genre: genre,} = movie;

   
        //  if(imdbRating > 8) return <p>🔥</p>
   //  if(imdbRating > 8) [isTOP, setIsTOP] = useState(true);
   
  //  const [isTOP, setIsTOP] = useState(imdbRating > 8);
  //  console.log(isTOP) it will run only in the intial render and
   // stay fales forever if we don't update it.
   
 //  useEffect(function () {
  //    setIsTOP(imdbRating > 8)
   //  }, [imdbRating])
   
   const isTop = imdbRating > 8;
   console.log(isTop)
   //  it will run every time the component re-renders
   
  //  const [avgRating, setAvgRating] = useState(0);
   
     function handleAdd() {
      const newWatchedMovie = {
        imdbID: selectedId,
        title,
        year, 
        poster,
        imdbRating: Number(imdbRating),
        runtime: Number(runtime.split('').at(0)),
        userRating,
        countRatingDecision: countRef.current,
      }
      onAddWatched(newWatchedMovie);
        onCloseMovie()
      //  setAvgRating(Number(imdbRating))
      //  setAvgRating((avgRating) => (avgRating + userRating) / 2)
     
     }
   
   useCloseMove('Escape', onCloseMovie);
   
   useEffect(
     function () {
    async function getMovieDetails() {
      setIsLoading(true);
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}` // Ensure the URL uses HTTPS
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }
    
    getMovieDetails();

  }, [selectedId, KEY]);
    
useEffect(function() {
  if (!title) return;
  document.title = `Move | ${title}`;
  
  return () => {
    document.title = 'usePopCorn';
    // console.log(`clean up run ${title}`)
  };
}, [title]);
   
   
  return (
  <div className="details">
  { isloading ? <Loader/> : 
  <> 
  <header>
      
     <button className="btn-back" 
      onClick={onCloseMovie}> 
      &larr;</button> 
    
      <img src={poster} alt={`poster of ${movie} movie`}
      />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{released} &bull; {runtime}</p>
        <p>{genre}</p>
        <p><span>🌟</span> 
        {imdbRating} IMDB rating</p>
      </div>
    </header>
          {/* <p>{avgRating}</p> */}
    <section>
      <div className="rating">
     {!isWatched?
     <>
     <StarRating maxStars={10} 
      size={24} 
      onSetRating={setUserRating} 
      />

     {userRating > 0 && ( 
      <button  className="btn-add" 
      onClick={handleAdd}> 
      + Add to list
      </button> 
     )}</> : (
     <p>you rated with movie {watchedUserRating}
     <span>⭐</span>
     </p>
     )}
     
      </div>
      <p>
        <em>{plot}</em>
      </p>
      <p>Starrring {actors}</p>
      <p>Directed by {director}</p>
    </section>
  </>
}
  </div>
  )
 
 }

function WatchedSummery({watched}){
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
 
  return(
<div className="summary">
    <h2>Movies you watched</h2>
    <div>
      <p>
        <span>#️⃣</span>
        <span>{watched.length} movies</span>
      </p>
      <p>
        <span>⭐️</span>
        <span>{avgImdbRating.toFixed(2)}</span>
      </p>
      <p>
        <span>🌟</span>
        <span>{avgUserRating.toFixed(2)}</span>
      </p>
      <p>
        <span>⏳</span>
        <span>{avgRuntime} min</span>
      </p>
    </div>
  </div>

  )
}
function WatchedMoviesList({watched, onDeleteWatched}){
  return(
      <ul className="list">
                {watched.map((movie, i) => (
                <WatchedMovie movie={movie} key={i} onDeleteWatched={onDeleteWatched}/>
                ))}
              </ul>
  )
}

function WatchedMovie({movie, onDeleteWatched}) {
  return (
     <li>
          <img src={movie.poster} alt={`${movie.title} poster`} />
          <h3>{movie.title}</h3>
          <div>
            <p>
              <span>⭐️</span>
              <span>{movie.imdbRating}</span>
            </p>
            <p>
              <span>🌟</span>
              <span>{movie.userRating}</span>
            </p>
            <p>
              <span>⏳</span>
              <span>{movie.runtime} min</span>
            </p>
            <button className="btn-delete" 
            onClick={()=> onDeleteWatched(movie.imdbID)}> 
            X 
          </button>
          </div>
        </li>
  )
}
  
