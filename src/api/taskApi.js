import { supabase } from '@/api/supabase'

export const retrieveAllTasks = async () => {
  const { data, error } = await supabase.from('tasks').select()

  if (error) {
    console.log('Is this the error  ---->', error)
    throw error
  }

  console.log(data)
  return data
}

export const createTask = async (userID, taskName) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert({
      user_id: userID,
      title: taskName
    })
    .select()

  if (error) {
    console.log('Is this the error  ---->', error)
    throw error
  }

  console.log('Task added correctly')
  return data[0]
}

export const updateParticularTask = async (taskName, taskComplete, taskID) => {
  const updateObject = {}
  if (taskName !== undefined) {
    updateObject.title = taskName
  }
  if (taskComplete !== undefined) {
    updateObject.is_complete = taskComplete
  }

  const { error } = await supabase.from('tasks').update(updateObject).eq('id', taskID)

  if (error) {
    console.log('Is this the error ----> ', error)
    throw error
  }

  console.log('Task updated correctly')
}

export const eraseTask = async (taskID) => {
  const { error } = await supabase.from('tasks').delete().eq('id', taskID)

  if (error) {
    console.log('Is this the error  ---->', error)
    throw error
  }

  console.log('Task deleted correctly')
}
