import { LoginForm, LogoutBtn, RegisterForm } from "@/features/auth";

function login() {
  return (
    <div className="grid place-items-center min-h-svh pt-20">
      <LoginForm />
    </div>
  );
}

export default login;
