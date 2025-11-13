import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useUser } from "@/hooks/useUser";
import { SiAuth0 } from "react-icons/si";
import SocialLoginButton from "@/components/auth/SocialLoginButton";

/**
 * Renders the login page with multiple social login options:
 * - Auth0
 * - Google
 * - GitHub
 *
 * Provides a button to sign up if the user does not have an account.
 */
const LoginPage: React.FC = () => {
  const { login } = useUser();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-center">Welcome</h1>
        <span className="text-black-600 text-sm text-center mb-2">Log in to Todo App to continue</span>

        <SocialLoginButton
          icon={<SiAuth0 size={22} color="#EB5424" />}
          label="Login with Auth0"
          onClick={() => login({ screenHint: "login" })}
        />

        <SocialLoginButton
          icon={<FcGoogle size={22} />}
          label="Login with Google"
          onClick={() => login({ connection: "google-oauth2" })}
        />

        <SocialLoginButton
          icon={<FaGithub size={22} />}
          label="Login with GitHub"
          onClick={() => login({ connection: "GitHub" })}
        />

        <div className="text-center">
          <span className="text-gray-600 text-sm">Don't have an account? </span>
          <button
            onClick={() => login({ screenHint: "signup" })}
            className="text-blue-600 hover:underline font-semibold cursor-pointer"
          >
            Sign up with Auth0
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;