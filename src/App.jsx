import { useEffect, useState } from 'react'
import './css/app.css'
import CheckIcon from './assets/icons/CheckIcon.jsx'
import IncorrectIcon from './assets/icons/IncorrectIcon.jsx'
import Congrats from './assets/icons/Congrats.jsx'
import confetti from 'canvas-confetti'
function App() {
  const [data, setData] = useState([])
  const [question, setQuestion] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [itemSelected, setItemSelected] = useState('')
  const [counter, setCounter] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const getQuestions = async () => {
    try {
        const response = await fetch('https://the-trivia-api.com/api/questions?categories=geography&limit=10&difficulty=easy');
        const data = await response.json();
        setData(data);
    } catch (error) {
        console.error(error);
    }
  };

  useEffect(() => {
      getQuestions();
  }, []);


  useEffect(() => {
    if (data.length > 0) {
      setQuestion(data[currentQuestion])
      const allOptions = shuffleArray([...data[currentQuestion].incorrectAnswers, data[currentQuestion].correctAnswer])
      setOptions(allOptions)
    }
  }, [data,currentQuestion])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    //Fisher-Yates algorithm or Knuth shuffle
  };

  const handleAnswer = (index) => {
    setItemSelected(index)
    setCorrectAnswer(data[currentQuestion].correctAnswer)
    if(data[currentQuestion].correctAnswer === options[index]) {
      setCounter(prev => {
        const updatedCounter = prev + 1;
        return updatedCounter;
      })
    }
    setTimeout(() => {    
      if(currentQuestion < 9) {
        setCurrentQuestion(currentQuestion + 1)
        setItemSelected('')
      } else {
        console.log(`${counter}/10`)
        setOpenModal(true)
        confetti()
      }
    }, 1500)
  }
  
  const playAgain = () => {
    getQuestions()
    setItemSelected('')
    setCorrectAnswer('')
    setCurrentQuestion(0)
    setOpenModal(false)
    setCounter(0) 
  }

  return (
    <>
    {
      !openModal
      ? (
        <main className='main-container'>
        <h1>Geography Quiz App</h1>
        <section className='game-container'>
          <ul className='question-list-container'>
            {data.map((question, index) => (
              <li className={currentQuestion === index ? 'active' : ''} key={question.id}>{index + 1}</li>
            ))}
          </ul>
          <p className='question'>{question.question}</p>
          <ul className="options-container">
            {options.map((option, index) => (
              <li className='option-item' 
              onClick={() => handleAnswer(index)} 
              key={index}>
                {`${option}`}

                {option === correctAnswer 
                  ? (<CheckIcon />
                  ) : itemSelected === index
                    ? (<IncorrectIcon />
                    ) : ''
                }
              </li>
            ))}
          </ul>
        </section>
      </main>
      )
      : (
          <div className='modal-container'>
              <div className='congrats-container'>
                <Congrats />
              </div>
              <p>Congrats! You completed <br /> the quiz.</p>
              <span className='counter-container'>You answered {counter}/10</span>
              <button onClick={playAgain}>Play again</button>
          </div>  
      )
    }
    </>
  )
}

export default App
