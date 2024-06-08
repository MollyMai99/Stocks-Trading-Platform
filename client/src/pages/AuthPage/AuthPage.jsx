import LoginForm from "../../components/Auth/LoginForm";
import SignUpForm from "../../components/Auth/SignUpForm";
import { useNavigate } from "react-router-dom";

export default function AuthPage({ setUser }) {
  const navigate = useNavigate();

  const handleSetUser = (user) => {
    setUser(user);
    if (user.role === "admin") {
      navigate("/admin/pending-users");
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <LoginForm setUser={handleSetUser} />
      <SignUpForm setUser={handleSetUser} />
    </>
  );
}
