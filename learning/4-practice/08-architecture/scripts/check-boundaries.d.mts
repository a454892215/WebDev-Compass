export function importsOf(
  text: string,
  vue?: boolean,
): { imports: string[]; errors: string[] }
export function graphErrors(edges: [string, string][]): string[]
export function audit(root: string): { edges: [string, string][]; errors: string[] }
