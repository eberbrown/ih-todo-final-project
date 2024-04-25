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
  width: 100%;
  padding: 5px 10px;
}

a {
  font-size: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>