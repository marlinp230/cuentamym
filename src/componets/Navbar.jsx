import React, { useState } from 'react'
import { Link } from 'react-router-dom'


function Navbar() {
    const [Name, setName] = useState('')
const OnSudmit= (e)=>{
    e.preventDefault()
    console.log("hello",Name)

}
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-2">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Home</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Link</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link disabled" to="/" tabindex="-1" aria-disabled="true">Disabled</Link>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={OnSudmit}>
                            <input className="form-control me-2" type="text" placeholder="Add Name" aria-label="Search"name='Name'  value={Name} onChange={(e)=>setName(e.target.value)}/>
                                <button className="btn btn-outline-dark" type="submit">Add</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar