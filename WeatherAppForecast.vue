<template>
	<div class="location-forecast">
		<br>
		{{ formatDate(getweatherdataforecast.list[idx].dt) }}<br>
		<img :src="`http://openweathermap.org/img/wn/${ getweatherdataforecast.list[idx].weather[0].icon }@2x.png`" /><br>
		{{ getweatherdataforecast.list[idx].weather[0].description }}<br>
		{{ getweatherdataforecast.list[idx].main.temp }}<sup>o</sup><br><br>
	</div>
</template>

<script>

	import moment from 'moment'
	
	export default
	{
		props: ['idx'],
		
		data()
		{
			return {
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