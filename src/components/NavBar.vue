<script setup>
import { useAuthStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'

const userStore = useAuthStore()
const router = useRouter()

const logOut = async () => {
  await userStore.signOut()
  router.push('/' )
};

</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/loggedin">Dashboard</RouterLink>
        <button @click="logOut"> Logout </button>
      </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: center;
}
a {
  font-size: 2rem;
}
</style>