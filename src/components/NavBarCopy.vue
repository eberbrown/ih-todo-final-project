<script setup>
import { useAuthStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'

const userStore = useAuthStore()
const router = useRouter()

const logOut = async () => {
  await userStore.signOut()
  router.push('/')
};

</script>

<template>
  <nav>
    <div class="navbar">
      <div class="container nav-container">
        <input class="checkbox" type="checkbox" name="" id="" />
        <div class="hamburger-lines">
          <span class="line line1"></span>
          <span class="line line2"></span>
          <span class="line line3"></span>
        </div>
        <div class="logo">
          <!-- <h1>Navbar</h1> -->
          <button @click="logOut"> Logout </button>
        </div>
        <div class="menu-items">
          <li>
            <RouterLink to="/">Home</RouterLink>
          </li>
          <li>
            <RouterLink to="/loggedin">Dashboard</RouterLink>
          </li>
          <li><RouterLink to="#">blogs</RouterLink></li>
          <li><RouterLink to="#">portfolio</RouterLink></li>
          <li><RouterLink to="#">contact</RouterLink></li>
        </div>
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

.navbar .nav-container a:hover{
    font-weight: bolder;
    color: #1DF564;
}

.nav-container {
  display: block;
  position: relative;
  height: 60px;
}

.nav-container .checkbox {
  position: absolute;
  display: block;
  height: 32px;
  width: 32px;
  top: 20px;
  left: 20px;
  z-index: 5;
  opacity: 0;
  cursor: pointer;
}

.nav-container .hamburger-lines {
  display: block;
  height: 26px;
  width: 32px;
  position: absolute;
  top: 17px;
  left: 20px;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.nav-container .hamburger-lines .line {
  display: block;
  height: 4px;
  width: 100%;
  border-radius: 10px;
  background: #44546F;
}

.nav-container .hamburger-lines .line1 {
  transform-origin: 0% 0%;
  transition: transform 0.4s ease-in-out;
}

.nav-container .hamburger-lines .line2 {
  transition: transform 0.2s ease-in-out;
}

.nav-container .hamburger-lines .line3 {
  transform-origin: 0% 100%;
  transition: transform 0.4s ease-in-out;
}

button {
  padding: 15px 15px;
}

.navbar .menu-items {
  padding-top: 120px;
  box-shadow: inset 0 0 2000px rgba(255, 255, 255, 0.5);
  background-color: #f4f4f4;
  height: 100vh;
  width: 100%;
  transform: translate(-150%);
  display: flex;
  flex-direction: column;
  margin-left: -40px;
  padding-left: 50px;
  transition: transform 0.5s ease-in-out;
  text-align: center;
}

.navbar .menu-items li {
  margin-bottom: 1.2rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.logo {
  position: absolute;
  top: 5px;
  right: 15px;
  font-size: 1.2rem;
  color: #0e2431;
}

.nav-container input[type="checkbox"]:checked ~ .menu-items {
  transform: translateX(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line1 {
  transform: rotate(45deg);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line2 {
  transform: scaleY(0);
}

.nav-container input[type="checkbox"]:checked ~ .hamburger-lines .line3 {
  transform: rotate(-45deg);
}

.nav-container input[type="checkbox"]:checked ~ .logo{
  display: none;
}
</style>