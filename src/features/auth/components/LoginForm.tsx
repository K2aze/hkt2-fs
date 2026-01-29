"use client";
import { useForm } from "@tanstack/react-form-nextjs";
import { LoginSchema, registerSchema } from "@/lib/validations";
import { http } from "@/lib/http";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/AuthContext";
import { User, Loader2, Lock } from "lucide-react";
import { useRouter } from "@/lib/i18n/navigation";
const LoginForm = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const { checkAuth, user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    router.replace("/");
  });
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
        router.replace("/");
      } catch (error) {
        console.log(error);
        setServerError("username or password not match");
      }
    },
  });
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Login
      </h2>

      {serverError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm">
          {serverError}
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-5"
      >
        {/* Username */}
        <form.Field
          name="username"
          validators={{
            onChange: registerSchema.shape.username,
          }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <User size={18} />
                Username
              </label>
              <div className="relative">
                <input
                  type="text"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 transition"
                  placeholder="Joe9321"
                />
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>

              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
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
            </div>
          )}
        </form.Field>

        {/* Password */}
        <form.Field
          name="password"
          validators={{ onChange: registerSchema.shape.password }}
        >
          {(field) => (
            <div className="space-y-1">
              <label
                htmlFor={field.name}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                <Lock size={18} />
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-900 transition"
                  placeholder="***************"
                />
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
              </div>

              {field.state.meta.errors?.length > 0 && (
                <span className="text-red-600 text-sm mt-1 block">
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
            </div>
          )}
        </form.Field>

        {/* Submit Button */}
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
        >
          {([canSubmit, isSubmitting]) => (
            <button
              type="submit"
              disabled={!canSubmit || isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Đang xử lý...
                </>
              ) : (
                "Login"
              )}
            </button>
          )}
        </form.Subscribe>
      </form>
    </div>
  );
};

export default LoginForm;
