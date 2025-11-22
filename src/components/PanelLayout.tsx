
import { NavLink, Outlet } from 'react-router'
import '../styles/PanelSwitcher.css'

const PanelLayout = () => {
  return (
    <div className="st-container">

      <div className="st-nav">
        <NavLink
          to="/"
          end
          className={({ isActive }) => (isActive ? 'st-btn active' : 'st-btn')}
        >
          bokstäver
        </NavLink>
        <NavLink
          to="/vowel"
          className={({ isActive }) =>
            isActive ? 'st-btn active disabled' : 'st-btn disabled'
          }
        >
          Vokaler
        </NavLink>
        <NavLink
          to="/tranquillity"
          className={({ isActive }) =>
            isActive ? 'st-btn active disabled' : 'st-btn disabled'
          }
        >
          --
        </NavLink>
        <NavLink
          to="/positivity"
          className={({ isActive }) =>
            isActive ? 'st-btn active disabled' : 'st-btn disabled'
          }
        >
          --
        </NavLink>
        <NavLink
          to="/passion"
          className={({ isActive }) =>
            isActive ? 'st-btn active disabled' : 'st-btn disabled'
          }
        >
          --
        </NavLink>
      </div>

      {/* Render current route page */}
      <Outlet />
    </div>
  )
}

export default PanelLayout
