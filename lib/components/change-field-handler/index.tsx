import React from 'react';
import { Field } from 'react-final-form';

type PropsType = {
  children: ({ value, name }: { value: any; name: string }) => void;
  name: string;
};

export const ChangeFieldHandler = ({ name, children }: PropsType) => (
  <Field name={name} subscription={{ value: true }}>
    {({ input: { value } }) => {
      children({
        name,
        value,
      });

      return null;
    }}
  </Field>
);
