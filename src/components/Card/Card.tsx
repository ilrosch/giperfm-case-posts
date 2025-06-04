import React, { useState } from "react"

import { useAppDispatch, useAppSelector } from "../../hooks"
import {
  rmCompletedTasks,
  rmTasks,
  selectActiveTasks,
  setAllCompletedTasks
} from "../../services/tasksSlice"
import { FilterType } from "../../types"

import Form from "../Form/Form"
import Tasks from "../Tasks/Tasks"

import './style.css'


const Card: React.FC = () => {
  const [filterType, setFilterType] = useState<FilterType>('all')
  const dispatch = useAppDispatch();

  return (
    <div className='card'>
      <div className='card__header'>
        <div className='card__form'>
          <Form />
        </div>
        <div className="card__sorted">
          {(['all',  'active', 'completed'] as const).map((btnType: FilterType) => {
            const classNames = btnType === filterType
              ? "btn btn_small btn_primary"
              : "btn btn_small btn_sorted"

            return (
              <button
                key={btnType}
                className={classNames}
                onClick={() => setFilterType(btnType)}
                >
                  {btnType}
              </button>
            )
          })}
          
        </div>
      </div>

      <div className="card__body">
        <Tasks filterType={filterType} />
      </div>

      <div className="card__footer">
        <div className="card__total" data-testid='items-left'>
          {useAppSelector(selectActiveTasks).length} items left
        </div>
        <div className="card__actions">
          <button
            className="btn btn_small btn_primary"
            onClick={() => dispatch(setAllCompletedTasks())}
          >
            Check all
          </button>
          <button
            className="btn btn_small btn_warning"
            onClick={() => dispatch(rmCompletedTasks())}
          >
            Clear completed
          </button>
          <button
            className="btn btn_small btn_danger"
            onClick={() => dispatch(rmTasks())}
          >
            Clear all
          </button>
        </div>
      </div>
    </div>
  )
}
  
export default Card
