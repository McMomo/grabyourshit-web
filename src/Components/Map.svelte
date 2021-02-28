<script>
	import { fade } from 'svelte/transition'
	import Map from '@anoram/leaflet-svelte'

	import { getAddress, getGPS } from '../misc'
	import { mapOptions } from '../store'

	export let gpsLocation = {};

	const setMapOptions = (location) => {
		mapOptions.set(getMapOptions(location))
	}

	const getMapOptions = (location) => {
		const [lat, lng] = getGPS(location)
		return {
			zoom: 17,
			center: [lat, lng],
			markers: [
				{
					lat: lat,
					lng: lng,
					icon: {
			          iconUrl: '../assets/icons/marker.svg',
			          iconSize: [40, 50],
	        		},
				}
			],
			mapID: 'stationMap'
		}
	}

	$: setMapOptions(gpsLocation)
</script>

<div class='map' transition:fade>
	{#if Object.keys($mapOptions).length !== 0}
		<Map options={$mapOptions} />
	{/if}
</div>

<style type="text/scss">
	
.map {
	height: 250px;
	width: 100%;
	margin: 0;

	background-color: var(--beige);  		
	border-radius: 10px;
	overflow: hidden;
}

@media (min-width: 720px) {
	.map {
		height: 50vh;
		margin: auto;
	}
}
</style>