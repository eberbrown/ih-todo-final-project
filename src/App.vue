<script setup>
/* import NavBar from "./components/NavBar.vue"; */
import NavBarCopy from "./components/NavBarCopy.vue";
</script>

<template>
  <header>
    <div class="wrapper">
      <!-- <NavBar /> -->
      <NavBarCopy />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  width: 100vw;
}

</style>