<script>
	import { fade } from 'svelte/transition'
	import Map from '@anoram/leaflet-svelte'

	const API_URL = 'https://grabyourshit-api-oi5fqfguqq-ey.a.run.app'
	let isEmpty = true;

	let station = undefined

	const getStation = async () => {
		const urlParams = new URLSearchParams(window.location.search);
		const stationID = urlParams.get('station');
		if (stationID){
			await fetch(`${API_URL}/stations/${stationID}`)
				.then((res) => res.json())
				.then((json) => {
					station = json
				})
				.catch((err) => console.error('Something went wrong fechting a station' + err))
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
				}
			],
			mapID: 'stationMap'
		}
	}

	getStation()

	let mapOptions;

	$: if (station){
		mapOptions = setMapOptions(station?.location)
	}

</script>

<section class='station' transition:fade>
	{#if station}
		<h2>Ist die Station leer?</h2>
		<!-- a map should be here -->
		<div class='map' transition:fade>
			<Map options={mapOptions} />
		</div>
		<p>
			Möchtest du die Station, mit der Adresse <span>{getAddress(station.nearestAddress)}</span>, als leer melden? Dadurch werden wir benachrichtigt und können die Station wieder befüllen.
		</p>
		<button disabled={isEmpty}>Station als leer melden</button>
		<p>
			Du kennst uns noch nicht? <a href='/'>Hier kannst du herrausfinden was und warum.</a>
		</p>
	{/if}
</section>

<style type="text/scss">
	.station {
		margin: 8px;

		h2 {
			color: var(--brown);
			text-transform: uppercase;
		}
		
		p {
			text-align: left;

			span {
				color: var(--red);
			}
		}

		button {
			color: var(--beige);
			background-color: var(--red);
			border: none;
			border-radius: 5px;
		}

		a {
			color: var(--red);
			
			&:visited{
				color: var(--brown);
			}
		}
	}

	.map {
    	height: 400px;
    	width: auto;
  		place-content: center;
  		background-color: #e0dfdf;

  		border: solid 1px var(--beige);
  		border-radius: 5px;
  	}
</style>