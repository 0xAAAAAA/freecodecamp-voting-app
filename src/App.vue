<template>
	<div id="app">
		<navbar-component></navbar-component>
		<router-view @refreshfeed="refreshfeed()" class="flex"></router-view>
	</div>
</template>

<script>
import NavbarComponent from "./components/NavbarComponent"
import store from "./vuex/store"
import axios from "axios"


export default {
	components: {
		NavbarComponent
	},
	created () {
		axios.get("/auth").then(({data}) => {
			if(data) {
				this.$store.commit('login');
				this.$store.commit('user', data)
			}
		});
	},
	methods: {
		refreshfeed () {
			this.$emit("refreshfeedchild");
		}
	},
	store: store
}
</script>

<style>
#app {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.flex {
	flex: 1;
}
</style>
