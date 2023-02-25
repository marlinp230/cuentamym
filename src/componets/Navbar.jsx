import React from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    return (
        <>

            <button className="btn btn-primary m-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                Menu
            </button>

            <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                <div className="offcanvas-header bg-primary">
                    <h5 className="offcanvas-title" id="offcanvasExampleLabel">Menu</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body bg-primary">
                    <div className="navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav text-center ">
                        <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/'>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to='/Caja/add'>Add</Link>
                            </li>
                            <li className="nav-item  ">
                                <Link className="nav-link" to='/'>Features</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to='/'>Pricing</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link disabled">Disabled</Link>
                            </li>
                        </ul>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Navbar