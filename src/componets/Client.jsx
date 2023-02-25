import React from 'react'
import { Link } from 'react-router-dom'


function Client({client}) {
    return (
        <div className=" col-md-3 col-xl-2 mb-2">
            <div className="card">
                <div className="card-body">
                    <Link to={`/client/${client.Nombre}`} className={`btn  stretched-link ${client.deuda ===true? 'btn-danger' : "btn-primary"}`}>{client.Nombre}</Link>
                </div>
            </div>
        </div>
    )
}

export default Client