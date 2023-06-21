import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-40 h-20 w-full border-b px-2 backdrop-blur">
      <Link to="/">Header</Link>
    </header>
  );
};
export default Header;
