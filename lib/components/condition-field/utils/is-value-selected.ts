type PropsType = {
  value: any;
  is: any;
};

export const isValueSelected = ({ value, is }: PropsType): boolean => {
  if (Array.isArray(is)) {
    return Boolean(is.find(item => item === value));
  }

  return is === value;
};
