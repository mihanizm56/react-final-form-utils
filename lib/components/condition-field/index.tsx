import React, { PropsWithChildren } from 'react';
import { Field } from 'react-final-form';
import { isValueSelected } from './utils/is-value-selected';

type PropsType = PropsWithChildren<{ when: string; is: any }>;

export const ConditionField = ({ when, is, children }: PropsType) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => {
      const isSelected = isValueSelected({ value, is });

      return isSelected ? children : null;
    }}
  </Field>
);
