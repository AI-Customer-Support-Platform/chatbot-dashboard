import { Link } from "react-router-dom";

import svgFavicon from "@/assets/favicon.svg";
import SwitchLangButton from "@/components/buttons/SwitchLangButton";

import UserInfo from "./components/UserInfo.tsx/UserInfo";

const Header = () => {
  return (
    <nav className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-slate-300/90 bg-white/70 px-6 py-3 shadow backdrop-blur-lg">
      <section className="flex items-center gap-4">
        <Link to={"/"}>
          <img className="h-8 w-8" src={svgFavicon} alt="" />
        </Link>
      </section>
      <section className="flex gap-4">
        <SwitchLangButton />
        <UserInfo />
      </section>
    </nav>
  );
};
export default Header;
