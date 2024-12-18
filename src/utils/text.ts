export const camelCaseToHuman = (text: String) => {
  const result = text.replace(/([A-Z])/g, ' $1');

  return result.charAt(0).toUpperCase() + result.slice(1);
}

export const fastClone = (obj: any) => JSON.parse(JSON.stringify(obj));
