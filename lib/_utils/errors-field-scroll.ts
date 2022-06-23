// https://erikras.com/blog/focus-on-errors

export type ICustomCheckIsErrorField = (params: {
  name: string;
  formErrors: Record<string, string>;
}) => boolean;

export type ScrollToErrorOnFieldParamsType = {
  formErrors: Record<string, string>;
  fieldNameFormatter?: (fieldName: string) => string;
  timeoutToScroll?: number;
  customCheckIsErrorField?: ICustomCheckIsErrorField;
};

export const scrollToErrorOnField = ({
  formErrors,
  fieldNameFormatter,
  timeoutToScroll = 100,
  customCheckIsErrorField,
}: ScrollToErrorOnFieldParamsType) => {
  if (!formErrors) {
    // eslint-disable-next-line no-console
    console.warn('formErrors in scrollToErrorOnField is empty!');

    return;
  }

  try {
    const form = Array.from(document.forms[0]);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const firstErrorFieldElement = form.find(({ name }) => {
      const fieldName = fieldNameFormatter?.(name) ?? name;

      return (
        customCheckIsErrorField?.({
          name,
          formErrors,
        }) ?? Boolean(formErrors[fieldName])
      );
    }) as HTMLElement;

    if (firstErrorFieldElement) {
      setTimeout(() => {
        firstErrorFieldElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });

        firstErrorFieldElement.focus({ preventScroll: true });
      }, timeoutToScroll);
    }
  } catch (error) {
    console.error('error in scrollToErrorOnField', error);
  }
};

export const createScrollToErrorOnField =
  (params: Omit<ScrollToErrorOnFieldParamsType, 'formErrors'>) =>
  ({ formErrors }: { formErrors: Record<string, string> }) =>
    scrollToErrorOnField({
      ...params,
      formErrors,
    });
