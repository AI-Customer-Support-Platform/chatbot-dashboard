import svgFavicon from "@/assets/favicon.svg";
import ConfigButton from "@/components/buttons/ConfigButton";
import SwitchLangButton from "@/components/buttons/SwitchLangButton";

const TopNav = () => {
  return (
    <nav className="top-0 z-10 flex w-full items-center justify-between gap-5 border-b bg-white px-6 py-3">
      <section className="flex items-center gap-4">
        <img className="h-8 w-8" src={svgFavicon} alt="" />
      </section>
      <section className="flex gap-4">
        <ConfigButton />
        <SwitchLangButton />
      </section>
    </nav>
  );
};
export default TopNav;
