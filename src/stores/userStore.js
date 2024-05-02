import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createAccount, login, logout, seeCurrentUser } from '@/api/userApi';

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null);
  const loading = ref(false);
  const errorAuth = ref(null);

  async function signUp(email, password, firstName, lastName) {
    try {
      loading.value = true;
      const userData = await createAccount(email, password, firstName, lastName);
      currentUser.value = userData.user;
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
      const userData = await login(email, password);
      currentUser.value = userData.user
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
      await logout();
      currentUser.value = null;
    } catch (error) {
      errorAuth.value = error.message;
      console.log(error);
    } finally {
      loading.value = false;
    }
  }

  async function seeCurrentUserStore() {
    try {
      loading.value = true
      const userData = await seeCurrentUser();
      currentUser.value = userData.user
      //return currentUser.value
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
    seeCurrentUserStore
  }
})