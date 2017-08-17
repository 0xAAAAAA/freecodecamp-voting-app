<template>
	<div id="app">
		<router-view class="flex"></router-view>
	</div>
</template>

<script>
export default {
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
