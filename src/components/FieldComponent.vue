<template>
	<div class="app">
		<div class="form-group">
			<label v-once class="col-lg-2 control-label">Option {{ getNumber() }}</label>
			<div class="col-lg-10">
				<input v-once type="text" v-model="message" @blur="emitEvent()" :name="'opt'+getNumber()" required class="form-control" autocomplete="off">
			</div>
		</div>
	</div>
</template>


<script>
export default {
	props: ['len'],
	data () {
		return {
			message: '',
			changecheck: false,
			staticlen: 1
		}
	},
	methods: {
		getNumber () {
			if(!this.changecheck) {
				this.changecheck = true;
				this.staticlen = this.len;
			}
			return this.staticlen
		},
		emitEvent () {
			this.$emit('gotvalue', { message:this.message, value: this.getNumber() });
		}
	}
}
</script>

