type ParamsType = {
  prevValues: Record<string, any>;
  values: Record<string, any>;
};

export const getValues = ({
  values,
  prevValues,
}: ParamsType): Record<string, any> => {
  return Object.keys(prevValues).reduce(
    (acc, name) => {
      const prevValue = prevValues[name];
      const value = values[name];

      // FormSpy deletes field if it is cleared
      // and we need to delete it value but save it
      if (name in prevValues && !(name in values)) {
        return {
          ...acc,
          [name]: typeof prevValue === 'string' ? '' : null,
        };
      }

      return {
        ...acc,
        [name]: value,
      };
    },
    {
      ...prevValues,
      ...values,
    },
  );
};
