<script setup>
import { useAuthStore } from '@/stores/userStore';
const { signOut } = useAuthStore();
/* import { useTaskStore } from "@/stores/taskStore.js"; */
/* const { tasks, fetchAllTasks, insertTask, updateTask, updateComplete, deleteTask } = useTaskStore(); */
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signin">Sign In</RouterLink>
        <RouterLink to="/loggedin">Dashboard</RouterLink>
        <button @click="signOut"> Logout </button>
      </nav>
</template>

<style scoped>
a {
  font-size: 2rem;
}
</style>