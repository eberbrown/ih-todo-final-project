import { ref } from 'vue'
import { defineStore } from 'pinia'
import { retrieveAllTasks, createTask, updateParticularTask, eraseTask, updateParticularTaskTry } from '@/api/taskApi'

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([])
  const loadingTasks = ref(false)
  const errorTask = ref(null)

  const fetchAllTasks = async () => {
    try {
      loadingTasks.value = true
      const allData = await retrieveAllTasks()
      tasks.value = allData
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
      const newTask = await createTask(userID, taskName)
      tasks.value.push(newTask)
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
      await updateParticularTask(taskName, undefined, taskID)
      for (const task of tasks.value) {
        if (task.id === taskID) {
          task.title = taskName
        }
      }
    } catch (error) {
      console.log(error)
      errorTask.value = error.message
    } finally {
      loadingTasks.value = false
    }
  }

  async function updateStatus(taskStatus, updateColumn, taskID) {
    try {
      loadingTasks.value = true
      
      await updateParticularTaskTry(taskStatus, updateColumn, taskID)
      for (const task of tasks.value) {
        if (task.id === taskID) {
          task.status = taskStatus
        }
      }
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
      await eraseTask(taskID)
      tasks.value = tasks.value.filter((item) => item.id !== taskID)
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
    updateStatus,
    deleteTask
  }
})
