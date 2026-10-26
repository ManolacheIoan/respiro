const nf = new Intl.NumberFormat("ro-RO");

/** 1140 → „1.140 lei” */
export const lei = (n: number) => `${nf.format(n)} lei`;

/** 50 → „50 min” */
export const minutes = (n: number) => `${n} min`;
