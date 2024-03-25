import { NavLink } from "react-router-dom";
import LoginButton from "./LoginButton";

export default function Navbar() {

  return (
    <div>
      <nav className="flex justify-between items-center mb-6">
        <NavLink to="/">
          <img alt="Online Scheduler" className="h-12 inline" src="/main-logo.jpeg"></img>
        </NavLink>

        <LoginButton/>
      </nav>
    </div>
  );
}
