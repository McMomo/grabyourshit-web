<script>
	import { fade } from 'svelte/transition'

	export let isRow = false
</script>

<div class:isRow class='board' transition:fade>
	<slot></slot>
</div>

<style type="text/scss">
	.board {
		display: flex;
		flex-direction: column;
		place-items: center;
		position: relative;

  		background-color: var(--beige);
  		border-radius: 10px;

  		margin: 8px;
		padding: 4px;

		box-shadow:
		  0 4.2px 3.6px rgba(0, 0, 0, 0.02),
		  0 12.2px 10px rgba(0, 0, 0, 0.032),
		  0 31.1px 24.1px rgba(0, 0, 0, 0.044),
		  0 100px 80px rgba(0, 0, 0, 0.07)
		;
  	}

  	.isRow {
  		flex-direction: row !important;
  		place-content: center;
  	}

  	@media (min-width: 720px) {
 		.board {
 			max-width: 50%;
 			margin: 16px auto;
 			padding: 8px;
 		}
	}
</style>