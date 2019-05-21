import React from 'react'
import {Link} from 'react-router-dom'

class Navbar extends React.Component {
    render() {
        return (
            <div style={{position: 'absolute',padding: '20px', marginTop: '-40px', right: '0'}}>
                <Link className="nav-item" to='/'>Home</Link>
                <Link className="nav-item" to='/add-sample'>Add Sample</Link>
            </div>
        )
    }
}

export default Navbar