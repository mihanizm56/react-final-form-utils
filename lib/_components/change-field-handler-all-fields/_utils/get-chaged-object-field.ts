import isEqual from 'deep-equal';

type ParamsType = {
  prevValues: Record<string, any>;
  values: Record<string, any>;
};

type OutputType = { name: string; value: any; prevValue: any };

export type GetCompareFieldType = (params: ParamsType) => OutputType;

export const getChangedObjectField: GetCompareFieldType = ({
  prevValues,
  values,
}) => {
  return Object.keys(values).reduce(
    (acc: OutputType, name): OutputType => {
      if (Boolean(acc.name)) {
        return acc;
      }

      const prevValue = prevValues[name];
      const value = values[name];

      if (!isEqual(value, prevValue)) {
        return {
          name,
          value,
          prevValue,
        };
      }

      return acc;
    },
    { name: '', value: null, prevValue: null },
  );
};
