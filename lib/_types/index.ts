import { FormApi } from 'final-form';

export type BaseHandlerParamsType = {
  value: any;
  name: string;
  form?: FormApi<Record<string, any>>;
  error?: any;
};
