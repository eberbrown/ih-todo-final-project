<script setup>
import { ref } from 'vue';
import { createAccount, login, seeCurrentUser, logout } from '@/api/userApi.js';

const email = ref("");
const password = ref("");
const firstName = ref("");

//create an account
const createAccountUser = () => {
	createAccount(email.value, password.value, firstName.value);
	email.value = "";
	password.value = "";
	firstName.value = "";
};

//login into an account
const loginUser = () => {
	login(email.value, password.value);
	email.value = "";
	password.value = "";
	firstName.value = "";
};
</script>

<template>
	<main>
		<div class="inputContainer">
			<label for="email"> Email: </label>
			<input type="email" id="email" v-model="email">
		</div>

		<div class="inputContainer">
			<label for="password"> Password: </label>
			<input type="password" id="password" v-model="password">
		</div>

		<div class="inputContainer">
			<label for="firstName"> First Name </label>
			<input type="firstName" id="firstName" v-model="firstName">
		</div>

		<div class="buttonContainer">
			<button @click="createAccountUser"> Create </button>
			<button @click="loginUser"> Login </button>
			<button @click="seeCurrentUser"> See user </button>
			<button @click="logout"> Logout </button>
		</div>
	</main>
</template>

<style scoped></style>