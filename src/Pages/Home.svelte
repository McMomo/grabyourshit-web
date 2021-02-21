<script>
	import { fade } from 'svelte/transition'
	import { getAddress } from '../misc'
	import Board from '../Components/Board.svelte'



	const API_URL = 'https://grabyourshit-api-oi5fqfguqq-ey.a.run.app'

</script>

<section>
	<h1 transition:fade>Willkommen bei <span>grab your shit!</span></h1>

	<Board>
		<img class='lifecycle' src='../assets/gys-lifecycle.svg' alt='grab your shit lifecycle - a paw which is grabing poop with a plastic bag'/>
	</Board>

	<Board>
		{#await fetch(`${API_URL}/stations`).then((value) => value.json()).then((json) => json)}
			<img src='../assets/pulse-1s-200px.svg' alt='loading animation' transition:fade>
		{:then stations}
			<h2>
				Hier findes du unsere Stationen
			</h2>
			<ul>
				{#each stations as station}
					{#if station.nearestAddress}
						<li>			
							📍 <a href='#/station/{station.id}'>{getAddress(station.nearestAddress)}</a>
						</li>
					{/if}
				{/each}
			</ul>
		{:catch}
			<p>
				Leider können unsere Stationen aktuell nicht geladen werden 😢. Versuche es doch später erneut ☀️!			
			</p>
		{/await}	
	</Board>
</section>

<style type="text/scss">
	h1, h2{
		color: var(--brown);
		text-transform: uppercase;

		span {
			color: var(--red);
		}
	}

	ul {
		list-style: none;
		text-align: left;
		padding: 0;
	}

	li {
		margin: 0.5em;
	}

  	.lifecycle {
  		height: 75vh;
  		filter: invert(42%) sepia(72%) saturate(1687%) hue-rotate(334deg) brightness(94%) contrast(98%);
  	}

  	@media (min-width: 720px) {

	}
</style>