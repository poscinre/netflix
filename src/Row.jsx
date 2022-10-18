import React, { useEffect, useState } from 'react'
import axios from './axios';
import './Row.css';
import movieTrailer from 'movie-trailer';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';

Modal.setAppElement(document.getElementById('root'));

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, rowID, isLargeRow}) {
    const [movie, setMovie] = useState([]);
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData(){
          const request = await axios.get(fetchUrl);
          setMovies(request.data.results);
          return request;
        }
        fetchData();
      },[fetchUrl]);

    const opts = {
        playerVars: {
            autoplay: 0,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            movieTrailer(null ,{ tmdbId: movie.id })
            .then((url)=>{
              const urlParams=new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error)=> console.log(error));
        }
    }

    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
    }
  
    function closeModal(history) {
        setIsOpen(false);
        // window.location.reload("/");
        // history.scrollRestoration = "auto";
        // history.entries = [];
        // history.index = -1;
        // history.push(`/`);
    } 

    const slideLeft = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft - 500;
    }

    const slideRight = () => {
        var slider = document.getElementById('slider' + rowID);
        slider.scrollLeft = slider.scrollLeft + 500;
    }



  return (
    <>
        <h2 className='text-white font-bold md-text-xl p-4 text-xl'>{title}</h2>
        <div className='relative flex items-center group'>
            <MdChevronLeft onClick={slideLeft} className='bg-white text-black left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            <div id={'slider' + rowID}
            className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide flex'>
                {movies.map((movie) => (
                    ((isLargeRow && movie.backdrop_path) || 
                    (!isLargeRow && movie.backdrop_path)) && (
                    <img
                        key={movie.id} 
                        onClick={()=> {                            
                            openModal();
                            handleClick(movie);
                        }}
                        className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                          }`} 
                          alt={movie.name} />
                        )        
                 ))}
            </div>
            <MdChevronRight onClick={slideRight} className='bg-white text-black right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <Modal
                    style={{
                        overlay: {
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.75)'
                        },
                        content: {
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: '#000',
                            color: '#fff',
                            justifyContent: 'center',
                        }
                    }}
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    >
                    <button
                    onClick={()=>{
                        closeModal();
                        }}>close</button>
                    <div>
                        {<YouTube videoId={trailerUrl} opts={opts} />}
                    </div>
                </Modal>
        </div>
    </>
  )
}

export default Row;