<script>
	import Router from 'svelte-spa-router'
	import Navigation from './Components/Navigation.svelte'
	import Home from './Pages/Home.svelte'
	import Station from './Pages/Station.svelte'
	import Supporter from './Pages/Supporter.svelte'

	const routes = {
		'/': Home,

		'/station/:id': Station,

		'/supporter/:id': Supporter,
		
		//TODO not found
		//'*': NotFound
	}

</script>

<main>
	<div class='background'>
		<img src='../assets/background-02.svg' alt='orange wave on the top and red wave on the bottom'/>
	</div>
	<Navigation/>
	<Router {routes} />
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