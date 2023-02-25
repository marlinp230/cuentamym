import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Client from '../componets/Client'
import Navbar from '../componets/Navbar'
import Spiner from '../componets/Spiner'

function Home() {
  const [Clients, setClients] = useState(null)
  useEffect(() => {
    const getData = async () => {
      const res = await Axios.get('https://puce-motionless-bandicoot.cyclic.app/client')
      console.log(res.data)  
      setClients(res.data)
    }
    getData()
  }, [])


  return (
    <div>
      <Navbar />
      <div className="container text-center">
        <div className="row">

          {
            Clients? Clients.map(client => (
              <Client client={client}/>
              
            )):<Spiner/>
          }
          
        </div>
      </div>
    </div>
  )
}
  
export default Home