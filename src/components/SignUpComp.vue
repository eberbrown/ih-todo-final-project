<script setup>

import { ref } from 'vue';
import { useAuthStore } from '@/stores/userStore';
const { signUp } = useAuthStore();

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

</script>

<template>
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
            <button @click="createAccountUser" class="sign-in-form-btn"> Create </button>
        </div>

</template>

<style scoped>

.inputContainer {
    width: 100%;
    margin-top: 12px;
}

.inputContainer input {
    width: 100%;
}

.sign-in-form-btn {
	width: 100%;
    margin-top: 32px;
    padding: auto;
}

</style>