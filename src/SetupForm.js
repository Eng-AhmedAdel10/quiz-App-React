import React from 'react'
import { useGlopalContext } from './context'

const SetupForm = () => {
  const { quiz, handleChange, handleSubmit, error } = useGlopalContext()
  return (
    <section className='quiz quiz-small'>
      <h2>Setup Quiz</h2>
      <form className='setup-form'>
        <div className='form-control'>
          <label htmlFor='amount'>Number Of Questions</label>
          <input
            className='form-input'
            type='number'
            id='amount'
            name='amount'
            value={quiz.amount}
            onChange={handleChange}
            min='1'
            max='50'
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>Category</label>
          <select
            name='category'
            id='category'
            onChange={handleChange}
            value={quiz.category}
            className='form-input'
          >
            <option value='sports'>sports</option>
            <option value='history'>history</option>
            <option value='politics'>politics</option>
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='difficulty'>Select Difficulty</label>
          <select
            name='difficulty'
            id='difficulty'
            onChange={handleChange}
            value={quiz.difficulty}
            className='form-input'
          >
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {error && (
          <p className='error'>
            can't generate questions, please try different options
          </p>
        )}
        <button onClick={handleSubmit} className='submit-btn'>
          Start
        </button>
      </form>
    </section>
  )
}

export default SetupForm
