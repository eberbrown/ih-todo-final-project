<script setup>
import { useAuthStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'
import { ref } from 'vue';

const userStore = useAuthStore()
const router = useRouter()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const closeMenu = () => {
  isMenuOpen.value = false;
}

router.afterEach(() => {
  closeMenu();
})

const logOut = async () => {
  await userStore.signOut()
  router.push('/')
};

</script>

<template>
  <nav>
    <div class="navbar">
      <div class="container nav-container">
        <div class="navbar-fixed-container">
          <button @click="toggleMenu" :class="{ 'menu-toggle': true, 'active': isMenuOpen }">
            <span class="line line1"></span>
            <span class="line line2"></span>
            <span class="line line3"></span>
          </button>
          <div class="logo">
            <button @click="logOut"> Logout </button>
          </div>
        </div>
        <transition name="slide">
          <div class="menu-items" v-show="isMenuOpen">
            <li>
              <RouterLink to="/">Home</RouterLink>
            </li>
            <li>
              <RouterLink to="/loggedin">Dashboard</RouterLink>
            </li>
            <li>
              <RouterLink to="/profile">Profile</RouterLink>
            </li>
            <li>
              <RouterLink to="#">portfolio</RouterLink>
            </li>
            <li>
              <RouterLink to="#">contact</RouterLink>
            </li>
          </div>
        </transition>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  width: 100%;
  padding: 5px 10px;
}

.container {
  margin: auto;
}

.navbar {
  box-shadow: 0 1px 4px rgb(146 161 176 / 15%);
}

.navbar .nav-container li {
  list-style: none;
}

.navbar .nav-container a {
  text-decoration: none;
  color: #47C96F;
  font-weight: 500;
  font-size: 3rem;
  padding: 1rem;
  display: inline-block;
}

.navbar .nav-container a:hover {
  font-weight: bolder;
  color: #1DF564;
}

.nav-container {
  position: relative;
  height: 65px;
}

.navbar-fixed-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-toggle {
  cursor: pointer;
  border: none;
  background-color: transparent;
}

.nav-container .menu-toggle .line {
  display: block;
  height: 2px;
  margin-top: 7px;
  width: 30px;
  background: #44546F;
}

.menu-toggle .line1 {
  margin-top: 0px;
}

.menu-toggle .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.menu-toggle .line2 {
  transition: transform 0.2s ease-in-out;
}

.menu-toggle .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

.menu-toggle.active .line1 {
  transform: rotate(40deg);
}

.menu-toggle.active .line2 {
  transform: scaleY(0);
}

.menu-toggle.active .line3 {
  transform: rotate(-40deg);
}

button {
  padding: 15px 15px;
}

.menu-items {
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  background-color: #f4f4f4;
  height: 90vh;
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: 1s ease-in-out;
  border-radius: 20px;
  border: 2px solid #44546f;
  box-shadow: 2px 6px 0px 0px rgba(0, 0, 0, 0.68);
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.slide-enter-from {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.navbar .menu-items li {
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
}
</style>