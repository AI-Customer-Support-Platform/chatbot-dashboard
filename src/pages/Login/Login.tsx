import svgLogo from "@/assets/imgs/svgs/logo.svg";
import { useAuth0 } from "@auth0/auth0-react";

const Login = () => {
  const { loginWithRedirect } = useAuth0();
  const handleClickLogin = () => {
    loginWithRedirect();
  };
  return (
    <main className="h-screen bg-[#f8f9fa] bg-gradient-to-b from-white to-slate-200">
      <section className="flex h-full items-center justify-center">
        <div className="flex flex-col items-center gap-10 sm:flex-row">
          <img className="w-64" src={svgLogo} />
          <button
            onClick={handleClickLogin}
            className="rounded bg-red-500/80 px-4 py-2 text-lg font-bold text-white hover:scale-105 hover:bg-red-500/90 active:scale-110 "
          >
            Login
          </button>
        </div>
      </section>
    </main>
  );
};
export default Login;
