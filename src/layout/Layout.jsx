import './layout.css';
import {NavLink, Outlet, useLocation} from 'react-router-dom';

const Navigation = () => {
    const location = useLocation();

    return (
        <nav>
            <ul>
                <li className={location.pathname === '/' ? 'link-selected' : ''}>
                    <NavLink to={'/'}>
                        Pagina Principal
                    </NavLink>
                </li>
                <li className={location.pathname === '/student' || location.pathname === '/student/form' ? 'link-selected' : ''}>
                    <NavLink to={'/student'}>
                        Alumnos
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

const Layout = () => {
    return (
        <div className='layout-style'>
            <div className='layout-menu'>
                <h2>Menu</h2>
                <div className='layout-nav'>
                    <Navigation />
                </div>
            </div>
            <div className='layout-content'>
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;