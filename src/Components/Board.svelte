<script>
	import { fade } from 'svelte/transition'
</script>

<div class='board' transition:fade>
	<slot></slot>
</div>

<style type="text/scss">
	.board {
		display: flex;
		flex-direction: column;
		place-items: center;

  		background-color: var(--beige);
  		border-radius: 10px;

  		margin: 8px;
		padding: 4px;
  	}

  	@media (min-width: 720px) {
 		.board {
 			max-width: 50%;
 			margin: 16px auto;
 			padding: 8px;
 		}
	}
</style>