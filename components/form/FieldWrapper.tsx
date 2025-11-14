import React from "react";
import { ControllerFieldState } from "react-hook-form";
import { StyleSheet, View, ViewProps } from "react-native";
import { HelperText } from "react-native-paper";

type RenderProp = ({ hasError }: { hasError: boolean }) => React.ReactNode;

interface Props {
  fieldState: ControllerFieldState;
  style?: ViewProps["style"];
  children: React.ReactNode | RenderProp;
}

export default function FieldWrapper({
  fieldState,
  style,
  children,
}: Props) {
  const { error } = fieldState;
  const hasError = error !== undefined;

  return (
    <View style={[styles.container, style]}>
      {typeof children === "function" ? children({ hasError }) : children}

      {hasError && (
        <HelperText type="error" visible>
          {error?.message}
        </HelperText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 8,
  },
});
