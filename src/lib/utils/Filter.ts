export const availableStoryTypes = [
	{ value: 'SHORT_FICTION', label: 'Short Fiction' },
	{ value: 'NOVELLA', label: 'Novella' },
	{ value: 'NOVEL', label: 'Novel' }
];

export function formatStoryType(type: string) {
	return type.replace('_', ' ');
}
