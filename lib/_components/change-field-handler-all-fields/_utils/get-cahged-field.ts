type ParamsType = {
  prevValues: Record<string, any>;
  values: Record<string, any>;
};

type OutputType = { name: string; value: any; prevValue: any };

export const getChangedField = ({
  prevValues,
  values,
}: ParamsType): OutputType => {
  return Object.keys(values).reduce(
    (acc: OutputType, valueKey): OutputType => {
      if (Boolean(acc.name)) {
        return acc;
      }

      const prevValue = prevValues[valueKey];
      const value = values[valueKey];

      if (value !== prevValue) {
        return {
          name: valueKey,
          value,
          prevValue,
        };
      }

      return acc;
    },
    { name: '', value: null, prevValue: null },
  );
};
