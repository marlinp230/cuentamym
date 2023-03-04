
import  Axios  from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


function Navbar({Search, setSearch,getData}) {

    const dates = () => {
        return `${moment().format('L')}`
    }
const Addname =()=>{
    Swal.fire({
        title: "Add Client",
        html: `<input type="text" id="Nombre" class="swal2-input"  placeholder="Nombre">
        <input type="text" id="Telefono" class="swal2-input" placeholder="Telefono">`,
        confirmButtonText: 'Guardar',
        focusConfirm: false,
        preConfirm: () => {
            const Nombre = Swal.getPopup().querySelector('#Nombre').value
            const Telefono = Swal.getPopup().querySelector('#Telefono').value
         
           
           
            if (!Telefono || !Nombre ) {
                Swal.showValidationMessage(`Por favor ponga el Nombre Telefono`)
            }
            return { Telefono, Nombre}
        }
    }).then(async (result) => {
        console.log(result, 'result')
        // { Fecha, Nombre,Telefono,orden:orden.length+1 }
        const res = await Axios.post('https://charming-dove-pantsuit.cyclic.app/client/', {
            Nombre: result.value.Nombre,
            Telefono: result.value.Telefono,
            Fecha:dates()
           

        })

        if (res) {
            console.log('12345678')
            Swal.fire({
                title: "Se anadio correctamente"
            })
            getData()
          
        }


    })

}
const onSubmit=(e)=>{
    e.preventDefault()
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
                        <form className="d-flex" onSubmit={onSubmit}> 
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