<template>
	<div class="app">
		<div class="container">
			<form @submit.prevent="postForm()" class="form-horizontal">
				<fieldset>
					<legend>New Poll</legend>

					<div class="form-group">
						<label class="col-lg-2 control-label">Title</label>
						<div class="col-lg-10">
							<input v-model="title" type="text" name="title" required class="form-control" autocomplete="off">
						</div>
					</div>
					
					<div class="form-group">
						<label class="col-lg-2 control-label">Option 1</label>
						<div class="col-lg-10">
							<input type="text" v-model="opt" name="opt" required class="form-control" autocomplete="off">
						</div>
					</div>

					<div v-for="item in limit">
						<field-component @gotvalue="checkvalue" :len="len+1"></field-component>
					</div>					

					<div class="form-group">
						<div class="col-lg-10 col-lg-offset-2">
							<button type="submit" class="btn btn-info">Submit</button>
							<button @click="addNode()" class="btn btn-primary">+</button>
						</div>
					</div>

				</fieldset>
			</form>
		</div>
	</div>
</template>

<script>
import FieldComponent from "./FieldComponent"
import axios from "axios"
import id from "ez-uuid"

export default {
	components: {
		FieldComponent
	},
	data () {
		return {
			limit: [],
			len: 0,
			title: '',
			id: this.$store.getters.getid,
			opt: '',
			options: []
		}
	},
	methods: {
		addNode () {
			this.len++;
			this.limit.push(0);
		},
		postForm () {
			this.options.push({ value: this.opt, id: id.alphanum({prefix: "opt", length: 50, parts: 5}), votes: 0 });
			var data = {
				id: this.$store.getters.getid,
				title: this.title,
				options: this.options
			}
			if(this.$store.getters.getlogin) {
				axios.post("/newpoll", data);
				this.$router.push("/");
				this.$emit("refreshfeed");
			}
		},
		checkvalue(data) {
			this.options.push({
				value: data.message,
				id: id.alphanum({prefix: "opt", length: 50, parts: 5}),
				votes: 0
			});
			console.log(this.options);
		}
	}
}
</script>


<style>
.app {
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
}

.container {
	flex: 1;
}
</style>