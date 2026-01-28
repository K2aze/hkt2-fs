"use client";
import { useForm } from "@tanstack/react-form-nextjs";
import { registerSchema, RegisterSchema } from "@/lib/validations";
import { http } from "@/lib/http";
import { useAuth } from "@/providers/AuthContext";
const RegisterForm = () => {
  const { checkAuth } = useAuth();
  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
      fullName: "",
      email: "",
      phoneNumber: "",
    } as RegisterSchema,

    onSubmit: async ({ value }) => {
      console.log("Form data: ", value);
      console.log("submited");
      try {
        await http.post("/auth/register", value);
        await checkAuth();
      } catch (error: unknown) {
        console.log(error);
      }
    },
  });
  return (
    <div>
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

        <form.Field
          name="fullName"
          validators={{
            onChange: registerSchema.shape.fullName,
          }}
        >
          {(field) => (
            <>
              <label htmlFor={field.name}>Full name</label>
              <input
                id={field.name}
                name={field.name}
                value={field.state.value}
                type="text"
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

        <div>
          <form.Field
            name="email"
            validators={{ onChange: registerSchema.shape.email }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Email</label>
                <input
                  type="email"
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
            name="phoneNumber"
            validators={{ onChange: registerSchema.shape.phoneNumber }}
          >
            {(field) => (
              <>
                <label htmlFor={field.name}>Phone number</label>
                <input
                  type="tel"
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
              {isSubmitting ? "Loading" : "Register"}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default RegisterForm;
