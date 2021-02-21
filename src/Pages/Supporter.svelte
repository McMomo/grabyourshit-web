<script>
	import { fade } from 'svelte/transition'

	import Board from '../Components/Board.svelte'
	import Thanks from '../Components/Thanks.svelte'

	import { getAddress } from '../misc'
	import Constants from '../config'

	export let params = {}
	let isLoading = false;
	let isFinished = false;

	const patchStation = async (stationID, fill) => {
		if (stationID) {
			isLoading = true
			await fetch(`${Constants.API_URL}/stations/${stationID}?fill=${fill}`, {
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
</script>

<section>
	<h2>Hallo lieber Supporter 🐶!</h2>
	<Board>
		{#if isFinished}
			<Thanks />
		{:else}
			{#await fetch(`${Constants.API_URL}/stations/${params.id}`).then((value) => value.json()).then((json) => json)}
				<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
			{:then station}
				{#if station.isFilled && !isLoading}
					<h3>Die Station wurde bereits aufgefüllt ✅</h3>
					<p>Trotzdem danke für deine Angagement. Wir zählen weiterhin auf deine Unterstützung!</p>
				{:else if isLoading}
					<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
				{:else}
					<h3>Du hast die Station <span>{getAddress(station.nearestAddress)}</span> aufgefüllt?</h3>
					<p>Bitte klicke nur auf den Button, falls du die Station schon aufgefüllt hast, danke!</p>
					<button on:click={() => patchStation(params.id, true)}>Ich habe die Station aufgefüllt</button>
				{/if}
			{:catch}
				<p>
					Leider könnte die Station aktuell nicht geladen werden 😢. Versuche es doch später erneut ☀️!
				</p>
			{/await}
		{/if}	
	</Board>
</section>


<style type="text/scss">
	h2 {
		color: var(--brown);
		text-transform: uppercase;
	}

	h3 {
		text-align: center;
		span {
			color: var(--red);
			text-transform: uppercase;
		}
	}
</style>