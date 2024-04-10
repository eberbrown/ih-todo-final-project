<script setup>
import { ref } from 'vue';
import LogInComp from "../components/LogInComp.vue";
import SignUpComp from "../components/SignUpComp.vue";

const selectedComponent = ref('B'); // Initial state to null

function showLogIn() {
	selectedComponent.value = 'A'; // Show ComponentA
}

function showSignUp() {
	selectedComponent.value = 'B'; // Show ComponentB
}

</script>

<template>
	<main class="home-container">
		<nav>
			<button @click="showSignUp" class="sign-up-nav-btn">Sign Up</button>
			<div class="vl"></div>
			<button @click="showLogIn" class="sign-up-nav-btn">Log In</button>
		</nav>
		<div class="sing-in-form">
			<div v-if="selectedComponent === 'A'">
				<LogInComp />
				<div class="singup-login-link-container">
					<a @click="showSignUp" class="singup-login-link">Don't have a TaskTrack account? Sign Up.</a>
				</div>
			</div>
			<div v-else-if="selectedComponent === 'B'">
				<SignUpComp />
				<div class="singup-login-link-container">
					<a @click="showLogIn" class="singup-login-link">Already have a TaskTrack account? Log In.</a>
				</div>
			</div>
		</div>
		<hr>
		<div class="home-view-logo-container">
			<img src="../components/icons/TaskTrackCSV.svg" alt="" class="home-view-logo">
		</div>
	</main>
</template>

<style scoped>
.home-container {
	width: 100%;
	padding: 35px 20px;
	-webkit-box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	-moz-box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	box-shadow: 5px 5px 12px 0px rgba(0, 0, 0, 0.19);
	border-radius: 5px;
}

nav {
	margin: 0 auto;
	text-align: center;
}

.sign-up-nav-btn {
	color: #47c96f;
	background-color: transparent;
	border: none;
	font-weight: normal;
}

.vl {
	border-left: 1.5px solid #47c96f;
	height: 3rem;
	display: inline;
}

.sing-in-form {
	width: 100%;
	text-align: center;
}

.singup-login-link-container {
	margin: 20px 0;
}

.singup-login-link {
	color: #1D6BF5;
	font-size: 1.2rem;
	font-weight: bold;
	margin: 20px 0;
}

hr {
	margin: 20px 0;
}

.home-view-logo-container {
	display: flex;
	justify-content: center;
}

.home-view-logo {
	width: 60%;
	text-align: center;
}

@media (hover: hover) {
	.singup-login-link:hover {
    color: #1DB0F5;
  }
}

/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
/*  ------------------------------- MEDIA QUERIES ------------------------->>>>> */
@media screen and (min-width: 575px) {}

@media screen and (min-width: 767px) {}

@media screen and (min-width: 991px) {}

@media screen and (min-width: 1115px) {}

@media screen and (min-width: 1400px) {}

@media screen and (min-width: 1440px) {}
</style>