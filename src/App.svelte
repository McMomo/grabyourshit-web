<script>
	import Navigation from './Components/Navigation.svelte'
	import Station from './Pages/Station.svelte'
</script>

<main>
	<div class='background'>
		<img src='../assets/background-02.svg' alt='the half of a orange circle'/>
	</div>
	<Navigation />
	<Station />
</main>

<style type="text/scss">
	main {
		text-align: center;
		padding: 0;
		margin: 0 auto;

		height: 100%;
		overflow: scroll;
		overflow-x: hidden;
	}

	.background {
		position: absolute;
		z-index: -1;
		height: 100%;
		width: 100%;
		/*background: var(--beige);*/

		img {
			object-position: top;
			object-fit: cover;
			height: 100%;
			width: 100%;
		}
	}
</style>