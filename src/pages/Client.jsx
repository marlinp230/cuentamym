import Axios from 'axios'
import React, { useEffect, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import Spiner from '../componets/Spiner'
import moment from 'moment'
import Swal from 'sweetalert2'
import Navbar from '../componets/Navbar'


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST': return { ...state, loading: true };
        case 'FETCH_SUCCESS': return { ...state, Caja: action.payload, loading: false };
        case 'FETCH_FAIL': return { ...state, loading: false, error: action.payload };
        default: return state

    }

}

function Client({Search}) {
    const [{ loading, error, Caja }, dispatch] = useReducer(reducer, { loading: true, error: '' })

    const { Nombre, id } = useParams()
    const [Client, setClient] = useState(null)
    // const [Caja, setCaja] = useState(null) 
    const totalCaja = Caja ? Caja.reduce((p, c) => p + c.Monto, 0) : 0
    const dates = () => {
        return `${moment().format('L')}`
    }

    // <------------------------------------------ add data to db------------------------------------------------------------------------>
    const FormAdd = async () => {
        Swal.fire({
            title: Nombre,
            html: `<input type="text" id="Nombre" class="swal2-input" value=${Nombre} disabled='true' placeholder="Nombre">
            <input type="text" id="id2" class="swal2-input" value=${id} disabled='true' placeholder="Nombre">
        <input type="text" id="Detalle" class="swal2-input" placeholder="Detalle">
        <input type="number" id="Monto" class="swal2-input" placeholder="Monto">`,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
                const Nombre = Swal.getPopup().querySelector('#Nombre').value
                const Detalle = Swal.getPopup().querySelector('#Detalle').value
                const Monto = Swal.getPopup().querySelector('#Monto').value
                const id2 = Swal.getPopup().querySelector('#id2').value
                console.log(id2, 'L35')
                if (!Detalle || !Monto || !Nombre || !id2) {
                    Swal.showValidationMessage(`Por favor ponga el Nombre Detalle and Monto.`)
                }
                return { Detalle: Detalle, Monto: Monto, Nombre, Fecha: dates(), id2 }
            }
        }).then(async (result) => {
            console.log(result.value.id2, 'estre')
            const res = await Axios.post('https://back-mym.herokuapp.com/v/', {
                Nombre: result.value.Nombre,
                Detalle: result.value.Detalle,
                Monto: result.value.Monto,
                Fecha: dates(),
                id2: result.value.id2

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
    // <-----------------------------------------------------------delete database caja------------------------------------------------------------------------>
    const DeleteDATA = async (id) => {
        Swal.fire({
            title: Nombre,
            html: `
            <input type="text" id="id" class="swal2-input" value=${id} disabled='true' placeholder="ID">
            <input type="text" id="id2" class="swal2-input"  placeholder="ID">
       `,
            confirmButtonText: 'Guardar',
            focusConfirm: false,
            preConfirm: () => {
              
                const id = Swal.getPopup().querySelector('#id').value
                const id2 = Swal.getPopup().querySelector('#id2').value

             
                if (!id || !id2) {
                    Swal.showValidationMessage(`Por favor ponga el id`)
                }
                return { id, id2 }
            }
        }).then(async (result) => {
            console.log(result.value.id2,result.value.id, 'estre')
        
           if (result.value.id !== result.value.id2) {
            Swal.fire({
                title: `THE IDS ARE NOT THE SAME      ${result.value.id}-${result.value.id2}`
            })
           }

           if (result.value.id === result.value.id2) {
            const res= await Axios.delete(`https://back-mym.herokuapp.com/v/${result.value.id2}`)
            console.log(res.data)
           if (res.data.status) {
            Swal.fire({
                title: `${res.data.message}`
            })
            data()
           }else{
            Swal.fire({
                title: `CANT BE DELETED ${result.value.id2}`
            })

           }
          
           }


        })
       
    }
     // <-----------------------------------------------------------delete database caja------------------------------------------------------------------------>
  
    // <-----------------------------------------------------------useEffect------------------------------------------------------------------------>

    useEffect(() => {
        data()
    }, [])

    // <------------------------------------------getting data from data base------------------------------------------------------------------------>
    const data = async () => {
        dispatch({ type: "FETCH_REQUEST" })
        try {

            const res = await Axios.get(`https://charming-dove-pantsuit.cyclic.app/client/getclient/${Nombre}`);

           
            setClient(res.data.client)

            dispatch({ type: "FETCH_SUCCESS", payload: res.data.cajadb })
            // setCaja(res.data.cajadb)
        } catch (error) {
            dispatch({ type: "FETCH_FAIL", payload: error.message })
        }
    }
    return (
        <>
        
            <div className='container mt-4 text-center'>
                <div className="row  ">
                    <div className="col-1 col-md-4 col-lg-4 card-body bg-info border d-flex">
                       <button className='btn btn-dark' onClick={FormAdd} >Add</button>
                        <p className=' p-2'>Nombre: {Client ? Client[0].Nombre : "None"}</p>
                    </div>
                    <div className="col-1 col-md-4 col-lg-4 card-body bg-primary border">
                        <p className=' p-2'>Fecha: {Client ? Client[0].Fecha : "No Date"} </p>
                    </div>
                    <div className={`col-1 col-md-4 col-lg-4 card-body border ${totalCaja > 0 ? "bg-primary" : " bg-danger"}`}>
                        <p className={` p-2 `}>Total: ${totalCaja}</p>
                    </div>
                </div>
            </div>
            <div className="container ">
                <div className="row text-center mb-2">
                    <div className="col-1 col-md-4 col-lg-4 card-body bg-info border">
                        <p className='m-2 p-2'>Nombre: {Client ? Client[0].Nombre : "None"}</p>
                    </div>
                    <div className="col-1 col-md-4 col-lg-4 card-body bg-primary border">
                        <p className='m-2 p-2'>Fecha: {Client ? Client[0].Fecha : "No Date"} </p>
                    </div>
                    <div className={`col-1 col-md-4 col-lg-4 card-body border ${totalCaja > 0 ? "bg-primary" : " bg-danger"}`}>
                        <p className={`m-2 p-2 `}>Total: ${totalCaja}</p>
                       
                    </div>
                </div>
                <div className="row">
                    {
                        Caja ? Caja.map((caja, index) => (
                            <div className=" col-md-4 col-xl-3 card mb-2" key={index}>
                                <div className="card-body">
                                    <div className="nombre bg-info">Nombre: <strong>{caja.Nombre}</strong></div>
                                    <div className="Detalle">Detalle: {caja.Detalle}</div>
                                    <div className={`${caja.Monto > 0 ? 'bg-success' : "bg-danger"} `}>Monto: ${caja.Monto}</div>
                                    <div className="fecha bg-primary">Fecha: <strong> {caja.Fecha}</strong></div>
                                    <div className="id2">id2: {caja.id2}</div>
                                    <div className="opts">
                                       
                                        <button className='btn btn-danger btn-sm m-2'onClick={()=>{DeleteDATA(caja._id)}}>Delete</button>

                                    </div>

                                </div>
                            </div>)) : loading ? <Spiner /> : <h6>Error {error}</h6>
                    }
                </div>
            </div>
        </>
    )
}

export default Client
