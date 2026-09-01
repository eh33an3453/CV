export function basePath(path: string): string {
  if (/^(https?:)?\/\//.test(path) || /^data:/i.test(path)) return path
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`
}