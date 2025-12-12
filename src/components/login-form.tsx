"use client";
import { loginUser } from "@/services/auth/loginUser";
import { useActionState, useEffect, useRef } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  const handleAdminLogin = () => {
    if (emailRef.current) emailRef.current.value = "admin1@example.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };

  const handleUserLogin = () => {
    if (emailRef.current) emailRef.current.value = "mayesha@gmail.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };

  const handlePremiumUserLogin = () => {
    if (emailRef.current) emailRef.current.value = "soumyrhmn234@gmail.com";
    if (passwordRef.current) passwordRef.current.value = "123456";
  };

  return (
    <form action={formAction}>
      {redirect && <input type="hidden" name="redirect" value={redirect} />}

      <FieldGroup>
        <div className="grid grid-cols-1 gap-4">
          {/* Email */}
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="m@example.com"
              // leave uncontrolled — use ref to programmatically set value
              ref={emailRef}
            />

            <InputFieldError field="email" state={state} />
          </Field>

          {/* Password */}
          <Field>
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Enter your password"
              ref={passwordRef}
            />
            <InputFieldError field="password" state={state} />
          </Field>
        </div>

        <div className="flex gap-2 items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={handleAdminLogin}
            className="px-4 py-2 bg-[#A3BFFA] hover:bg-[#8FA8E6] text-[#1E293B] rounded-lg transition"
          >
            Admin Login
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handleUserLogin}
            className="px-4 py-2 bg-[#A7F3D0] hover:bg-[#86E3B3] text-[#1E293B] rounded-lg transition"
          >
            User Login
          </Button>

          <Button
            type="button"
            variant="ghost"
            onClick={handlePremiumUserLogin}
            className="px-4 py-2 bg-[#A7F3D0] hover:bg-[#86E3B3] text-[#1E293B] rounded-lg transition"
          >
            Premium User Login
          </Button>
        </div>

        <FieldGroup className="mt-4">
          <Field>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Logging in..." : "Login"}
            </Button>

            <FieldDescription className="px-6 text-center">
              Don&apos;t have an account?{" "}
              <a href="/register" className="text-blue-600 hover:underline">
                Sign up
              </a>
            </FieldDescription>
            <FieldDescription className="px-6 text-center">
              <a
                href="/forget-password"
                className="text-blue-600 hover:underline"
              >
                Forgot password?
              </a>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
