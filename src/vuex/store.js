import Vue from "vue"
import Vuex from "vuex"
import getters from "./getters"

Vue.use(Vuex);

var state = {
	login: false,
	user: {}
}


var mutations = {
	login (state) {
		state.login = true;
	},
	logout (state) {
		state.login = false;
		state.user = {};
	},
	user (state, data) {
		state.user = data;
	}
}


export default new Vuex.Store({
	state: state,
	mutations: mutations,
	getters: getters
});