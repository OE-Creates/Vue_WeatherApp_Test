<template>
	<div class="weather-app">
		<div class="app-search">
			<span>
				<input class="inputField" type="text" v-model="weatherlocation" />
				<button class="inputButton" v-on:click="fetchdata">Search</button><br>
			</span>
		</div>
		<div class="app-main" v-if="this.$store.state.displaydata == 1">
			<table class="outputField">
				
				<WeatherAppDataBase />
				
				<WeatherAppForecastBase />
				
			</table>
		</div>
		<div class="app-main" v-if="this.$store.state.displaydata == 0">
			<table class="outputField">
				<tr v-for="searches in searchhistory" :key="searches.id">
					<td>
						{{ searches.search }}
					</td>
					<td>
						{{ searches.temp }} Degrees
					</td>
					<td>
						<button class="viewButton" v-on:click=" this.weatherlocation = `${ searches.search }`, fetchdata()">View</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
	
	import moment from 'moment'
	import WeatherAppForecastBase from './WeatherAppForecastBase.vue'
	import WeatherAppDataBase from './WeatherAppDataBase.vue'
	
	let id = 0;
	
	export default
	{
		name: 'WeatherApp',
		
		components: {WeatherAppForecastBase, WeatherAppDataBase},
		
		data()
		{
			return {
				datahold: null,
				
				weatherlocation: '',
				searchhistory: []
			}
		},
		
		computed: {
			getweatherdata(){
				return this.$store.state.weatherdata
			},
			
			getweatherdataforecast(){
				return this.$store.state.weatherdataforecast
			}
		},
		
		methods: {
			async fetchdata()
			{
				const res = await fetch(`${this.$store.state.url}weather?q=${this.weatherlocation}&units=metric&appid=${this.$store.state.api_key}`)
				
				this.datahold = await res.json()
				
				this.$store.commit('setweatherdata', this.datahold)
				
				if (this.$store.state.weatherdata.cod != 404){
				
					let found = 0
					let i = 0
					
					while (i < this.searchhistory.length)
					{
						if (this.searchhistory[i].search == this.weatherlocation){
							found++
						}
						i++
					}
					
					if (found == 0){
						this.searchhistory.push({ id: id++, temp: this.$store.state.weatherdata.main.temp, search: this.weatherlocation})
					}
					
					this.fetchdataintervals()
				}
			},
			
			async fetchdataintervals()
			{
				const res = await fetch(`${this.$store.state.url}forecast?q=${this.weatherlocation}&units=metric&appid=${this.$store.state.api_key}`)
				
				this.datahold = await res.json()
				
				this.$store.commit('setweatherdataforecast', this.datahold)
				
				this.datahold = null
				
				this.$store.state.displaydata = 1
			}
		},
		
		/*mounted() {
			this.fetchdata()
		}*/
	}
</script>

<style scoped>
*
{
	margin: 0;
	padding: 0;
	font-family: Montserrat;
}

.weather-app
{
	width: 1000px;
	height: auto;
	/* background: linear-gradient(#2934B5, #1B5BC1); */
	border-radius: 30px;
	margin: 0 auto;
	padding-top: 4vh;
}

.app-search
{
	width: 100%;
	height: auto;
}


.app-main
{
	width: 100%;
	height: auto;
	border-radius: 0px 0px 30px 30px;
	color: white;
}

.inputField
{
	width: 80%;
	height: 58px;
	border-radius: 30px 0px 0px 30px;
	padding-left: 20px;
}

.inputButton
{
	width: 20%;
	height: 58px;
	border-radius: 0px 30px 30px 0px;
}

.viewButton
{
	width: 100px;
	height: 38px;
	border-radius: 30px;
}

.outputField
{
	width: 100%;
	padding: 20px;
}
</style>