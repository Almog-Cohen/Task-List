import { useFormik } from "formik";
import React from "react";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useHistory } from "react-router-dom";
import { login } from "./authSlice";
import { useSelector, useDispatch } from "react-redux";

import "./LoginPage.css";
import { validatePassword, validateEmail } from "../../utils/formValidations";

export function LoginPage() {
  const history = useHistory();
  const isLoading = useSelector((state) => state.auth.isLoading);
  const dispatch = useDispatch();

  // using formik for form state management, no need for redux here..
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate: (values) => {
      // returns error object, if empty then there are not errors and the form is valid
      return {
        ...validateEmail(values.email),
        ...validatePassword(values.password),
      };
    },
    onSubmit: (values) => {
      dispatch(login(values)).then(() => {
        history.push("/info");
      });
    },
  });

  return (
    <div className="login-page-component-container">
      <form onSubmit={formik.handleSubmit}>
        <Card elevation={10} className="login-card">
          <div className="card-content">
            <div className="card-input">
              <TextField
                error={formik.errors.email}
                helperText={formik.errors.email}
                fullWidth={true}
                required
                label="Email"
                name="email"
                placeholder="Enter Email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </div>

            <div className="card-input">
              <TextField
                required
                error={formik.errors.password}
                helperText={formik.errors.password}
                fullWidth={true}
                label="Password"
                name="password"
                placeholder="Enter Password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </div>

            <div className="card-input">
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                <Button
                  type="submit"
                  color="primary"
                  fullWidth={true}
                  variant="contained"
                  disabled={!formik.dirty || !formik.isValid}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </Card>
      </form>
    </div>
  );
}
