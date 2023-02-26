import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spiner from '../componets/Spiner'
import moment from 'moment'
import Swal from 'sweetalert2'


const dates= ()=>{
    return `${moment().format('L')}`
  }

function Client() {
    const { Nombre } = useParams()
    const [Client, setClient] = useState(null)
    const [Caja, setCaja] = useState(null)
    const totalCaja = Caja ? Caja.reduce((p, c) => p + c.Monto, 0) : 0


    // <------------------------------------------sweet alert add data to db------------------------------------------------------------------------>
    const SwalAlert = async () => {
        Swal.fire({
            title: Nombre,
            html: `<input type="text" id="Nombre" class="swal2-input" value=${Nombre} disabled='true' placeholder="Nombre">
        <input type="text" id="Detalle" class="swal2-input" placeholder="Detalle">
        <input type="number" id="Monto" class="swal2-input" placeholder="Monto">`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
                const Nombre = Swal.getPopup().querySelector('#Nombre').value
                const Detalle = Swal.getPopup().querySelector('#Detalle').value
                const Monto = Swal.getPopup().querySelector('#Monto').value
                if (!Detalle || !Monto || !Nombre) {
                    Swal.showValidationMessage(`Por favor ponga el Nombre Detalle and Monto.`)
                }
                return { Detalle: Detalle, Monto: Monto, Nombre,Fecha:dates() }
            }
        }).then(async (result) => {

            const res = await Axios.post('https://charming-dove-pantsuit.cyclic.app/v/', {
                Nombre: result.value.Nombre,
                Detalle: result.value.Detalle,
                Monto: result.value.Monto,
                Fecha:dates()

            })

            if (res) {
                console.log('12345678')
                Swal.fire({
                    title: "Se anadio correctamente"
                })
                data()
            }


        })
    }
    // <-----------------------------------------------------------useEffect------------------------------------------------------------------------>

    useEffect(() => {
        data()
    }, [])

    // <------------------------------------------getting data from data base------------------------------------------------------------------------>
    const data = async () => {
        const res = await Axios.get(`https://charming-dove-pantsuit.cyclic.app/client/getclient/${Nombre}`);
        setClient(res.data.client)
        setCaja(res.data.cajadb)
    }   
    return (
        <>
            <div className='container'>
                <div className="row mt-2 ">
                    <div className="">
                        <button className='btn btn-primary' onClick={SwalAlert} >Add</button>
                    </div>
                    <div className="col-sm-1 col-md-4 card-body bg-info border">
                        <p className='m-2 p-2'><strong>Nombre: {Client ? Client[0].Nombre : "None"}</strong></p>
                    </div>

                    <div className="col-sm-1 col-md-4 card-body bg-primary border">
                        <p className='m-2 p-2'><strong>Fecha:{Client ? Client[0].Fecha : "No Date"} </strong></p>
                    </div>

                    <div className={`col-sm-1 col-md-4 card-body border ${totalCaja > 0 ? "bg-primary" : " bg-danger"}`}>
                        <p className={`m-2 p-2 `}><strong>Total: ${totalCaja}</strong></p>
                    </div>

                </div>
            </div>
            <div className="container">
                <div className="di"></div>
                <div className="row">
                    {
                        Caja ? Caja.map((caja, index) => (
                            <div className=" col-md-2 col-xl-3 card mb-2" key={index}>
                                <div className="card-body">
                                    <div className="nombre bg-info">Nombre: <strong>{caja.Nombre}</strong></div>
                                    <div className="Detalle">Detalle: {caja.Detalle}</div>
                                    <div className={`${caja.Monto > 0 ? 'bg-success' : "bg-danger"} `}>Monto: ${caja.Monto}</div>
                                    <div className="fecha bg-primary">Fecha: <strong> {caja.Fecha}</strong></div>
                                </div>
                            </div>)) : <Spiner />
                    }
                </div>
            </div>
        </>
    )
}

export default Client