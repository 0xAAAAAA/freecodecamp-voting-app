<template>
	<div class="app">
		<nav class="navbar navbar-default">
			<div class="container">
				<a class="navbar-brand" href="#">Voting App</a>
				<div class=" navbar-collapse">
					<ul v-if="this.$store.getters.getlogin" class="nav navbar-nav">
						<li><a href="/#/">Home</a></li>
						<li><a href="/#/polls">My Polls</a></li>
						<li><a href="/#/new">New Poll</a></li>
					</ul>

					<ul class="nav navbar-nav navbar-right">
						<li><a v-if="!this.$store.getters.getlogin" class="btn btn-info" href="/auth/facebook">Login with Facebook</a><a v-if="this.$store.getters.getlogin" class="btn btn-info">{{this.$store.getters.getfirstname}} {{this.$store.getters.getlastname}}</a></li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>


<script>
export default {

}	
</script>

<style scoped>
.app {
	width: 100%;
	height: auto;
}
</style>