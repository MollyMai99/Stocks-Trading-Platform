import LoginForm from "../../components/Auth/LoginForm";
import SignUpForm from "../../components/Auth/SignUpForm";

export default function AuthPage({ setUser }) {
  return (
    <>
      <LoginForm setUser={setUser} />
      <SignUpForm setUser={setUser} />
    </>
  );
}
