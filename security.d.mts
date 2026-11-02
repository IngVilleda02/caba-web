export function panelOrigin(panelUrl?: string): string;
export function buildCsp(opts?: { dev?: boolean; panelUrl?: string }): string;
export const otherHeaders: [string, string][];
