/* eslint-disable react/jsx-props-no-spreading */
import { AnyObject, FormApi } from 'final-form';
import React, { Component } from 'react';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';
import { BaseHandlerParamsType } from '@/_types';

// taken from
// https://codesandbox.io/s/react-final-form-auto-save-on-field-blur-forked-5p6u8?file=/AutoSave.js:0-1592

export type BlurFieldHandlerParamsType = BaseHandlerParamsType & {
  errors: Record<string, any>;
  formValues: Record<string, any>;
};

type WrappedComponentPropsType = BlurFieldHandlerPropsType &
  FormSpyRenderProps<AnyObject>;

type BlurFieldHandlerPropsType = {
  handleBlur: (params: BlurFieldHandlerParamsType) => void;
  form?: FormApi<any>;
  disabled?: boolean;
};

class WrappedComponent extends Component<WrappedComponentPropsType> {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (this.props.active && this.props.active !== nextProps.active) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.onBlurField(this.props.active);
    }
  }

  onBlurField = async (fieldName: string) => {
    const { values: formValues, errors } = this.props;

    if (!this.props.disabled) {
      this.props.handleBlur({
        name: fieldName,
        value: formValues[fieldName],
        error: errors ? errors[fieldName] : null,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        errors,
        formValues,
        form: this.props.form,
      });
    }
  };

  render() {
    return null;
  }
}

export const BlurFieldHandler = (props: BlurFieldHandlerPropsType) => {
  return (
    <FormSpy
      {...props}
      component={(componentProps) => {
        return (
          <WrappedComponent
            {...componentProps}
            disabled={props.disabled}
            handleBlur={props.handleBlur}
          />
        );
      }}
      subscription={{ active: true, values: true, errors: true }}
    />
  );
};
