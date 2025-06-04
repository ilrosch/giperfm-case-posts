import React, { useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { addTask } from "../../services/tasksSlice";
import { useAppDispatch } from "../../hooks";
import { Task } from "../../types";

import './style.css';


const Form: React.FC = () => {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const dispatch = useAppDispatch()

  const handleForm = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    if (value.length < 2) {
      setError(true)
      return
    }

    const task: Task = { name: value, status: 'active', id: uuidv4()}
    dispatch(addTask(task))
    
    setValue('')
    setError(false)
  }

  return (
    <form
      className="form"
      onSubmit={handleForm}
      data-testid='add-form'
    >
      <div className="form__field">
        <input
          type="text"
          className="form__input"
          placeholder="Whats needs to be done?"
          data-testid="add-input"
          value={value}
          onChange={({ target }) => setValue(target.value)}
        />
        {error && <p className="form__feedback">Minimum 2 symbols!</p>}
      </div>
      <button
        type="submit"
        className="btn btn_primary"
      >
        Add
      </button>
    </form>
  )
}

export default Form
