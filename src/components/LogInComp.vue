<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/userStore';
const { signIn } = useAuthStore();

const email = ref("");
const password = ref("");

const loginUser = () => {
	signIn(email.value, password.value);
	email.value = "";
	password.value = "";
};

</script>

<template>
		<div class="inputContainer">
			<input type="email" id="email" v-model="email" placeholder="Email">
		</div>

		<div class="inputContainer">
			<input type="password" id="password" v-model="password" placeholder="Password">
		</div>

		<div class="buttonContainer">
			<button @click="loginUser"> Login </button>
		</div>
</template>

<style scoped>

</style>