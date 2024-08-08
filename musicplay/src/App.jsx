import React, { useEffect } from 'react'

import { useState } from 'react'
import './App.css'
import { CiMusicNote1 } from "react-icons/ci";
import { RiGithubFill } from "react-icons/ri";
import { MdOutlineQueueMusic } from "react-icons/md";





function App() {
  const [keyword, setkeyword] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [tracks,setTracks] =  useState([]);

const getTracks = async() =>{
  setisLoading(true)
 let data =  await fetch(`https://v1.nocodeapi.com/ariba/spotify/DqpYndLcVSbbAJER/search?q=${keyword===""?"trending":keyword}&type=track`);
 let convertedData =  await data.json();
 console.log (convertedData.tracks.items);
 setTracks(convertedData.tracks.items); 
 setisLoading(false);
}


  return (
    <>
    
        
        <nav className="navbar navbar-dark navbar-expand-lg " style={{ width: "100%", top:'0', left:'0', position: 'fixed', zIndex: 1,padding: '10px', backgroundColor:"black" }}>  
   

    <div className="container-fluid">
      <a className="navbar-brand" href="/">
      <MdOutlineQueueMusic /> MusicZone
      </a>
      
      <div className="collapse navbar-collapse d-flex justify-contain-center" id="navbarSupportedContent">
       
        
          <input
          value={keyword}
          onChange={(event)=>{setkeyword(event.target.value)}}
            className="form-control me-2 w-75"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button onClick={getTracks} className="btn btn-outline-success" type="submit">
            Search
          </button>
        
      </div>
    </div>
  </nav> 
 
 {/* <--------------------------------------------------------Spinner-------------------------------------------> */}

   <div className='container'>
    <div className={`row ${isLoading?"": "d-none"}`}>
      <div className="col-12 py-5 text-center">
      <div
  className="spinner-border"
  style={{ width: "3rem", height: "3rem", displa: 'grid', placeItems:'center', alignItems:'center', position:'relative' }}
  
  role="status"
>
  <span className="visually-hidden">Loading...</span>
</div>

      </div>
    </div> 

{/* <--------------------------------------------Home-pge-text--------------------------------------------------> */}
<div className="row">
          <div className="col-12 py-20 mt-4 text-center">
            <h1>
            <CiMusicNote1 />
              MusicZone
            </h1>
            <h3 className="py-5">Find your next favorite song in just half a minute</h3>
            <div>
              <a
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-dark"
                href="https://github.com/alianoosha93/Music-app.git"
              >
                <RiGithubFill /> Github
              </a>
            </div>
          </div>
        </div>
     
         <div className ='row'>
           
            {
              tracks.map((elements, index) =>{
                return <div key ={elements.id} className="col-lg-3 col-md-6 py-2">
                

{/* <-----------------------------------------------------Music-card--------------------------------------------------------> */}
     <div className="card" >
  <img src={elements.album.images[1].url} className="card-img-top" alt="..." />
  <div className="card-body">
    <h5 className="card-title">{elements.name}</h5>
    <p className="card-text">
      Artist: {elements.album.artists[0].name}
    </p>
    <p className="card-text">
     Release date: {elements.album.release_date}
    </p>
    <audio src={elements.preview_url}controls className="w-100"></audio>
  </div>
</div>

 </div>
              })
            }

        </div>
      </div> 


     
    </>
  )
}

export default App
