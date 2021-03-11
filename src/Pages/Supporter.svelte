<script>
	import { onMount } from "svelte";
	import { fade } from 'svelte/transition'

	import Board from '../Components/Board.svelte'
	import Map from '../Components/Map.svelte'
	import Thanks from '../Components/Thanks.svelte'

	import authService from "../authService";
	import { isAuthenticated, user } from "../store";
	import { getAddress } from '../misc'
	import Constants from '../config'

	export let params = {}
	let isLoading = false;
	let isFinished = false;

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

	// auth0


	let auth0Client;

	onMount(async () => {
    	auth0Client = await authService.createClient();

		await authService.handleRedirectOnLoad(auth0Client)
	});

	function login() {
		authService.loginWithRedirect(
			auth0Client, 
			{ redirect_uri:`${window.location.href}` }
		);
	}

	function logout() {
		authService.logout(auth0Client);
	}

</script>

<section>
	<h2>Hallo lieber Supporter 🐶!</h2>
		{#await fetch(`${Constants.API_URL}/stations/${params.id}`).then((value) => value.json()).then((json) => json)}
			<Board>
				<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade />
			</Board>
		{:then station}
			<Board>
				<Map gpsLocation={station.location}/>
			</Board>
			<Board>
				{#if $isAuthenticated}
					{#if station.isFilled && !isLoading}
						<h3>Die Station wurde bereits aufgefüllt ✅</h3>
						<p>Trotzdem danke für deine Angagement. Wir zählen weiterhin auf deine Unterstützung!</p>
					{:else if isLoading}
						<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
					{:else if isFinished}
						<Thanks />
					{:else}
						<h3>Du hast die Station <span>{getAddress(station.nearestAddress)}</span> aufgefüllt?</h3>
						<p>Bitte klicke nur auf den Button, falls du die Station schon aufgefüllt hast, danke!</p>
						<button on:click={() => patchStation(params.id, true)}>Ich habe die Station aufgefüllt</button>
					{/if}
				{:else}
					<p>
						Um die Station als aufgefüllt zu melden, logge dich bitte über den Button ein.
					</p>
					<button on:click={login}>
		            	Log In 🔑
					</button>
				{/if}
			</Board>
		{:catch}
			<Board>
				<p>
					Leider könnte die Station aktuell nicht geladen werden 😢. Versuche es doch später erneut ☀️!
				</p>
			</Board>
		{/await}
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

	img {
		height: 10rem;
	}

	button {
		max-width: 50%;
	}
</style>