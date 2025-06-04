import { createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'

import { Task } from '../types'
import { RootState } from './store'


const tasksAdapter = createEntityAdapter<Task>()

const taskSlice = createSlice({
  name: 'tasks',
  initialState: tasksAdapter.getInitialState(),
  reducers: {
    addTask: tasksAdapter.addOne,
    rmTask: tasksAdapter.removeOne,
    rmTasks: tasksAdapter.removeAll,
    updateTask: tasksAdapter.updateOne,
    rmCompletedTasks: (state) => {
      const completedIds = state.ids.filter(
        (id) => state.entities[id]?.status === 'completed'
      )

      return tasksAdapter.removeMany(state, completedIds)
    },
    setAllCompletedTasks: (state) => {
      const updates = state.ids.map(id => ({
        id, changes: { status: 'completed' as const }
      }))
      
      return tasksAdapter.updateMany(state, updates)
    },
  }
})

export const {
  addTask,
  rmTask,
  rmTasks,
  rmCompletedTasks,
  updateTask, 
  setAllCompletedTasks 
} = taskSlice.actions

export default taskSlice.reducer


//
// Selectors Tasks
//

export const tasksSelectors = tasksAdapter.getSelectors((state: RootState) => state.tasks)

export const selectAllTasks = tasksSelectors.selectAll

export const selectActiveTasks = createSelector(
  [selectAllTasks], (tasks) => tasks.filter(({ status }) => status === 'active')
)

export const selectCompletedTasks = createSelector(
  [selectAllTasks], (tasks) => tasks.filter(({ status }) => status === 'completed')
)
