export const titles = ['Dr.', 'Dra.', 'Lic.'] as const;
export type Title = (typeof titles)[number];

export const titleOptions = titles.map(title => ({ label: title, value: title }));
