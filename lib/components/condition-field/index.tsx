import React, { PropsWithChildren } from 'react';
import { Field } from 'react-final-form';
import { isValueSelected } from './utils/is-value-selected';

type PropsType = PropsWithChildren<{
  fieldName: string;
  fieldValue?: any;
  customCondition?: ({ value, name }: { value: any; name: string }) => boolean;
}>;

export const ConditionField = ({
  fieldName,
  fieldValue,
  children,
  customCondition,
}: PropsType) => (
  <Field name={fieldName} subscription={{ value: true }}>
    {({ input: { value } }) => {
      const isSelected = customCondition
        ? customCondition({ value, name: fieldName })
        : isValueSelected({ selectedValue: fieldValue, fieldValue: value });

      return isSelected ? children : null;
    }}
  </Field>
);
