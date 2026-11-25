<script lang="ts">
	import { ArcChart } from 'layerchart';
	import { longData } from '$lib/utils/data';

	/* The home screen already feeds the widget with the day's metrics.
	   The demo arc chart below is being replaced by a real activity
	   gauge, so the values are accepted (and typed) but not drawn yet. */
	type Props = {
		steps?: number;
		maxSteps?: number;
		calories?: number;
		maxCalories?: number;
		distance?: number;
		maxDistance?: number;
		size?: number;
		strokeWidth?: number;
		gap?: number;
	};

	let {
		steps = 0,
		maxSteps = 10000,
		calories = 0,
		maxCalories = 500,
		distance = 0,
		maxDistance = 8,
		size = 200,
		strokeWidth = 12,
		gap = 6
	}: Props = $props();

	const data = longData.filter((d) => d.year === 2019);
</script>

<ArcChart
	{data}
	key="fruit"
	value="value"
	range={[-90, 90]}
	outerRadius={-25}
	innerRadius={-20}
	cornerRadius={10}
	props={{ group: { y: 60 } }}
	height={300}
/>
