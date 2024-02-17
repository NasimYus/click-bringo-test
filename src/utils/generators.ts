export const generatorId = (key: string | number): string =>
  key + Math.floor(Date.now() * Math.random()).toString(16);
