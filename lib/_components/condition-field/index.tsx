import React, { memo, PropsWithChildren } from 'react';
import { Field } from 'react-final-form';

export type CustomConditionParamsType = { value: any; name: string };
export type CustomConditionType = ({
  value,
  name,
}: CustomConditionParamsType) => boolean;

type PropsType = PropsWithChildren<{
  fieldNameToTrack: string;
  customCondition?: CustomConditionType;
  hidden?: boolean;
}>;

export const ConditionField = memo(
  ({ children, customCondition, fieldNameToTrack, hidden }: PropsType) => (
    <Field name={fieldNameToTrack} subscription={{ value: true }}>
      {({ input: { value } }) => {
        if (hidden) {
          return null;
        }

        if (customCondition) {
          const isShown = customCondition({ value, name: fieldNameToTrack });

          return isShown ? children : null;
        }

        return children;
      }}
    </Field>
  ),
);
