<script setup>
	import { loadLinksPreset } from 'tsparticles-preset-links'

	const particlesOptions = {
		preset: 'links',
	}
	async function particlesInit(engine) {
		await loadLinksPreset(engine)
	}
</script>

<template>
	<Particles
		id="particles"
		:particles-init="particlesInit"
		:options="particlesOptions" />
	<div class="content">
		<header class="headings">
			<h1>Blurhash + Worker</h1>
			<h2>Having Fun with Web Workers!</h2>
		</header>
		<main>
			<router-view />
		</main>
	</div>
</template>

<style lang="scss">
	header,
	main {
		position: relative;
	}

	header {
		margin-bottom: 2rem;
	}

	.content {
		background: rgba(255, 255, 255, 0.05);
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		border-radius: 0.5rem;
		border: 1px solid rgba(255, 255, 255, 0.18);
		padding: 2rem;
		margin: 1rem;

		@media screen and (min-width: 768px) {
			padding: 2rem 4rem;
		}
	}
</style>
