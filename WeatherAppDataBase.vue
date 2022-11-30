<template>
	<tr class="weather-name">
		<td colspan="6">
			<p class="location-info">{{ getweatherdata.name }}, {{ getweatherdata.sys.country }}</p>
			<p class="location-date">{{ formatMainDate(currentDate) }}</p>
		</td>
		<td>
			<button class="backButton" v-on:click="this.$store.state.displaydata = 0">Back</button>
		</td>
	</tr>
	<tr class="weather-summary">
		<td colspan="3">
			<tr>
				<td rowspan="3">
					<img class="location-icon" :src="`http://openweathermap.org/img/wn/${ getweatherdata.weather[0].icon }@2x.png`" />
				</td>
				<td rowspan="2">
					<p class="location-temp">{{ getweatherdata.main.temp }}<sup>o</sup></p>
				</td>
			</tr>
			<tr>
			</tr>
			<tr>
				<td>
					<p class="location-desc">{{ getweatherdata.weather[0].description }}</p>
				</td>
			</tr>
		</td>
		<td colspan="4">
			<tr>
				<td>
					<p class="location-add">{{ getweatherdata.main.temp_max }}<sup>o</sup><br>High</p>
					<p class="location-add">{{ getweatherdata.main.temp_min }}<sup>o</sup><br>Low</p>
				</td>
				<td>
					<p class="location-add">{{ getweatherdata.wind.speed }}mph<br>Wind</p>
					<p class="location-add">{{ getweatherdata.main.humidity}}<br>Humidity</p>
				</td>
				<td>
					<p id="sunrise" class="location-add">{{ formatDate(getweatherdata.sys.sunrise) }}<br>Sunrise</p>
					<p id="sunset" class="location-add">{{ formatDate(getweatherdata.sys.sunset) }}<br>Sunset</p>
				</td>
			</tr>
		</td>
	</tr>
</template>

<script>
	import moment from 'moment'
	
	export default
	{
		data()
		{
			return {
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
	}
</script>

<style scoped>
.backButton
{
	width: 100px;
	height: 38px;
	border-radius: 30px;
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
</style>