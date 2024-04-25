<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/userStore';
import router from '@/router';
const { signIn } = useAuthStore();

const email = ref("");
const password = ref("");

const loginUser = async () => {
	await signIn(email.value, password.value);
	router.push('/loggedin');
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
			<button @click="loginUser" class="sign-in-form-btn"> Login </button>
		</div>
</template>

<style scoped>

.sign-in-form-btn {
	width: 100%;
    margin-top: 32px;
    padding: auto;
}

.inputContainer {
	margin-top: 12px;
}

.inputContainer input {
    width: 100%;
}

</style>