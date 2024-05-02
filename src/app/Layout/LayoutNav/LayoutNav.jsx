import { Link } from 'react-router-dom'
import { Test } from './LayoutNav.styles';


const LayoutNav = ({ children }) => {
  return (
    <div>
      <Test>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/tasks" >Tasks</Link></li>
          </ul>
        </nav>
      </Test>
      <main>{children}</main>
    </div>
  )
}

export default LayoutNav;