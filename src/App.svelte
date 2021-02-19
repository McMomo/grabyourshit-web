<script>
	import Navigation from './Components/Navigation.svelte'
	export let name
</script>

<main>
	<Navigation />
	<div class='background' />
</main>

<style>
	main {
		text-align: center;
		padding: 0;
		max-width: 240px;
		margin: 0 auto;

		height: 100%;

		background: linear-gradient(14deg, transparent 50%, var(--beige) 50%);
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	.background {
		position: absolute;
		height: 100%;
		width: 100%;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>