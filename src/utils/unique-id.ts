let counter = 0;

export function uniqueId() {
  counter += 1;
  return `${Date.now()}${counter}`;
}
