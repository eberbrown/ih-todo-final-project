<script setup>
import NavBarCopy from "./components/NavBar.vue";
</script>

<template>
  <header>
    <div class="wrapper">
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