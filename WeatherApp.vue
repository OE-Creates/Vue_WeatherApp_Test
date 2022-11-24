<script>
	
	import moment from 'moment'
	
	let id = 0;
	
	export default
	{
		name: 'WeatherApp',
		data()
		{
			return {
				api_key: 'ba90e5d8e3db6a10763401ce6a3bdc02',
				url: 'https://api.openweathermap.org/data/2.5/',
				datahold: null,
				displaydata: '0',
				currentDate: new Date(),
				formatDate(x)
				{
					x = x*1000
					return moment(x).format("ha")
				},
				formatMainDate(x)
				{
					x = x.toString()
					return x.slice(0, 15)
				},
				formatSearchDate(x)
				{
					x = x.toString()
					return x.slice(0, 15)
				},
				weatherlocation: '',
				searchhistory: []
			}
		},
		
		computed: {
			getweatherdata(){
				return this.$store.state.weatherdata
			},
			
			getweatherdataweek(){
				return this.$store.state.weatherdataweek
			}
		},
		
		methods: {
			async fetchdata()
			{
				const res = await fetch(`${this.url}weather?q=${this.weatherlocation}&units=metric&appid=${this.api_key}`)
				
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
					
					this.fetchdataweek()
				}
			},
			
			async fetchdataweek()
			{
				const res = await fetch(`${this.url}forecast?q=${this.weatherlocation}&units=metric&appid=${this.api_key}`)
				
				this.datahold = await res.json()
				
				this.$store.commit('setweatherdataweek', this.datahold)
				
				this.datahold = null
				
				this.displaydata = 1
			}
		},
		
		/*mounted() {
			this.fetchdata()
		}*/
	}
</script>

<template>
	<div class="weather-app">
		<div class="app-search">
			<span>
				<input class="inputField" type="text" v-model="weatherlocation" />
				<button class="inputButton" v-on:click="fetchdata">Search</button><br>
			</span>
		</div>
		<div class="app-main" v-if="this.displaydata == 1">
			<table class="outputField">
				<tr class="weather-name">
					<td colspan="6">
						<p class="location-info">{{ this.$store.state.weatherdata.name }}, {{ this.$store.state.weatherdata.sys.country }}</p>
						<p class="location-date">{{ formatMainDate(currentDate) }}</p>
					</td>
					<td>
						<button class="backButton" v-on:click="this.displaydata = 0">Back</button>
					</td>
				</tr>
				<tr class="weather-summary">
					<td colspan="3">
						<tr>
							<td rowspan="3">
								<img class="location-icon" :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdata.weather[0].icon }@2x.png`" />
							</td>
							<td rowspan="2">
								<p class="location-temp">{{ this.$store.state.weatherdata.main.temp }}<sup>o</sup></p>
							</td>
						</tr>
						<tr>
						</tr>
						<tr>
							<td>
								<p class="location-desc">{{ this.$store.state.weatherdata.weather[0].description }}</p>
							</td>
						</tr>
					</td>
					<td colspan="4">
						<tr>
							<td>
								<p class="location-add">{{ this.$store.state.weatherdata.main.temp_max }}<sup>o</sup><br>High</p>
								<p class="location-add">{{ this.$store.state.weatherdata.main.temp_min }}<sup>o</sup><br>Low</p>
							</td>
							<td>
								<p class="location-add">{{ this.$store.state.weatherdata.wind.speed }}mph<br>Wind</p>
								<p class="location-add">{{ this.$store.state.weatherdata.main.humidity}}<br>Humidity</p>
							</td>
							<td>
								<p id="sunrise" class="location-add">{{ formatDate(this.$store.state.weatherdata.sys.sunrise) }}<br>Sunrise</p>
								<p id="sunset" class="location-add">{{ formatDate(this.$store.state.weatherdata.sys.sunset) }}<br>Sunset</p>
							</td>
						</tr>
					</td>
				</tr>
				<tr>
					<td colspan="7">
						<h1 class="weather-forecast">3-hour Forecasts</h1>
					</td>
				</tr>
				<tr class="weather-data">
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[0].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[0].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[0].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[0].main.temp }}<sup>o</sup><br><br>
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[1].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[1].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[1].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[1].main.temp }}<sup>o</sup><br><br>
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[2].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[2].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[2].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[2].main.temp }}<sup>o</sup><br><br>						
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[3].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[3].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[3].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[3].main.temp }}<sup>o</sup><br><br>
							
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[4].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[4].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[4].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[4].main.temp }}<sup>o</sup><br><br>						
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[5].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[5].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[5].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[5].main.temp }}<sup>o</sup><br><br>
						</div>
					</td>
					<td>
						<div class="location-forecast" v-if="this.$store.state.weatherdataweek != undefined">
							<br>
							{{ formatDate(this.$store.state.weatherdataweek.list[6].dt) }}<br>
							<img :src="`http://openweathermap.org/img/wn/${ this.$store.state.weatherdataweek.list[6].weather[0].icon }@2x.png`" /><br>
							{{ this.$store.state.weatherdataweek.list[6].weather[0].description }}<br>
							{{ this.$store.state.weatherdataweek.list[6].main.temp }}<sup>o</sup><br><br>
						</div>
					</td>
				</tr>
			</table>
		</div>
		<div class="app-main" v-if="this.displaydata == 0">
			<table class="outputField">
				<tr v-for="searches in searchhistory" :key="searches.id">
					<td>
						{{ searches.search }}
					</td>
					<td>
						{{ searches.temp }} Degrees
					</td>
					<td>
						<button class="backButton" v-on:click=" this.weatherlocation = `${ searches.search }`, fetchdata()">View</button>
					</td>
				</tr>
			</table>
		</div>
	</div>
</template>

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

.backButton
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

.location-info
{
	font-size: 2em;
}

.location-date
{
	margin-bottom: 30px;
}

.location-icon
{
	height: 150px;
	width: 150px;
}

.location-temp
{
	font-size: 4.5em;
}

.location-desc
{
	font-size: 1.5em;
}

.location-add
{
	width: 150px;
	text-align: center;
	height: 60px;
}

.weather-forecast
{
	padding-left: 5px;
}

.location-forecast
{
	margin-bottom: 30px;
	width: 95%;
	text-align: center;
	border-radius: 5px;
    background-color: rgba(0,0,0,0.3);
	padding: 5px;
}
</style>