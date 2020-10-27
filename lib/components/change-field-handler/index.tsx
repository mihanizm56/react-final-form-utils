import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';

type ChangeFieldHandlerPropsType = {
  children: ({ value, name }: { value: any; name: string }) => void;
  name: string;
};

type HookPropsType = {
  name: string;
  formValue: any;
  callback: ({
    value,
    name,
    prevValue,
  }: {
    value: any;
    name: string;
    prevValue: any;
  }) => void;
};

const InternalHook = ({ formValue, callback, name }: HookPropsType) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);
      callback({
        name,
        value: formValue,
        prevValue: value,
      });
    }
  }, [callback, formValue, name, value]);

  return null;
};

export const ChangeFieldHandler = ({
  name,
  children,
}: ChangeFieldHandlerPropsType) => (
  <Field name={name} subscription={{ value: true }}>
    {({ input: { value } }) => (
      <InternalHook formValue={value} callback={children} name={name} />
    )}
  </Field>
);
