<div id="figure_modal" class="modal">
	<span class="close">&times;</span>
	<img class="modal-content" id="img01" alt="Expanded figure" />
</div>

<style>
	:global(#figure_image) {
		cursor: zoom-in;
	}

	.modal {
		display: none;
		position: fixed;
		z-index: 1;
		padding-top: 100px;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgb(0, 0, 0);
		background-color: rgba(0, 0, 0, 0.5);
		cursor: pointer;
	}

	.modal-content {
		margin: auto;
		display: block;
		max-width: 95%;
		max-height: 95%;
		animation-name: zoom;
		animation-duration: 0.3s;
		cursor: default !important;
	}

	@keyframes zoom {
		from {
			transform: scale(0);
		}

		to {
			transform: scale(1);
		}
	}

	.close {
		position: absolute;
		top: 15px;
		right: 35px;
		color: #f1f1f1;
		font-size: 40px;
		font-weight: bold;
		transition: 0.3s;
	}

	.close:hover,
	.close:focus {
		color: #bbb;
		text-decoration: none;
		cursor: pointer;
	}

	@media only screen and (max-width: 700px) {
		.modal-content {
			width: 100%;
		}
	}
</style>
