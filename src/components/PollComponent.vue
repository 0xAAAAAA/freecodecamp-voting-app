<template>
	<div class="app">
		<div class="container">
			<div class="row header">
				<div class="col-lg-6">
					<p class="lead">{{post.title}}</p>
				</div>
				<div class="col-lg-6">
					<pie-chart :data="chartdata"></pie-chart>
				</div>
			</div>

			<div class="row votes">
				<ul class="list-group">
					<li v-for="item in post.options" class="list-group-item">
						<a v-if="login" :href="'/vote/'+post.id+'/'+item.id">{{item.value}}</a>
						<p v-if="!login">{{item.value}}</p>
					</li>
				</ul>				
			</div>
		</div>
	</div>
</template>


<script>
import axios from "axios"

export default {
	data () {
		return {
			post: {},
			chartdata: []
		}
	},
	computed: {
		login () {
			return this.$store.getters.getlogin
		}
	},
	created () {
		axios.get("/poll/"+this.$route.params.id).then(({data}) => {
			this.post = data;
			var final = [];
			for(var i=0; i<this.post.options.length; i++) {
				final.push([this.post.options[i].value, this.post.options[i].votes]);
			}
			this.chartdata = final;
		});
	}
}
</script>



<style scoped>
.app {
	width: 100%;
	height: 100%;
}

.container {
	height: 100%;
}

.header {
	height: auto;
	min-height: 50%;
}

.votes {
	margin-top: 40px;
}

.list-group-item p {
	color: #df691a;
	margin: 0;
}
</style>