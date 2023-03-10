/**
 * Takes a given space-delimited list of words and capitalizes their first letter.
 * @param {string} str
 * @returns
 */
export function capitalizeWords(str) {
  return str
    .split(" ")
    .map((word) => `${word[0].toUpperCase()}${word.slice(1)}`)
    .join(" ");
}
