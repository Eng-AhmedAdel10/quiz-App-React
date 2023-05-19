import React from 'react'
import Loading from './Loading'
import SetupForm from './SetupForm'
import Modal from './Modal'
import { useGlopalContext } from './context'

function App() {
  const {
    waiting,
    loading,
    questions,
    index,
    correct,
    checkAnswer,
    nextQuestion,
  } = useGlopalContext()

  if (waiting) {
    return <SetupForm />
  }
  if (loading) {
    return <Loading />
  }

  const { question, correct_answer, incorrect_answers } = questions[index]
  const answers = [...incorrect_answers]
  const tempIndex = Math.floor(Math.random() * 4)
  if (tempIndex === 3) {
    answers.push(correct_answer)
  } else {
    answers.push(answers[tempIndex])
    answers[tempIndex] = correct_answer
  }
  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct_answer : {correct}/{index}
        </p>
        <article className='container'>
          <h2>{question}</h2>
          <div className='btn-container'>
            {answers.map((item, index) => {
              return (
                <button
                  key={index}
                  className='answer-btn'
                  onClick={() => checkAnswer(item === correct_answer)}
                >
                  {item}
                </button>
              )
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  )
}

export default App
