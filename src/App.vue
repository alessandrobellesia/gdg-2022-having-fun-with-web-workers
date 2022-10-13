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
	<header class="headings">
		<h1>Blurhash + Worker</h1>
		<h2>Having Fun with Web Workers!</h2>
	</header>
	<main>
		<router-view />
	</main>
</template>

<style lang="scss">
	header,
	main {
		position: relative;
	}

	header {
		margin-bottom: 2rem;
	}
</style>
