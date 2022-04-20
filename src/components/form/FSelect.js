import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export default function FSelect({ name, children, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
          inputProps={{
            style: {
              backgroundColor: "white",
              color: "green",
            },
          }}
        >
          {children}
        </TextField>
      )}
    />
  );
}
