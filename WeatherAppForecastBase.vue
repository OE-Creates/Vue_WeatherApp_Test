<template>
	<tr>
		<td colspan="7">
			<h1 class="weather-forecast">3-hour Forecasts</h1>
		</td>
	</tr>
	<tr class="weather-data">
		<td>
			<WeatherAppForecast idx=0 />
		</td>
		<td>
			<WeatherAppForecast idx=1 />
		</td>
		<td>
			<WeatherAppForecast idx=2 />
		</td>
		<td>
			<WeatherAppForecast idx=3 />
		</td>
		<td>
			<WeatherAppForecast idx=4 />
		</td>
		<td>
			<WeatherAppForecast idx=5 />
		</td>
		<td>
			<WeatherAppForecast idx=6 />
		</td>
	</tr>
</template>

<script>

	import WeatherAppForecast from './WeatherAppForecast.vue'

	export default
	{
		components: {WeatherAppForecast},
	}
	
</script>

<style scoped>
.weather-forecast
{
	padding-left: 5px;
}
</style>