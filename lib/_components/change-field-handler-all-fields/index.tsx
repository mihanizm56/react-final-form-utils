import React, { useState, useEffect } from 'react';
import { FormApi } from 'final-form';
import { FormSpy } from 'react-final-form';
import { BaseHandlerParamsType } from '@/_types';
import {
  getChangedObjectField,
  GetCompareFieldType,
} from './_utils/get-chaged-object-field';

export {
  getChangedObjectField,
  GetCompareFieldType,
} from './_utils/get-chaged-object-field';

export type ChangeFieldHandlerAllFieldsParamsType = BaseHandlerParamsType & {
  prevValue: any;
  errors?: Record<string, any>;
  formValues: Record<string, any>;
};
type ChangeFieldHandlerPropsType = {
  onChange: ({
    value,
    name,
    prevValue,
  }: ChangeFieldHandlerAllFieldsParamsType) => void;
  form?: FormApi<any>;
  disabled?: boolean;
  customCompareFunction?: GetCompareFieldType;
};

type HookPropsType = {
  callback: (params: ChangeFieldHandlerAllFieldsParamsType) => void;
  errors?: Record<string, any>;
  values: Record<string, any>;
  form?: FormApi<any>;
  disabled?: boolean;
  customCompareFunction?: GetCompareFieldType;
};

const InternalHook = ({
  values,
  callback,
  errors,
  form,
  disabled,
  customCompareFunction,
}: HookPropsType) => {
  const [prevValues, setPrevValues] = useState<Record<string, any>>({});

  useEffect(() => {
    const { name, value, prevValue } = customCompareFunction
      ? customCompareFunction({
          prevValues,
          values,
        })
      : getChangedObjectField({
          prevValues,
          values,
        });

    if (name) {
      setPrevValues(values);

      if (!disabled) {
        callback({
          name,
          value,
          prevValue,
          errors,
          error: errors ? errors[name] : null,
          form,
          formValues: values,
        });
      }
    }
  }, [
    callback,
    errors,
    prevValues,
    values,
    form,
    disabled,
    customCompareFunction,
  ]);

  return null;
};

export const ChangeFieldHandlerAllFields = ({
  onChange,
  form,
  disabled,
  customCompareFunction,
}: ChangeFieldHandlerPropsType) => (
  <FormSpy subscription={{ values: true, errors: true }}>
    {({ values, errors }) => (
      <InternalHook
        callback={onChange}
        customCompareFunction={customCompareFunction}
        disabled={disabled}
        errors={errors}
        form={form}
        values={values}
      />
    )}
  </FormSpy>
);
