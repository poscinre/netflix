import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import requests from './requests';
import instance from './axios';
import YouTube from 'react-youtube';
import Modal from 'react-modal';
import movieTrailer from 'movie-trailer';

Modal.setAppElement(document.getElementById('root'));

const Main = ({ fetchUrl, isLargeRow }) => {
    const [movie, setMovie] = useState([]);
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(requests.fetchPopular)
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length)
                ]
            );
            return request;
        }
        fetchData();
    },[]);


    useEffect(()=>{
        async function fetchData(){
            const request = await instance.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    },[fetchUrl]);

    function truncate(str, n){
        return str?.length > n ? str.substr(0, n-1) + "..." : str;
    }

    const handleClick = (movie) => {
        if (trailerUrl) {
            trailerUrl('');
        } else {
            movieTrailer(null ,{ tmdbId: movie.id })
            .then((url)=>{
              const urlParams=new URLSearchParams(new URL(url).search);
              setTrailerUrl(urlParams.get("v"));
            })
            .catch((error)=> console.log(error));
        }
    }

    const opts = {
        playerVars: {
            autoplay: 0,
        },
    };

    const [modalIsOpen, setIsOpen] = React.useState(false);
  
    function openModal() {
      setIsOpen(true);
      handleClick(movie);
    }

    function closeModal(history) {
        setIsOpen(false);
    }

  return (
    
    <div className='w-full h-[550px] text-white'>
        <div className='w-full h-full'>
            <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />       
            <div className='absolute w-full top-[20%] p-4 md:p-8'>
                <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title || movie?.name || movie?.original_name}</h1>
                <div className='my-4'>
                    <button onClick={()=>{
                        openModal();
                    }} className='border bg-gray-300 text-black border-gray-300 py-2 px-5 opacity-50 hover:opacity-100'>재생</button>
                </div>
                <p className='text-gray-400 text-sm'>개봉일 : {movie?.release_date}</p>
                <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>{truncate(movie?.overview, 150)}</p>
            </div>
        </div>
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
                    {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
                </div>
            </Modal>
    </div>
  );
}

export default Main;