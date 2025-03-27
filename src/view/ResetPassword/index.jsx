import * as yup from "yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
});

const ResetPassword = () => {
  const {
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
    resolver: yupResolver(validationSchema),
  });

  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://your-api.com/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Password reset link sent to your email.");
        reset();
      } else {
        setMessage("Failed to send reset email. Try again.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "85vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          padding: "40px 20px",
          width: "600px",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginBottom: 2,
            mt: 2,
          }}
        >
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Box flex={1}>
                <InputLabel>Enter Your Email</InputLabel>
                <TextField
                  {...field}
                  value={watch("email") || ""}
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Box>
            )}
          />
        </Box>

        {message && (
          <Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
            {message}
          </Typography>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: "40px" }}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
