<script lang="ts">
	import type { Component } from 'svelte';
	import {
		Rocket,
		Palette,
		Layout,
		Devices,
		TextT,
		Swatches,
		PuzzlePiece,
		Sparkle,
		SquaresFour,
		Buildings,
		Gear,
		Crown,
		BookOpen
	} from 'phosphor-svelte';

	type IconWeight = 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';

	let {
		name,
		size = 24,
		weight = 'duotone',
		class: className = ''
	}: { name: string; size?: number | string; weight?: IconWeight; class?: string } = $props();

	// Map the curriculum's icon keys to Phosphor components.
	const map: Record<string, Component> = {
		rocket: Rocket,
		palette: Palette,
		layout: Layout,
		devices: Devices,
		textT: TextT,
		swatches: Swatches,
		puzzlePiece: PuzzlePiece,
		sparkle: Sparkle,
		squaresFour: SquaresFour,
		buildings: Buildings,
		gear: Gear,
		crown: Crown
	};

	const Icon = $derived(map[name] ?? BookOpen);
</script>

<Icon {size} {weight} class={className} />
