<script lang="ts">
	import { Route, Router } from 'svelte-navigator';
	import type { SvelteComponent } from 'svelte';

	let Login: typeof SvelteComponent;
	let Register: typeof SvelteComponent;

	import('./Login.svelte').then((component) => {
		Login = component.default;
	});
	import('./Register.svelte').then((component) => {
		Register = component.default;
	});
</script>

<Router primary={false}>
	<Route path="/login">
		<svelte:component this={Login} />
	</Route>

	<Route path="/register">
		<svelte:component this={Register} />
	</Route>
</Router>
