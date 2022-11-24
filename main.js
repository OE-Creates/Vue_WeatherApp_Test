import { createApp } from 'vue'
import { createStore } from 'vuex'
import App from './App.vue'
import WeatherApp from './WeatherApp.vue'
import moment from 'moment'

//import './assets/main.css'
import './assets/weatherapp.css'

const store = createStore({
	state(){
		return{
			weatherdata: null,
			weatherdataweek: null
		}
	},
	
	mutations: {
		setweatherdata(state, payload){
			state.weatherdata = payload
		},
		
		setweatherdataweek(state, payload){
			state.weatherdataweek = payload
		}
	}
})

//createApp(App).mount('#app')
const app = createApp(WeatherApp)
app.use(store)
app.mount('#app')