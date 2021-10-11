<script lang="ts">
	import { Router, Route } from 'svelte-navigator';
	import type { SvelteComponent } from 'svelte';
	import Navbar from './components/Navbar.svelte';
	import Footer from './components/Footer.svelte';
	import Home from './pages/Home.svelte';
	import Index from './pages/auth/index.svelte';

	let About: typeof SvelteComponent;

	import('./pages/About.svelte').then((component) => {
		About = component.default;
	});
</script>

<Router primary={false}>
	<Navbar />
	<main>
		<Route path="/">
			<Home />
		</Route>

		<Route path="/about">
			<svelte:component this={About} />
		</Route>

		<Route path="/auth/*">
			<Index />
		</Route>
	</main>
	<Footer />
</Router>
