import { FormApi } from 'final-form';
import React, { useState, useEffect } from 'react';
import { FormSpy } from 'react-final-form';
import { getChangedField } from './_utils/get-cahged-field';

export type ChangeFieldHandlerAllFieldsParamsType = {
  value: any;
  name: string;
  prevValue: any;
  errors?: Record<string, any>;
  form?: FormApi<Record<string, any>>;
};

type ChangeFieldHandlerPropsType = {
  onChange: ({
    value,
    name,
    prevValue,
  }: ChangeFieldHandlerAllFieldsParamsType) => void;
  form?: FormApi<Record<string, any>>;
};

type HookPropsType = {
  callback: ({ value, name }: ChangeFieldHandlerAllFieldsParamsType) => void;
  errors?: Record<string, any>;
  values: Record<string, any>;
  form?: FormApi<Record<string, any>>;
};

const InternalHook = ({ values, callback, errors, form }: HookPropsType) => {
  const [prevValues, setPrevValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const { name, value, prevValue } = getChangedField({ prevValues, values });

    if (name) {
      setPrevValues(values);

      callback({
        name,
        value,
        prevValue,
        errors,
        form,
      });
    }
  }, [callback, errors, prevValues, values, form]);

  return null;
};

export const ChangeFieldHandlerAllFields = ({
  onChange,
  form,
}: ChangeFieldHandlerPropsType) => (
  <FormSpy subscription={{ values: true, errors: true }}>
    {({ values, errors }) => (
      <InternalHook
        callback={onChange}
        errors={errors}
        form={form}
        values={values}
      />
    )}
  </FormSpy>
);
