import {useRef, useState } from 'react'

import './RandomBird.css'
const RandomBird = ({ answer, isFind }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [timeRemaining, setTimeRemaining] = useState();
  
  const audioRef = useRef();

  const playIconRef = useRef();

  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      let minutes = Math.floor(audio.duration / 60);
      minutes = minutes < 10 ? '0' + minutes : minutes;
      let seconds = Math.floor(audio.duration % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds;
      setTimeRemaining(minutes + ':' + seconds);
    }
  }

  const playSound = () => {
    const playBtn = playIconRef.current;
    const audio = audioRef.current;
    setIsPlaying(prev => !prev);
    if (isPlaying) {
      audio.play();
      playBtn.classList.remove('fa-play');
      playBtn.classList.add('fa-pause')
    } else {
      audio.pause()
      playBtn.classList.remove('fa-pause')
      playBtn.classList.add('fa-play')
    }
  }

  const onProgess = () => {
    const audio = audioRef.current; 
    setTime(Math.floor((audio.currentTime * 100) / audio.duration));
    let minutes = Math.floor(audio.currentTime / 60);
    minutes = minutes < 10 ? '0' + minutes % 60 : minutes;
    let seconds = Math.floor(audio.currentTime % 60);
    seconds = seconds >= 10 ? seconds : '0' + seconds % 60;
    setCurrentTime(minutes + ':' + seconds);
  }


  return (
    <section id='main-section'>
      <div className='bird-card'>
        <img src={isFind ? answer.image : 'images/bird.jpg'} alt='bird' />
        <ul className='list-group'>
          <li className='list-group-item'>
            <h1>{isFind ? answer.name : '******'}</h1>
          </li>
          <li className='list-group-item'>
            <div className='audio-player'>
              <audio
                ref={audioRef}
                onTimeUpdate={onProgess}
                onLoadedMetadata={onLoadedMetadata}
              >
                <source src={answer.audio} />
              </audio>
              <div className='controls'>
                <div className='play-btn' onClick={playSound}>
                  <i className='fa-solid fa-play' ref={playIconRef}></i>
                </div>
                <div className='progress-bar'>
                  <input
                    type='range'
                    value={time}
                    className='time-bar'
                    onChange={() => ''}
                  />
                  <div className='sound-information'>
                    <p className='current-time'>{currentTime}</p>
                    <p className='duration'>{timeRemaining}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  )
}

export default RandomBird