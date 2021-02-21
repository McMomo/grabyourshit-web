<script>
	import { fade } from 'svelte/transition'
	import Map from '@anoram/leaflet-svelte'

	const API_URL = 'https://grabyourshit-api-oi5fqfguqq-ey.a.run.app'
	const urlParams = new URLSearchParams(window.location.search)
	const stationID = urlParams.get('station')
	
	let isFilled = false;
	let isLoading = false;
	let mapOptions
	let station = undefined

	const getStation = async (stationID) => {
		if (stationID){
			await fetch(`${API_URL}/stations/${stationID}`)
				.then((res) => res.json())
				.then((json) => {
					station = json
				})
				.catch((err) => console.error('catch error on GET' + err))
		}
	}

	const patchStation = async (stationID) => {
		if (stationID) {
			isLoading = true
			await fetch(`${API_URL}/stations/${stationID}?fill=false`, {
				method: 'PATCH'
			})
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
				isLoading = false
			})
			.catch((err) => console.error('catch error on PATCH' + err))
		}
	}

	const getAddress = ({street, zip, city}) => {
		return `${street} in ${city} (${zip})`
	}

	const getGPS = (location) => {
		let gps = []
		location.forEach((x) => gps.push(x.split('°')[0]))
		return gps
	}

	const setMapOptions = (location) => {
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

	getStation(stationID)

	

	$: if (station){
		console.log(isFilled)
		isFilled = station.isFilled;
		console.log(isFilled, station.isFilled)
		mapOptions = setMapOptions(station.location)
	}

</script>

<section class='station' transition:fade>
	{#if station}
		<h2>Ist die Station leer?</h2>
		<!-- a map should be here -->
		<div class='map' transition:fade>
			<Map options={mapOptions} />
		</div>

		<div class='board'>
			{#if isLoading}
				<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
			{:else if station}
				<p>
					<span>{getAddress(station.nearestAddress)}</span>
				</p>
				<!-- TODO WHY IS THIS NOT REACTIVE ??? -->
				{#if station.isFilled}
					<p>
						Möchtest du die Station als leer melden? Dadurch werden wir benachrichtigt und können die Station wieder befüllen. 🐶
					</p>
				{:else}
					<p>
						Die Station wurde bereits als leer gemeldet. Danke für deine Mithilfe! 🐶
					</p>
				{/if}
				<button disabled={!station.isFilled} on:click={() => patchStation(stationID)}>Station als leer melden</button>
				<p>
					Du kennst uns noch nicht? <a href='/'>Hier kannst du herrausfinden was und warum.</a>
				</p>
			{/if}
		</div>
	{/if}
</section>

<style type="text/scss">
	.station {
		margin: 8px;

		h2 {
			color: var(--brown);
			text-transform: uppercase;
			margin: 0;
		}
		
		p {
			text-align: center;

			span {
				color: var(--red);
				text-transform: uppercase;
			}
		}

		button {
			color: var(--beige);
			background-color: var(--red);
			border: none;
			border-radius: 5px;

			&:disabled{
				background-color: var(--brown) !important;
				color: var(--beige) !important;
				text-decoration:line-through;
			}

			&:hover{
				background-color: var(--yellow);
				color: var(--red);
			}
		}

		a {
			color: var(--red);
			
			&:visited{
				color: var(--brown);
			}
		}
	}

	.map {
    	height: 250px;
    	width: auto;
    	margin: 8px;

  		background-color: #e0dfdf;  		
  		border-radius: 10px;
  		overflow: hidden;
  	}

  	.board {
  		background-color: var(--beige);
  		border-radius: 10px;

  		margin: 8px;
		padding: 4px;
  	}

  	@media (min-width: 720px) {
  		.station {
	  		h2 {
	  			margin: 16px;
	  		}
  		}

 		.map {
 			max-width: 50%;
 			margin: auto;
 		}

 		.board {
 			max-width: 50%;
 			margin: 16px auto;
 			padding: 8px;
 		}
	}
</style>