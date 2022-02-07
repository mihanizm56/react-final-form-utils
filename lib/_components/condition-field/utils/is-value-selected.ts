type PropsType = {
  fieldValue: any;
  selectedValue: any;
};

export const isValueSelected = ({
  fieldValue,
  selectedValue,
}: PropsType): boolean => {
  if (Array.isArray(selectedValue)) {
    return Boolean(selectedValue.find(item => item === fieldValue));
  }

  return selectedValue === fieldValue;
};
