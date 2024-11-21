import './css/app.css'
import CheckIcon from './assets/icons/CheckIcon.jsx'
import IncorrectIcon from './assets/icons/IncorrectIcon.jsx'
import Congrats from './assets/icons/Congrats.jsx'
import { useQuiz } from './utils/useQuiz.jsx'
function App() {
  const {
    data,
    question,
    correctAnswer,
    itemSelected,
    currentQuestion,
    counter,
    options,
    openModal,
    handleAnswer,
    playAgain
  } = useQuiz()

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