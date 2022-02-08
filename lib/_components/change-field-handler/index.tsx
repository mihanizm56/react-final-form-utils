import { FormApi } from 'final-form';
import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';

export type ChangeFieldHandlerParamsType = {
  value: any;
  name: string;
  prevValue: any;
  error?: any;
  form?: FormApi<Record<string, any>>;
};

type ChangeFieldHandlerPropsType = {
  children: (params: ChangeFieldHandlerParamsType) => void;
  name: string;
  form?: FormApi<Record<string, any>>;
};

type HookPropsType = {
  name: string;
  formValue: any;
  callback: (params: ChangeFieldHandlerParamsType) => void;
  error?: any;
  form?: FormApi<Record<string, any>>;
};

const InternalHook = ({
  formValue,
  callback,
  name,
  error,
  form,
}: HookPropsType) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);

      callback({
        name,
        value: formValue,
        prevValue: value,
        error,
        form,
      });
    }
  }, [callback, formValue, name, value, error, form]);

  return null;
};

export const ChangeFieldHandler = ({
  name,
  children,
  form,
}: ChangeFieldHandlerPropsType) => (
  <Field name={name} subscription={{ value: true, error: true }}>
    {({ input: { value }, meta: { error } }) => (
      <InternalHook
        callback={children}
        error={error}
        form={form}
        formValue={value}
        name={name}
      />
    )}
  </Field>
);
