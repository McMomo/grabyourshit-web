<script>
	import { fade } from 'svelte/transition'
</script>

<div transition:fade>
	<img src='../assets/icons/treats.svg' alt='dog treat as thank you'/>
	<h2>Danke für deine Unterstützung!</h2>
</div>

<style type="text/scss">
	div {
		display: grid;
		place-items: center;
	}

	img {
		height: 6em;
		margin: 8px;
		filter: invert(42%) sepia(72%) saturate(1687%) hue-rotate(334deg) brightness(94%) contrast(98%);
	}
	h2 {
		color: var(--brown);
		text-transform: uppercase;
		margin: 8px;
	}
</style>