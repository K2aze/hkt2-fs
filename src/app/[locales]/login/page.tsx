import { LoginForm, LogoutBtn, RegisterForm } from "@/features/auth";

function login() {
  return (
    <div>
      <RegisterForm />

      <LoginForm />

      <LogoutBtn />
    </div>
  );
}

export default login;
