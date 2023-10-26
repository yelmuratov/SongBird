import './Answers.css'
import { useState,useRef} from 'react';

const Answers = ({
  isFind,
  question,
  addClass,
  click,
  description,
  setCurrentNum,
  setIsFind,
}) => {
  const currentBird = description[0]

  const [percent, setPercent] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState('00:00')
  const [timeRemaining, setTimeRemaining] = useState()
  const audioRef = useRef()
  const playBtn = useRef()

  const onLoadedMetadata = () => {
    const audio = audioRef.current
    if (audio) {
      let minutes = Math.floor(audio.duration / 60)
      minutes = minutes < 10 ? '0' + minutes : minutes
      let seconds = Math.floor(audio.duration % 60)
      seconds = seconds < 10 ? '0' + seconds : seconds
      setTimeRemaining(minutes + ':' + seconds)
    }
  }

  const onPlayToggle = () => {
    setIsPlaying((prev) => !prev)
    if (isPlaying) {
      playBtn.current.classList.remove('fa-play')
      playBtn.current.classList.add('fa-pause')
      audioRef.current.play()
    } else {
      playBtn.current.classList.add('fa-play')
      playBtn.current.classList.remove('fa-pause')
      audioRef.current.pause()
    }
  }

  const timeControl = () => {
    const audio = audioRef.current
    setPercent((audio.currentTime * 100) / audio.duration)
    let minutes = Math.floor(audio.currentTime / 60)
    minutes = minutes < 10 ? '0' + (minutes % 60) : minutes
    let seconds = Math.floor(audio.currentTime % 60)
    seconds = seconds >= 10 ? seconds : '0' + (seconds % 60)
    setCurrentTime(minutes + ':' + seconds)
  }

  return (
    <div className='answers'>
      <div className='grid-container'>
        <ul className='options'>
          {question.map((option) => (
            <li
              key={option.name}
              onClick={(e) =>
                addClass(e.target, e.target.textContent, option.id)
              }
            >
              {option.name}
            </li>
          ))}
        </ul>
        <div className='bird-description'>
          <div className='instruction'>
            {click ? (
              <div className='descr'>
                <div className='descr-item'>
                  <img src={currentBird.image} alt={currentBird.name} />
                  <div className='decr-list-item'>
                    <h3>{currentBird.name}</h3>
                    <p className='species'>{currentBird.species}</p>
                    <div className='audio-player'>
                      <audio
                        ref={audioRef}
                        src={currentBird.audio}
                        onLoadedMetadata={onLoadedMetadata}
                        onTimeUpdate={timeControl}
                      ></audio>
                      <div className='controls'>
                        <div className='play-btn' onClick={onPlayToggle}>
                          <i ref={playBtn} className='fas fa-play'></i>
                        </div>
                        <div className='time-bar'>
                          <div
                            className='circle'
                            style={{ left: percent + '%' }}
                          ></div>
                          <div className='sound-information'>
                            <p className='current-time'>{currentTime}</p>
                            <p className='duration'>{timeRemaining}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='descr-item bird-descr'>
                  {currentBird.description}
                </div>
              </div>
            ) : (
              <>
                <span>Послушайте плеер.</span>
                <span>Выберите птицу из списка</span>
              </>
            )}
          </div>
        </div>
      </div>
      <button
        className='next-btn'
        disabled={!isFind}
        onClick={() => {
          setCurrentNum((prev) => prev === 5?0:prev+1)
          setIsFind(false);
        }}
      >
        Next level
      </button>
    </div>
  )
}

export default Answers
