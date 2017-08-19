export default {
	getlogin (state) {
		return state.login
	},
	getfirstname (state) {
		return state.user._json.first_name
	},
	getlastname (state) {
		return state.user._json.last_name
	},
	getemail (state) {
		return state.user.emails[0].value
	},
	getid (state) {
		return state.user.id
	}
}