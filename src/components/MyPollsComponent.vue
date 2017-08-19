<template>
	<div class="app">
		<div class="container">
			<ul class="list-group">
				<li v-for="item in data" class="list-group-item">
					<a :href="'/#/poll/'+item.id">{{ item.title }}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	data () {
		var data = [];
		return {
			data
		}
	},
	created () {
		if(this.$store.getters.getlogin) {
			axios.get("/polls").then(({data}) => {
				this.data = data
			});
		}
	}
}
</script>


<style scoped>
.app {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
}

.list-group {
	margin-top: 20px;
}
</style>