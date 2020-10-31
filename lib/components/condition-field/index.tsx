import React, { memo, PropsWithChildren } from 'react';
import { Field } from 'react-final-form';
import classnames from 'classnames/bind';
import { CSSTransition } from 'react-transition-group';
import { FormApi } from 'final-form';
import { isValueSelected } from './utils/is-value-selected';
import styles from './index.module.scss';

type PropsType = PropsWithChildren<{
  fieldNameToTrack: string;
  fieldName: string;
  isAnimated?: boolean;
  fieldValue?: any;
  customCondition?: ({ value, name }: { value: any; name: string }) => boolean;
  form: FormApi<any>;
}>;

const BLOCK_NAME = 'Animated-field';
const cn = classnames.bind(styles);

const TIMEOUT_OPEN = 300;

export const ConditionField = memo(
  ({
    fieldValue,
    fieldName,
    children,
    customCondition,
    isAnimated,
    form,
    fieldNameToTrack,
  }: PropsType) => (
    <Field name={fieldNameToTrack} subscription={{ value: true }}>
      {({ input: { value } }) => {
        const isSelected = customCondition
          ? customCondition({ value, name: fieldNameToTrack })
          : isValueSelected({ selectedValue: fieldValue, fieldValue: value });

        if (!isSelected) {
          form.change(fieldName, undefined);
        }

        if (isAnimated) {
          return (
            <CSSTransition
              classNames={{
                enter: cn(`${BLOCK_NAME}--enter`),
                exit: cn(`${BLOCK_NAME}--exit`),
              }}
              in={isSelected}
              timeout={TIMEOUT_OPEN}
              unmountOnExit
            >
              {children}
            </CSSTransition>
          );
        }

        return isSelected ? children : null;
      }}
    </Field>
  ),
);
