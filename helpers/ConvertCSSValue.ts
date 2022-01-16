const convertValue = (value: string | number): string => {
  return typeof value === "string" ? value : `${value}px`;
};

export default convertValue;
