import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import Navbar from '../componets/Navbar'

function AddCaja() {
    const [Nombre, setNombre] = useState('')
    const [Detalle, setDetalle] = useState('')
    const [Monto, setMonto] = useState(0)
    const [Check, setCheck] = useState(false)

    const [Clients, setClients] = useState(null)
    useEffect(() => {
        const getData = async () => {
            // https://charming-dove-pantsuit.cyclic.app/
            const res = await Axios.get('https://back-mym.herokuapp.com/client/')
            console.log(res)
            setClients(res.data)
        }
        getData()
    }, [])


    return (
        <>
            <Navbar />
            <div className='container'>
                <form action="" className="row">
                    <h1 className='text-center'>Add Caja</h1>
                    <div className="col-md-3 m-2" >
                        <select id="" name='Nombre' className='form-control col-md-3' onChange={(e) => setNombre(e.target.value)}>

                           
                            {Clients === null ? <option value="none">None</option> : Clients.map((client, index) => (<option value={client.Nombre} key={index}>{client.Nombre}</option>))}

                        </select>
                    </div>
                    <div className="col-md-2 m-2">
                        <input type="text" placeholder='Detalle' className='form-control col-md-3' onChange={(e) => setDetalle(e.target.value)} />
                    </div>
                    <div className="col-md-2 m-2">
                        <input type="number" placeholder='Monto' className='form-control col-md-3' onChange={(e) => setMonto(e.target.value)} />
                    </div>
                    <div className="col-md-2 m-2 input-group-text ">
                        <label htmlFor="check" className=''>Deuda</label>
                        <input type="checkbox" id='check' className='m-2' checked={Check} onChange={(e) => setCheck(!Check)} />
                    </div>
                   
                    <div className="col-md-2 m-2">
                        <button className='btn btn-primary'>Add</button>
                    </div>


                </form>
                <div>
                    {Nombre + "---" + Detalle + "---" + +Monto}
                </div>
            </div>
        </>
    )
}

export default AddCaja
