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
};
