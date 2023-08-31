import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
const BottomNav = () => {
  const pathname = useLocation().pathname;

  const homePaths = ["/", "/usage"];
  const allPaths = homePaths;

  return (
    <>
      {allPaths.includes(pathname) && (
        <nav className="sticky top-0 z-10 w-full border-b border-slate-300/90 bg-white/70 p-2 px-6 backdrop-blur-lg">
          <ul className="flex items-center">
            {homePaths.includes(pathname) && (
              <>
                <li>
                  <Link
                    className={classNames("p-2 hover:bg-stone-100", {
                      "text-stone-500": pathname !== "/",
                      "text-black ": pathname === "/",
                    })}
                    to={"/"}
                  >
                    Collections
                  </Link>
                </li>
                <li>
                  <Link
                    className={classNames("p-2 hover:bg-stone-100", {
                      "text-stone-500": pathname !== "/usage",
                      "text-black ": pathname === "/usage",
                    })}
                    to={"/usage"}
                  >
                    Usage
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      )}
    </>
  );
};
export default BottomNav;
