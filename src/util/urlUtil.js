export function createUrl(base, { host = "", query = {} } = {}) {
  return `${host}${base}${query ? "?" : ""}${Object.entries(query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&")}`;
}
