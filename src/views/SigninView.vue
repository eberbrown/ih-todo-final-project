<script setup>

 import { ref } from 'vue';
import { useAuthStore } from '@/stores/userStore';
const {signUp, signIn, signOut, seeCurrentUserStore} = useAuthStore();

const email = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");

const createAccountUser = () => {
	signUp(email.value, password.value, firstName.value, lastName.value);
	email.value = "";
	password.value = "";
	firstName.value = "";
	lastName.value = "";
};

const loginUser = () => {
	signIn(email.value, password.value);
	email.value = "";
	password.value = "";
	firstName.value = "";
	lastName.value = "";
};

</script>

<template>
	<main class="sing-in-form">
		<div class="inputContainer">
			<!-- <label for="firstName"> First Name </label> -->
			<input type="string" id="firstName" v-model="firstName" placeholder="First Name">
		</div>
		<div class="inputContainer">
			<!-- <label for="lastName"> Last Name </label> -->
			<input type="string" id="lastName" v-model="lastName" placeholder="Last Name">
		</div>
		<div class="inputContainer">
			<!-- <label for="email"> Email: </label> -->
			<input type="email" id="email" v-model="email" placeholder="Email">
		</div>

		<div class="inputContainer">
			<!-- <label for="password"> Password: </label> -->
			<input type="password" id="password" v-model="password" placeholder="Password">
		</div>

		<div class="buttonContainer">
			<button @click="createAccountUser"> Create </button>
			<button @click="loginUser"> Login </button>
			<button @click="seeCurrentUserStore"> See user </button>
			<button @click="signOut"> Logout </button>
		</div>
	</main>
</template>

<style scoped>

.sign-in-form {
	/* margin: 0 auto; */
	/* display: flex; */
}

.inputContainer {
	width: 100%;
	/* margin: 0 auto; */
	text-align: center;
}

.inputContainer input {
	width: 100%;
	/* margin: 0 auto; */
}

</style>