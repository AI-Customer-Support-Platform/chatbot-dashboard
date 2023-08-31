import { Link } from "react-router-dom";
import svgFavicon from "@/assets/favicon.svg";
import SwitchLangButton from "@/components/buttons/SwitchLangButton";
import UserInfo from "../UserInfo.tsx/UserInfo";

const TopNav = () => {
  return (
    <nav className="top-0 z-10 flex w-full items-center justify-between gap-5 px-6 py-3">
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
export default TopNav;
