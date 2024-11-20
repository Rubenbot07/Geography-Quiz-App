import { useEffect, useState } from 'react'
import './css/app.css'
function App() {
  const [data, setData] = useState([])
  const [question, setQuestion] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [options, setOptions] = useState([])
  const [correctAnswer, setCorrectAnswer] = useState('')
  const [itemSelected, setItemSelected] = useState('')
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
  setTimeout(() => {    
    if(currentQuestion < 9) {
      setCurrentQuestion(currentQuestion + 1)
      setItemSelected('')
    } else {
      console.log('finished')
    }
  }, 2000)
}

console.log(data)
  return (
    <>
      <main className='main-container'>
        <h1>Geography Quiz App</h1>
        <ul className='question-list-container'>
          {data.map((question, index) => (
            <li className={currentQuestion === index ? 'active' : ''} key={question.id}>{index + 1}</li>
          ))}
        </ul>
        <p>{question.question}</p>
        <ul className="options-container">
          {options.map((option, index) => (
            <li className={option === correctAnswer ? 'correct' : ''} onClick={() => handleAnswer(index)} key={index}>{`${option} ${option === correctAnswer ? '✔️' : itemSelected === index ? '❌' : ''}`}</li>
          ))}
        </ul>
      </main>
    </>
  )
}

export default App
