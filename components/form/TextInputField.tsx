import React from "react";
import { Control, useController } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native-paper";

import FieldWrapper from "./FieldWrapper";

export interface TextInputFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
  caption?: string;
}

export default function TextInputField({
  name,
  control,
  caption,
  disabled,
  onChangeText,
  ...rest
}: TextInputFieldProps) {
  const { field, fieldState } = useController({
    name,
    control,
    disabled,
  });

  return (
    <FieldWrapper fieldState={fieldState}>
      {({ hasError }) => (
        <>
          <TextInput
            value={field.value}
            onChangeText={field.onChange}
            onBlur={field.onBlur}
            disabled={disabled}
            error={hasError}
            {...rest}
          />
        </>
      )}
    </FieldWrapper>
  );
}
