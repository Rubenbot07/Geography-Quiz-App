import { useEffect, useReducer } from 'react'
import confetti from 'canvas-confetti'
import { UseApi } from './useApi'

export const useQuiz = () => {
  const initialState = {
    data: [],
    question: '',
    correctAnswer: '',
    itemSelected: null,
    currentQuestion: 0,
    counter: 0,
    options: [],
    openModal: false,
    level: null
  }
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const {
    data,
    question,
    correctAnswer,
    itemSelected,
    currentQuestion,
    counter,
    options,
    openModal,
    level
  } = state
  
  const actionTypes = {
    getData: 'GET_DATA',
    setQuestion: 'SET_QUESTION',
    setCorrectAnswer: 'SET_CORRECT_ANSWER',
    setCurrentQuestion: 'SET_CURRENT_QUESTION',
    setCounter: 'SET_COUNTER',
    setOptions: 'SET_OPTIONS',
    setOpenModal: 'SET_OPEN_MODAL',
    playAgain: 'PLAY_AGAIN'
  }

  function reducer (state, action) {
    switch (action.type) {
      case 'GET_DATA':
        return { ...state, data: action.payload.data, level: action.payload.level }
      case 'SET_QUESTION':
        return { ...state, question: action.payload}
      case 'SET_OPTIONS':
        return { ...state, options: action.payload }
      case 'SET_CORRECT_ANSWER':
        return { ...state, correctAnswer: action.payload.correctAnswer, itemSelected: action.payload.itemSelected }
      case 'SET_CURRENT_QUESTION':
        return { ...state, currentQuestion: action.payload.currentQuestion, itemSelected: action.payload.itemSelected }
      case 'SET_COUNTER':
        return { ...state, counter: action.payload }
      case 'SET_OPEN_MODAL':
        return { ...state, openModal: action.payload }
      case 'PLAY_AGAIN':
        return initialState
      default:
        return state
    }
  }

  const getQuestions = async (level) => {
    const data = await UseApi(level)
    dispatch({type: actionTypes.getData, payload: {data: data, level: level}}); 
}
    

  useEffect(() => {
    if (data.length > 0) {
      dispatch({type: actionTypes.setQuestion, payload: data[currentQuestion]})
      const allOptions = shuffleArray([...state.data[currentQuestion].incorrectAnswers, data[currentQuestion].correctAnswer])
      dispatch({type: actionTypes.setOptions, payload: allOptions})
    }
  }, [data, currentQuestion])

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
    //Fisher-Yates algorithm or Knuth shuffle
  };

  const handleAnswer = (index) => {
    dispatch({type: actionTypes.setCorrectAnswer, payload: {correctAnswer: data[currentQuestion].correctAnswer, itemSelected: index}})
    if(data[currentQuestion].correctAnswer === options[index]) {
      dispatch({type: actionTypes.setCounter, payload: counter + 1})
    }
    setTimeout(() => {    
      if(currentQuestion < 9) {
        dispatch({type: actionTypes.setCurrentQuestion, payload: {currentQuestion: currentQuestion + 1, itemSelected: ''}})
      } else {
        dispatch({type: actionTypes.setOpenModal, payload: true})
        confetti()
      }
    }, 1500)
  }
  
  const playAgain =  () => {
    dispatch({type: actionTypes.playAgain})
  }
  
  return {
    data,
    question,
    correctAnswer,
    itemSelected,
    currentQuestion,
    counter,
    options,
    openModal,
    level,
    handleAnswer,
    playAgain,
    getQuestions
  }
}