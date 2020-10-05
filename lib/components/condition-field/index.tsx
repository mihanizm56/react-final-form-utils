import React, { PropsWithChildren } from 'react';
import { Field } from 'react-final-form';

type PropsType = PropsWithChildren<{ when: string; is: any }>;

export const ConditionField = ({ when, is, children }: PropsType) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
);
