<script lang="ts">
	import { Link } from 'svelte-navigator';
</script>

<nav class="navbar">
	<div class="navbar__brand">
		<Link to="/">Svelte App</Link>
	</div>
	<ul class="navbar__nav">
		<li>
			<Link to="/">Home</Link>
		</li>
		<li>
			<Link to="/about">About</Link>
		</li>
		<li>
			<Link to="/auth/login">Login</Link>
		</li>
		<li>
			<Link to="/auth/register">Register</Link>
		</li>
	</ul>
</nav>

<style lang="scss">
	.navbar {
		display: flex;
		padding: 20px;
		background-color: #f2f2f2;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		top: 0;
		width: 100%;

		&__brand {
			font-size: 1.4rem;
			font-weight: 600;
		}

		&__nav {
			display: flex;
			list-style: none;
			gap: 0.85rem;
		}
	}
</style>
