import { useCallback, useState } from "react";
import { INITIAL_FORM_DATA, type FormData, type FormErrors } from "./types";
import { isValid, validate } from "./validation";

interface UseRegistrationFormReturn {
  // State
  formData: FormData;
  errors: FormErrors;
  hasSubmitted: boolean;
  submittedData: FormData | null;

  // Actions
  handleChange: (field: keyof FormData, value: string) => void;
  handleSubmit: () => void;
  handleReset: () => void;
}

export function useRegistrationForm(): UseRegistrationFormReturn {
  // State
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<FormErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData | null>(null);

  const handleChange = useCallback(
    (field: keyof FormData, value: string) => {
      setFormData((prev) => {
        const next = { ...prev, [field]: value };

        if (hasSubmitted) {
          setErrors(validate(next));
        }

        return next;
      });
    },
    [hasSubmitted],
  );

  const handleSubmit = useCallback(() => {
    setHasSubmitted(true);

    const validationErrors = validate(formData);
    setErrors(validationErrors);

    if (isValid(validationErrors)) {
      setSubmittedData({ ...formData });
    } else {
      setSubmittedData(null);
    }
  }, [formData]);

  const handleReset = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setErrors({});
    setHasSubmitted(false);
    setSubmittedData(null);
  }, [])

  return {
    formData,
    errors,
    hasSubmitted,
    submittedData,
    handleChange,
    handleSubmit,
    handleReset
  };
}
