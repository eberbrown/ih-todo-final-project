/* import { supabase } from '@/api/supabase'

export const fetchAllTasks = async (userID) => {
  const { data, error } = await supabase.from('tasks').select().eq('user_id', userID)
  if (error) {
    console.log("Is this te error  ---->", error)
  } else {
    console.log(data)
    return data
  }
};

export const insertTask = async (userID, taskName) => {
  const { error } = await supabase.from('tasks').insert({ user_id: userID, title: taskName })
  if (error) {
    console.log("Is this te error  ---->", error)
  } else {
    console.log("Task added correctly")
  }
};
 */