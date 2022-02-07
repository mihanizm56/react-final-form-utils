import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';

export type ChangeFieldHandlerParamsType = {
  value: any;
  name: string;
  prevValue: any;
  error?: any;
};

type ChangeFieldHandlerPropsType = {
  children: ({ value, name, prevValue }: ChangeFieldHandlerParamsType) => void;
  name: string;
};

type HookPropsType = {
  name: string;
  formValue: any;
  callback: ({ value, name, prevValue }: ChangeFieldHandlerParamsType) => void;
  error?: any;
};

const InternalHook = ({ formValue, callback, name, error }: HookPropsType) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);
      callback({
        name,
        value: formValue,
        prevValue: value,
        error,
      });
    }
  }, [callback, formValue, name, value, error]);

  return null;
};

export const ChangeFieldHandler = ({
  name,
  children,
}: ChangeFieldHandlerPropsType) => (
  <Field name={name} subscription={{ value: true, error: true }}>
    {({ input: { value }, meta: { error } }) => (
      <InternalHook
        callback={children}
        error={error}
        formValue={value}
        name={name}
      />
    )}
  </Field>
);
