const camelizeRE = /-(\w)/g;
export const camelize = (str: string): string => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ""));
};

export const upperFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.substring(1);
};
