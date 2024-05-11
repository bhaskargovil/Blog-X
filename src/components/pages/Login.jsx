import React, { useState } from "react";
import Logo from "../elements/Logo";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../../store/authSlice";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";
import Button from "../elements/Button";
import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth_service";

function Login() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSubmitHandler = async (data) => {
    setError("");

    try {
      const session = await authService.login(data); // sending the data to db
      if (session) {
        const userData = await authService.getCurrentUser(); // getting that data back from the db to display current user details to the user
        if (userData) {
          dispatch(authLogin(userData));
        } // storing in the reducer (global variable type) to display it everywhere
        navigate("/"); // going to home page
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="py-8">
      <div className="flex items-center justify-center w-full">
        <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
          <div className="mb-2 flex justify-center">
            {/* Logo placing on the header */}
            <span className="inline-block w-full max-w-[100px]">
              <Logo width="100%" />
            </span>
          </div>
          {/* heading before the login form */}
          <h2 className="text-center text-2xl font-bold leading-tight">
            Sign in to your account
          </h2>

          <p className="mt-2 text-center text-base text-black/60">
            Don&apos;t have any account?&nbsp;
            <Link
              to={"/signup"}
              className="font-medium text-primary transition-all duration-200 hover:underline"
            >
              Sign up
            </Link>
          </p>

          {error ? (
            <p className="text-red-600 mt-8 text-center">{error}</p>
          ) : null}

          <form onSubmit={handleSubmit(loginSubmitHandler)} className="mt-8">
            <div className="space-y-5">
              {/* Email input */}
              <Input
                label="Email: "
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Enter valid email address",
                  },
                })}
              />

              {/* Password form */}
              <Input
                label="Password: "
                placeholder="Enter your password"
                type="password"
                {...register("password", {
                  required: true,
                })}
              />

              {/* submit button */}
              <Button type="submit" className="w-full">
                Log in
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
