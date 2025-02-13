import React from "react";
import {Link} from "react-router-dom"

function Header() {
  return (
    <div className="flex justify-between items-center w-full px-5">
      <Link
        to="/"
        className="text-white text-center text-3xl font-[Courgette] my-2 cursor-pointer"
      >
        Socialize
      </Link>
      <Link to='/profile'>Sreejith U</Link>
    </div>
  );
}

export default Header;
