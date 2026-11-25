import Apple from 'lucide-svelte/icons/apple';
import Dumbbell from 'lucide-svelte/icons/dumbbell';
import GlassWater from 'lucide-svelte/icons/glass-water';
import Pill from 'lucide-svelte/icons/pill';

/** One entry of the "Tâches" list on the patient/routine screen. */
export type Task = {
	id: string;
	title: string;
	subtitle?: string;
	done?: boolean;
	/** Glyph shown in the square thumbnail. */
	Icon?: typeof Dumbbell;
};

export const routineTasks: Task[] = [
	{ id: 't1', title: 'Marche 30 min', subtitle: 'Sport · 18:00', Icon: Dumbbell },
	{ id: 't2', title: 'Boire 1,5 L', subtitle: 'Hydratation · toute la journée', Icon: GlassWater },
	{ id: 't3', title: 'Metformine', subtitle: 'Traitement · 08:00', Icon: Pill },
	{ id: 't4', title: 'Petit-déjeuner équilibré', subtitle: 'Nutrition · 07:30', Icon: Apple }
];
