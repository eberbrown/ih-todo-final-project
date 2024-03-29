import { ref } from 'vue'
import { defineStore } from 'pinia'
/* import { seeCurrentUser } from '@/api/userApi'; */
import { supabase } from '@/api/supabase'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null);
  const loading = ref(false);
  const errorAuth = ref(null);

  async function signUp(email, password, firstName) {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            first_name: firstName
          }
        }
      });
      currentUser.value = data.user;
      console.log(currentUser.value);
      if (error) throw error;
    } catch (error) {
      errorAuth.value = error.message;
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function signIn(email, password) {
    try {
      loading.value = true;
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      currentUser.value = data.user;
      console.log(currentUser.value);
      if (error) throw error;
    } catch (error) {
      errorAuth.value = error.message;
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function signOut() {
    try {
      loading.value = true
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      currentUser.value = null;
      alert('Signed out yes yes');
    } catch (error) {
      errorAuth.value = error.message;
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function seeCurrentUser() {
    try {
      loading.value = true
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error;
      currentUser.value = data.session.user;
      console.log(currentUser.value);
      return currentUser.value
    } catch (error) {
      errorAuth.value = error.message;
      console.log("This is an error on the seeCurrentUser function of userStore: ", error);
    } 
  }
  

  return {
    currentUser,
    loading,
    signUp,
    signIn,
    signOut,
    seeCurrentUser
  }
})

/* export const useUserStore = defineStore('user', () => {
  const user = ref(null);
  const currentUser = computed(async () => {
    return (user.value = await seeCurrentUser())
  })

  return {
    user,
    currentUser
  }
}) */
