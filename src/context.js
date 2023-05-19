import React, { useState, useContext } from 'react'
const AppContext = React.createContext()

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDBOINT = 'https://opentdb.com/api.php?'

const AppProvider = ({ children }) => {
  const [waiting, setWaiting] = useState(true)
  const [loading, setLoading] = useState(false)
  const [questions, setQuestions] = useState([])
  const [index, setIndex] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [error, setError] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  })

  const handleChange = (e) => {
    setQuiz({
      ...quiz,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const { amount, category, difficulty } = quiz
    const url = `${API_ENDBOINT}amount=${amount}&category=${table[category]}&difficulty=${difficulty}&type=multiple`
    fetchQuiz(url)
  }

  const fetchQuiz = async (url) => {
    setWaiting(false)
    setLoading(true)
    try {
      const res = await fetch(url)
      const data = await res.json()
      if (data.results.length > 0) {
        setQuestions(data.results)
        setLoading(false)
        setError(false)
        setWaiting(false)
      } else {
        setWaiting(true)
        setError(true)
      }
    } catch (error) {
      setWaiting(true)
      console.log(error)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1
      if (index > questions.length - 1) {
        setIsModalOpen(true)
        return 0
      } else {
        return index
      }
    })
  }

  const closeModal = () => {
    setCorrect(0)
    setWaiting(true)
    setIsModalOpen(false)
  }

  const checkAnswer = (res) => {
    if (res) {
      setCorrect((oldCorrect) => oldCorrect + 1)
    }
    nextQuestion()
  }

  return (
    <AppContext.Provider
      value={{
        waiting,
        loading,
        questions,
        index,
        correct,
        quiz,
        error,
        isModalOpen,
        handleChange,
        handleSubmit,
        checkAnswer,
        nextQuestion,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlopalContext = () => {
  return useContext(AppContext)
}

export default AppProvider
