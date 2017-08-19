<template>
	<div class="app">
		<nav class="navbar navbar-default">
			<div class="container">
				<a class="navbar-brand" href="#">Voting App</a>
				<div class=" navbar-collapse">
					<ul class="nav navbar-nav">
						<li><a href="/#/">Home</a></li>
						<li v-if="this.$store.getters.getlogin"><a href="/#/polls">My Polls</a></li>
						<li v-if="this.$store.getters.getlogin"><a href="/#/new">New Poll</a></li>
					</ul>

					<ul class="nav navbar-nav navbar-right">
						<li v-if="!this.$store.getters.getlogin"><a class="btn btn-info" href="/auth/facebook">Login with Facebook</a></li>
						<li v-if="this.$store.getters.getlogin" class="dropdown">
							<a class="btn btn-info" href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">{{this.$store.getters.getfirstname}} {{this.$store.getters.getlastname}} <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a @click="logout()">Logout</a></li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
import axios from "axios"

export default {
	methods: {
		logout () {
			this.$store.commit("logout");
			this.$router.push("/");
			axios.get("/logout");
		}
	}
}	
</script>

<style scoped>
.app {
	width: 100%;
	height: auto;
}

.dropdown-toggle {
	background-color: #5bc0de !important;
}


.dropdown-menu li:hover {
	cursor: pointer;
}
</style>