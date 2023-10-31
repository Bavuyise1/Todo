import { NavLink, Link } from "react-router-dom";

const Navbar = () => {
    return(
        <nav>
            <div className="logo">
                <Link to="/about">
                    <h1>Logo</h1>
                </Link>
            </div>
            <ul>
                <li>
                    <NavLink className='item' to='/home' >Home</NavLink>
                </li>
                <li>
                    <NavLink className='item' to='/services'>Services</NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;