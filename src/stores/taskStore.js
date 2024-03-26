import { ref } from 'vue';
import { defineStore } from 'pinia';
import { supabase } from '@/api/supabase';

export const useTaskStore = defineStore('task', () => {
  const tasks = ref([]);
  const loadingTasks = ref(false);
  const errorTask = ref(null);

  const fetchAllTasks = async (userID) => {
    try {
      loadingTasks.value = true;
      const { data, error } = await supabase.from('tasks').select().eq('user_id', userID);
      tasks.value = data;
      console.log(data);
      if (error) throw error;
      return tasks.value
    } catch (error) {
      console.log(error);
      errorTask.value = error.message;
    } finally {
      loadingTasks.value = false;
    }
  };

  async function insertTask(userID, taskName) {
    try {
      loadingTasks.value = true;
      const { error } = await supabase.from('tasks').insert({ 
        user_id: userID, 
        title: taskName 
      });
      console.log("Task added correctly");
      if (error) throw error;
    } catch (error) {
      console.log(error);
      errorTask.value = error.message;
    } finally {
      loadingTasks.value = false;
    }
  }

  return {
    tasks,
    fetchAllTasks,
    insertTask,
    /* async currentTasks(userID) {
      return await fetchAllTasks(userID)
    } */
  }
});
