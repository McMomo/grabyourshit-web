<nav class='navigation'>
	<a href='/'><img src='../assets/icons/grabyourshit-icon-04.svg' alt='Pfote in Tüte'/></a>
	<slot></slot>
</nav>

<style type="text/scss">
	.navigation {
		display: flex;
		flex-direction: row;
		place-content: center;
	
		height: 4em;

		img {
			height: 4em;
		}
	}
</style>