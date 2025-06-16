import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './services/store'
import { useEffect } from 'react'
import { selectAllTasks, setAllTasks } from './services/tasksSlice'


export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const useLoadTasks = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    const data = localStorage.getItem('tasks') || '[]'
    if (data) dispatch(setAllTasks(JSON.parse(data)))
  }, [dispatch])
}

export const useSyncTasksLocalStore = () => {
  const tasks = useAppSelector(selectAllTasks);
  const status = useAppSelector((state) => state.tasks.status)

  useEffect(() => {
    if (status === 'success') {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks, status])
}
