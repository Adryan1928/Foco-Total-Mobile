import React from "react";
import { Control, useController } from "react-hook-form";
import { Checkbox } from "react-native-paper";

import FieldWrapper from "./FieldWrapper";
import { Text, TouchableOpacity } from "react-native";

export interface CheckboxFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
}

export default function CheckboxField({
  name,
  control,
  label,
  disabled,
}: CheckboxFieldProps) {
  const { field, fieldState } = useController({
    name,
    control,
    disabled,
  });

  const isChecked = field.value === "completed" || field.value === true;

  return (
    <FieldWrapper fieldState={fieldState}>
      {({ hasError }) => (
        <TouchableOpacity
          onPress={() => !disabled && field.onChange(!isChecked)}
          activeOpacity={0.8}
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Checkbox.Android
            status={isChecked ? "checked" : "unchecked"}
            onPress={() => !disabled && field.onChange(!isChecked)}
            disabled={disabled}
          />

          {label && (
            <Text style={{ color: hasError ? "#B00020" : "#000" }}>
              {label}
            </Text>
          )}
        </TouchableOpacity>
      )}
    </FieldWrapper>
  );
}
