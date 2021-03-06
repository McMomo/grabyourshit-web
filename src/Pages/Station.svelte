<script>
	import { fade } from 'svelte/transition'

	import Board from '../Components/Board.svelte'
	import Map from '../Components/Map.svelte'
	import Thanks from '../Components/Thanks.svelte'

	import { getAddress, getGPS } from '../misc'
	import Constants from '../config'

	//for svelte spa router
	export let params = {}

	const stationID = params.id
	
	let station = undefined

	let isFilled = false
	let isLoading = false
	let isFinished = false
	
	let address = ''

	const getStation = async (stationID) => {
		if (stationID){
			await fetch(`${Constants.API_URL}/stations/${stationID}`)
				.then((res) => res.json())
				.then((json) => {
					station = json
				})
				.catch((err) => console.error('catch error on GET' + err))
		}
	}

	const patchStation = async (stationID, fill) => {
		if (stationID) {
			isLoading = true
			await fetch(`${Constants.API_URL}/stations/${stationID}/${fill}`, {
				method: 'PATCH'
			})
			.then((res) => res.json())
			.then((json) => {
				console.log(json)
				isLoading = false
				isFinished = true
			})
			.catch((err) => console.error('catch error on PATCH' + err))
		}
	}

	getStation(stationID)

	$: if (station){
		isFilled = station.isFilled
		address = getAddress(station?.nearestAddress)
	}
</script>

<section class='station' transition:fade>
	<h2>Ist die Station leer?</h2>
	<Board>
		{#if station}
			<Map gpsLocation={station.location}/>
		{/if}
	</Board>
	<Board>
		{#if isLoading}
			<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
		{:else if isFinished}
			<Thanks />
		{:else}
			<p>
				<span>{address}</span>
			</p>
			{#if isFilled}
				<p>
					Möchtest du die Station als leer melden? Dadurch werden wir benachrichtigt und können die Station wieder befüllen. 🐶
				</p>
			{:else}
				<p>
					Die Station wurde bereits als leer gemeldet. Danke für deine Mithilfe! 🐶
				</p>
			{/if}
			<button disabled={ !isFilled } on:click={() => patchStation(stationID, false)}>Station als leer melden</button>
			<p>
				Du kennst uns noch nicht? <a href='#/'>Hier kannst du herrausfinden was und warum.</a>
			</p>
		{/if}
	</Board>
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
	}

	img {
		height: 10rem;
	}

  	@media (min-width: 720px) {
  		.station {
	  		h2 {
	  			margin: 16px;
	  		}
  		}
	}
</style>