import React, { useMemo, useState } from "react";
import { Control, useController } from "react-hook-form";
import { TextInput, TextInputProps } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import FieldWrapper from "./FieldWrapper";

export interface DatePickerFieldProps extends TextInputProps {
  name: string;
  control: Control<any>;
}

export default function DatePickerField({
  name,
  control,
  disabled,
  editable,
  ...rest
}: DatePickerFieldProps) {
  const { field, fieldState } = useController({
    name,
    control,
    disabled,
  });

  const [open, setOpen] = useState(false);

  const formattedValue = useMemo(() => field.value
    ? new Intl.DateTimeFormat("pt-BR").format(new Date(field.value))
    : "", [field.value]);

  return (
    <FieldWrapper fieldState={fieldState}>
      {({ hasError }) => (
        <>
          <TextInput
            value={formattedValue}
            onPressIn={() => !disabled && editable && setOpen(true)}
            editable={false}
            disabled={disabled}
            error={hasError}
            {...rest}
          />

          <DatePickerModal
            locale="pt"
            mode="single"
            visible={open}
            date={field.value ? new Date(field.value) : undefined}
            onDismiss={() => setOpen(false)}
            onConfirm={({ date }) => {
              setOpen(false);
              field.onChange(date);
            }}
          />
        </>
      )}
    </FieldWrapper>
  );
}
