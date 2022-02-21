import { FormApi } from 'final-form';
import React, { useState, useEffect } from 'react';
import { Field } from 'react-final-form';
import { BaseHandlerParamsType } from '@/_types';

export type ChangeFieldHandlerParamsType = BaseHandlerParamsType & {
  prevValue: any;
};

type ChangeFieldHandlerPropsType = {
  children: (params: ChangeFieldHandlerParamsType) => void;
  name: string;
  form?: FormApi<any>;
  disabled?: boolean;
};

type HookPropsType = {
  name: string;
  formValue: any;
  callback: (params: ChangeFieldHandlerParamsType) => void;
  error?: any;
  form?: FormApi<any>;
  disabled?: boolean;
};

const InternalHook = ({
  formValue,
  callback,
  name,
  error,
  form,
  disabled,
}: HookPropsType) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    if (value !== formValue) {
      setValue(formValue);

      if (!disabled) {
        callback({
          name,
          value: formValue,
          prevValue: value,
          error,
          form,
        });
      }
    }
  }, [callback, formValue, name, value, error, form, disabled]);

  return null;
};

export const ChangeFieldHandler = ({
  name,
  children,
  form,
  disabled,
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
