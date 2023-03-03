import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { toast } from "react-hot-toast";

import Input from "../components/inputs/input";
import Button from "../components/inputs/button";

import { emailRegex, invalidPassword } from "../utils";
import { useGlobalState } from "../hooks";

const SigninPage = observer(() => {
  const state = useGlobalState();
  const history = useHistory();
  const [creds, setCreds] = useState({ email: "", password: "" });
  const [error, setError] = useState({ email: "", password: "" });

  useEffect(() => {
    if (history && state.user) {
      history.push("/home");
    }
  }, [history, state.user]);

  const handleChange =
    (prop: string) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (prop == "password") {
        setError({ ...error, password: invalidPassword(e.target.value) });
      } else if (prop == "email") {
        const err = emailRegex.test(e.target.value)
          ? ""
          : "Invalid Email Address";
        setError({ ...error, email: err });
      }
      setCreds({ ...creds, [prop]: e.target.value });
    };

  const signin = () => {
    if (
      Object.values(error).some((el) => !!el) ||
      Object.values(creds).some((el) => !el)
    ) {
      return toast.error("Please fill in all the fields correctly", {
        id: "err",
      });
    }
    state.signin(creds);
  };
  
  return (
    <>
      <div className="dialog" style={{ minWidth: 240 }}>
        <h1>Sign In</h1>
        <Input
          label="Email"
          type="email"
          containerStyle={{ width: "100%" }}
          value={creds.email}
          onChange={handleChange("email")}
          error={!!error.email}
          helperText={error.email}
        />
        <Input
          label="Password"
          type="password"
          containerStyle={{ width: "100%" }}
          value={creds.password}
          onChange={handleChange("password")}
          error={!!error.password}
          helperText={error.password}
          onKeyUp={({ key }) => {if (key === "Enter")signin()}}
        />
        <Button style={{ width: "100%" }} onClick={signin}>
          Log In
        </Button>
      </div>
    </>
  );
});

export default SigninPage;
