import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

import { MenuIcon } from "../../icons";

import classes from './navbar.module.css'
import useGlobalState from "../../hooks/useGlobalState";

const Navbar = observer(() => {
  const state = useGlobalState();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
      <div className={classes.nav_container}>
        {state.user ? (
          <>
            <Link to="/home"><img src="/logo.png" style={{ width: 140, marginLeft: 20 }} /></Link>
            <MenuIcon style={{ color: "#fff", width: 40, marginRight: 20, cursor: "pointer" }} onClick={toggleMenu} />
            {menuOpen && (
              <>
              <div className={classes.backdrop} onClick={toggleMenu}></div>
              <div
                className={classes.menu}
              >
                <Link to="/home" onClick={toggleMenu}>
                  <div className={state.url?.pathname == '/home' ? classes.active : ''}>Home</div>
                </Link>
                <Link to="/profile" onClick={toggleMenu}>
                  <div className={state.url?.pathname == '/profile' ? classes.active : ''}>Profile</div>
                </Link>
                <div onClick={() => {toggleMenu();state.logout()}}>Logout</div>
              </div>
              </>
            )}
          </>
        ) : (
          <>
            <Link to="/"><img src="/logo-full.svg" style={{ width: 140, marginLeft: 20 }} /></Link>
            <div></div>
          </>
        )}
      </div>
  );
});
export default Navbar;
