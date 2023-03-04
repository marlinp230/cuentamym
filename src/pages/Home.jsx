import Axios from 'axios'
import React, { useEffect, useState } from 'react'

import Client from '../componets/Client'
import Navbar from '../componets/Navbar'
import Spiner from '../componets/Spiner'

function Home({Search, setSearch}) {
  const [Clients, setClients] = useState(null)
  useEffect(() => {
    
    getData()
  }, [])

  const getData = async () => {
    const res = await Axios.get('https://charming-dove-pantsuit.cyclic.app/client')
    console.log(res.data)  
    setClients(res.data)
  }
  return (
    <div>
      <Navbar Search={Search} setSearch={setSearch}  getData={getData}/>
      <div className="container text-center">
        <div className="row">

          {
            Clients? Clients.map((client,index) => (
              <Client client={client} key={index}/>
              
            )):<Spiner/>
          }
          
        </div>
      </div>
    </div>
  )
}
  
export default Home