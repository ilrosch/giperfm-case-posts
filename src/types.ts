export type TaskStatus = 'active' | 'completed'

export interface Task {
  id: string
  name: string
  status: TaskStatus
}

export type FilterType = 'all' | 'active' | 'completed'
