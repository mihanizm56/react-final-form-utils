import { AnyObject } from 'final-form';
import React, { Component } from 'react';
import { FormSpy, FormSpyRenderProps } from 'react-final-form';

// https://codesandbox.io/s/react-final-form-auto-save-on-field-blur-forked-5p6u8?file=/AutoSave.js:0-1592

export type BlurFieldHandlerParamsType = {
  value: any;
  name: string;
  errors: Record<string, any>;
};

type WrappedComponentPropsType = BlurFieldHandlerPropsType &
  FormSpyRenderProps<AnyObject>;

type BlurFieldHandlerPropsType = {
  handleBlur: (params: BlurFieldHandlerParamsType) => void;
};

class WrappedComponent extends Component<WrappedComponentPropsType> {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillReceiveProps(nextProps: any) {
    if (this.props.active && this.props.active !== nextProps.active) {
      // blur occurred
      this.save(this.props.active);
    }
  }

  save = async (fieldName: string) => {
    const value = this.props.values[fieldName];

    this.props.handleBlur({
      name: fieldName,
      value,
      errors: this.props.errors,
    });
  };

  render() {
    // This component doesn't have to render anything, but it can render
    // submitting state.
    return null;
  }
}

// Make a HOC
// This is not the only way to accomplish auto-save, but it does let us:
// - Use built-in React lifecycle methods to listen for changes
// - Maintain state of when we are submitting
// - Render a message when submitting
// - Pass in save prop nicely
export const BlurFieldHandler = (props: BlurFieldHandlerPropsType) => {
  return (
    <FormSpy
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
      component={(componentProps) => {
        return (
          // eslint-disable-next-line react/jsx-props-no-spreading
          <WrappedComponent {...componentProps} handleBlur={props.handleBlur} />
        );
      }}
      subscription={{ active: true, values: true, errors: true }}
    />
  );
};
