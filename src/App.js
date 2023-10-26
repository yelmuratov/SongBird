import './App.css';
import Header from './components/header/Header';
import Pagination from './components/pagination/Pagination';
import RandomBird from './components/random-bird/RandomBird';
import Answers from './components/answers/Answers';
import birdsData from './components/birds-data';
import {useState } from 'react';

const getRandomNum = (max, min) => {
  const num = min + Math.random() * (max + 1 - min);
  return Math.floor(num)
}

const randomNo = getRandomNum(-1, 6);
const rand2 = getRandomNum(-1, 6);

function App() {

  const [currentNum, setCurrentNum] = useState(0);
  
  const [isFind, setIsFind] = useState(false)
  const question = birdsData[randomNo];
  const answer = question[rand2];
  const [description, setDescription] = useState([]);
  const [click, setClick] = useState(false);

  const addClass = (item, text,id) => {
    if (text == answer.name) {
      item.classList.add('correct');
      setIsFind(true);
    } else if(!isFind){
      item.classList.add('wrong');
    }

    setClick(true);
    setDescription(question.filter(item => item.id===id))
  }

  return (
    <div className='App'>
      <div className='content'>
        <Header />
        <Pagination currentNum={currentNum} />
        <RandomBird answer={answer} isFind={isFind} />
        <Answers
          isFind={isFind}
          question={question}
          addClass={addClass}
          click={click}
          description={description}
          answer={answer}
          setCurrentNum={setCurrentNum}
          setIsFind={setIsFind}
        />
      </div>
    </div>
  )
}

export default App;
