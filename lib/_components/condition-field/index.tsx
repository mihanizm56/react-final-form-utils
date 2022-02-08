import React, { memo, PropsWithChildren } from 'react';
import { Field } from 'react-final-form';
import { FormApi } from 'final-form';
import { isValueSelected } from './utils/is-value-selected';

type PropsType = PropsWithChildren<{
  fieldNameToTrack: string;
  fieldName: string;
  fieldValue?: any;
  customCondition?: ({ value, name }: { value: any; name: string }) => boolean;
  form: FormApi<any>;
}>;

export const ConditionField = memo(
  ({
    fieldValue,
    fieldName,
    children,
    customCondition,
    form,
    fieldNameToTrack,
  }: PropsType) => (
    <Field name={fieldNameToTrack} subscription={{ value: true }}>
      {({ input: { value } }) => {
        const isSelected = customCondition
          ? customCondition({ value, name: fieldNameToTrack })
          : isValueSelected({ selectedValue: fieldValue, fieldValue: value });

        // if (!isSelected) {
        //   form.change(fieldName, undefined);
        // }

        return isSelected ? children : null;
      }}
    </Field>
  ),
);
