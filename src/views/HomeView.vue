<script setup>
import { ref } from 'vue';
import LogInComp from "../components/LogInComp.vue";
import SignUpComp from "../components/SignUpComp.vue";

const selectedComponent = ref('B'); // Initial state to null

function ShowLogIn() {
  selectedComponent.value = 'A'; // Show ComponentA
}

function showSignUp() {
  selectedComponent.value = 'B'; // Show ComponentB
}

</script>

<template>
	<nav>
		<button @click="showSignUp">Sign Up</button>
		<button @click="ShowLogIn">Log In</button>
	</nav>
	<main class="sing-in-form">
		<div v-if="selectedComponent === 'A'">
			<LogInComp />
		</div>
		<div v-else-if="selectedComponent === 'B'">
			<SignUpComp />
		</div>
	</main>
</template>

<style scoped>

.inputContainer {
	width: 100%;
	text-align: center;
}

.inputContainer input {
	width: 100%;
}
</style>