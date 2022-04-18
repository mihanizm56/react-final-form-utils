// https://erikras.com/blog/focus-on-errors

export type ScrollToErrorOnFieldParamsType = {
  formErrors: Record<string, string>;
  fieldNameFormatter?: (fieldName: string) => string;
  timeoutToScroll?: number;
};

export const scrollToErrorOnField = ({
  formErrors,
  fieldNameFormatter,
  timeoutToScroll = 100,
}: ScrollToErrorOnFieldParamsType) => {
  const form = Array.from(document.forms[0]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const firstErrorFieldElement = form.find(({ name }) => {
    const fieldName = fieldNameFormatter?.(name) ?? name;

    return fieldName in formErrors;
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
