import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
 import './index.css';
 import App from './App';

import StarRating from './starRating';

function Test(){
  const[movierate, setMovieRate] = useState(0)
return(
  <div>
    <StarRating 
    color="red" 
    maxStars={5} 
    size={15}
     onSetRating={setMovieRate}/>
    <p>This Movie was rated {movierate} stars</p>
  </div>
)
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* { <App /> } */}
    {/* <StarRating maxStars={7} size={28} defaultRating={3} /> */}
    <App/>
    {/* <Test/> */}
  </React.StrictMode>
);

