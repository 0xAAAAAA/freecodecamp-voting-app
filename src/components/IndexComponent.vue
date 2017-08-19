<template>
	<div class="app">
		<div class="container">
			<ul class="list-group">
				<li v-for="item in post" class="list-group-item">
					<a :href="'/#/poll/'+item.id">{{item.title}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	data () {
		return {
			post: []
		}
	},
	created () {
		this.$parent.$on("refreshfeedchild", this.refreshfeed());
		axios.get("/getpost").then(({data}) => {
			this.post = data
		});
	},
	methods: {
		refreshfeed () {
			axios.get("/getpost").then(({data}) => {
				this.post = data
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

.list-group	{
	margin-top: 20px;
}
</style>