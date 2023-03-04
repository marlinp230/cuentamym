
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


function Navbar({Search, setSearch}) {

const OnSudmit= (e)=>{
    e.preventDefault()
    console.log("hello",Search)

}

const Addname =()=>{
    Swal.fire({
        title: "Add Client",
        html: `<input type="text" id="Nombre" class="swal2-input"  placeholder="Nombre">
        
    <input type="text" id="Telefono" class="swal2-input" placeholder="Telefono">
    <input type="number" id="Monto" class="swal2-input" placeholder="Monto">`,
        confirmButtonText: 'Guardar',
        focusConfirm: false,
        preConfirm: () => {
            const Nombre = Swal.getPopup().querySelector('#Nombre').value
            const Telefono = Swal.getPopup().querySelector('#Telefono').value
            const Monto = Swal.getPopup().querySelector('#Monto').value
            const id2 = Swal.getPopup().querySelector('#id2').value
            console.log(id2, 'L35')
            if (!Telefono || !Monto || !Nombre || !id2) {
                Swal.showValidationMessage(`Por favor ponga el Nombre Telefono and Monto.`)
            }
            return { Telefono: Telefono, Monto: Monto, Nombre, id2 }
        }
    }).then(async (result) => {
        console.log(result.value.id2, 'estre')
        // const res = await Axios.post('https://charming-dove-pantsuit.cyclic.app/v/', {
        //     Nombre: result.value.Nombre,
        //     Detalle: result.value.Detalle,
        //     Monto: result.value.Monto,
        //     Fecha,
        //     id2: result.value.id2

        // })

        // if (res) {
        //     console.log('12345678')
        //     Swal.fire({
        //         title: "Se anadio correctamente"
        //     })
          
        // }


    })

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
                                <input className="form-control m-2" type="text" placeholder="Add Name" aria-label="Search"name='Name'  value={Search} onChange={(e)=>setSearch(e.target.value)}/>
                                <button className="btn btn-outline-dark" type="submit" onClick={Addname}>Add Name</button>
                        </form>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar