import Vue from 'vue'
import Router from 'vue-router'
import IndexComponent from "@/components/IndexComponent"
import MyPollsComponent from "@/components/MyPollsComponent"
import NewPollComponent from "@/components/NewPollComponent"
import PollComponent from "@/components/PollComponent"
import store from "@/vuex/store"


Vue.use(Router)

export default new Router({
	routes: [
		{
			path: "/",
			component: IndexComponent
		},
		{
			path: "/polls",
			component: MyPollsComponent,
			beforeEnter (to, from, next) {
				if(store.state.login) {
					next();
				} else {
					next("/");
				}
			}
		},
		{
			path: "/new",
			component: NewPollComponent,
			beforeEnter (to, from, next) {
				if(store.state.login) {
					next();
				} else {
					next("/");
				}
			}
		},
		{
			path: "/_=_",
			redirect: "/"
		},
		{
			path: "/poll/:id",
			component: PollComponent
		}
	]
})
