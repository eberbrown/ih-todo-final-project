import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/api/supabase'
/* import { createTask } from '@/api/taskApi' */

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const loadingTasks = ref(false)
  const errorTask = ref(null)

  const fetchAllTasks = async () => {
    try {
      loadingTasks.value = true
      const { data, error } = await supabase.from('tasks').select()
      if (error) throw error
      tasks.value = data
      console.log(tasks.value)
      return tasks.value
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  async function insertTask(userID, taskName) {
    try {
      loadingTasks.value = true
      /* const newTask = await createTask(userID, taskName) */
      const { data, error } = await supabase
        .from('tasks')
        .insert({ user_id: userID, title: taskName })
        .select()
      if (error) {
        console.log('Is this te error  ---->', error)
        throw error
      }
      console.log('Task added correctly')
      tasks.value.push(data[0])
      /* tasks.value.push(newTask) */
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  async function updateTask(taskName, taskID) {
    try {
      loadingTasks.value = true
      const { error } = await supabase
        .from('tasks')
        .update({
          title: taskName
        })
        .eq('id', taskID)
      if (error) throw error
      console.log('Task updated correctly')
      for (const task of tasks.value) {
        if (task.id === taskID) {
          task.title = taskName
        }
      }
      /* return tasks.value */
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  async function updateComplete(taskComplete, taskID) {
    try {
      loadingTasks.value = true
      const { error } = await supabase
        .from('tasks')
        .update({
          is_complete: taskComplete
        })
        .eq('id', taskID)
      if (error) throw error
      console.log('Task updated correctly')
      for (const task of tasks.value) {
        if (task.id === taskID) {
          task.is_complete = taskComplete
        }
      }
      /* return tasks.value */
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  async function deleteTask(taskID) {
    try {
      loadingTasks.value = true
      const { error } = await supabase.from('tasks').delete().eq('id', taskID)
      console.log('Task deleted correctly!')
      if (error) throw error
      tasks.value = tasks.value.filter((item) => item.id !== taskID)
      /* return tasks.value */
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  return {
    tasks,
    fetchAllTasks,
    insertTask,
    updateTask,
    updateComplete,
    deleteTask
  }
})
