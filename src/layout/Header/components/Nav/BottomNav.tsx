import classNames from "classnames";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useParams } from "react-router-dom";

const BottomNav = () => {
  const { documentId } = useParams();
  const pathname = useLocation().pathname;
  const { t } = useTranslation();

  const homePaths = [`/`, `/${documentId}/segments`, `/correction`];
  const isHomePath = homePaths.includes(pathname);

  return isHomePath ? (
    <nav className="sticky top-0 z-10 w-full overflow-auto border-b border-slate-300/90 bg-white/70 p-2 px-6 backdrop-blur-lg">
      <ul className="flex items-center">
        {isHomePath && (
          <>
            <NavItem name={t("Documents")} path="/" />
            <NavItem name={t("Correction")} path="/correction" />
          </>
        )}
      </ul>
    </nav>
  ) : null;
};

interface NavItemProps {
  name: string;
  path: string;
}

const NavItem: React.FC<NavItemProps> = ({ name, path }) => {
  const pathname = useLocation().pathname;
  return (
    <li>
      <Link
        className={classNames("p-2 hover:bg-stone-100", {
          "text-stone-500": pathname !== path,
          "text-black": pathname === path,
        })}
        to={path}
      >
        {name}
      </Link>
    </li>
  );
};
export default BottomNav;
