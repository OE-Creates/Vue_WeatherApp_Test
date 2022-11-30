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
			weatherdataforecast: null,
			
			api_key: 'ba90e5d8e3db6a10763401ce6a3bdc02',
			url: 'https://api.openweathermap.org/data/2.5/',
			
			displaydata: '0',
		}
	},
	
	mutations: {
		setweatherdata(state, payload){
			state.weatherdata = payload
		},
		
		setweatherdataforecast(state, payload){
			state.weatherdataforecast = payload
		},
		
		setdisplaydata(state, payload){
			state.displaydata = payload
		}
	}
})

//createApp(App).mount('#app')
const app = createApp(WeatherApp)
app.use(store)
app.mount('#app')