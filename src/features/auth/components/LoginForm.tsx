"use client";
import { useForm } from "@tanstack/react-form-nextjs";
import { LoginSchema, registerSchema } from "@/lib/validations";
import { http } from "@/lib/http";
import { useState } from "react";
import { useAuth } from "@/providers/AuthContext";
const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { checkAuth } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    } as LoginSchema,

    onSubmit: async ({ value }) => {
      console.log("Form data: ", value);
      console.log("submited");
      try {
        await http.post("/auth/login", value);
        await checkAuth();
      } catch (error) {
        console.log(error);
        setServerError("username or password not match");
      }
    },
  });
  return (
    <div>
      {serverError && <em>{serverError}</em>}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <div>
          <form.Field
            name="username"
            validators={{
              onChange: registerSchema.shape.username,
            }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Username</label>
                <input
                  type="text"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <div>
          <form.Field
            name="password"
            validators={{ onChange: registerSchema.shape.password }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Password</label>
                <input
                  type="password"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />

                {field.state.meta.errors?.length > 0 && (
                  <span className="text-red-500 text-sm mt-1 block">
                    {field.state.meta.errors.map((err, idx) => (
                      <em key={idx} role="alert">
                        {err?.message ||
                          (typeof err === "string"
                            ? err
                            : JSON.stringify(err) || "unknown")}
                      </em>
                    ))}
                  </span>
                )}
              </>
            )}
          </form.Field>
        </div>

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            >
              {isSubmitting ? "Loading" : "Login"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default LoginForm;
