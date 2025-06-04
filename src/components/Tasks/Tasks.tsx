import { useAppDispatch, useAppSelector } from "../../hooks"
import { FilterType, TaskStatus } from "../../types"
import {
  rmTask,
  selectActiveTasks,
  selectAllTasks,
  selectCompletedTasks,
  updateTask
} from "../../services/tasksSlice"

import './style.css'


interface tasksFilter {
  filterType: FilterType
}

const getSelector = (key: FilterType) => {
  const mapping = {
    all: selectAllTasks,
    active: selectActiveTasks,
    completed: selectCompletedTasks
  }

  return mapping[key]
}

const Tasks: React.FC<tasksFilter> = ({ filterType }) => {
  const tasks = useAppSelector(getSelector(filterType))
  const dispatch = useAppDispatch()

  const handleChangeStatus = (id: string, curStatus: TaskStatus): void => {
    const status = curStatus === 'active' ? 'completed' : 'active'
    dispatch(updateTask({ id, changes: { status }}))
  }

  const handleRemove = (id: string): void => {
    dispatch(rmTask(id))
  }

  if (tasks.length === 0) {
    return <div className='msg'>Tasks not found</div>
  }

  return (
    <ul className="tasks">
      { tasks.map(({ id, name, status }) => (
        <li key={id} className="task">
          <input
            id={id}
            type="checkbox"
            className="task__check"
            onChange={() => handleChangeStatus(id, status)}
            checked={status === 'completed'}
          />
          <label
            htmlFor={id}
            className={
              status === 'completed'
                ? 'task__name task__name_completed'
                : 'task__name'
            }
          >
            {name}
          </label>
          <div className="task__action">
            <button
              className="btn btn_small btn_danger"
              onClick={() => handleRemove(id)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Tasks