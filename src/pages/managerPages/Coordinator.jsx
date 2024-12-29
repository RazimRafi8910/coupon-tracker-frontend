import React, { useRef,useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import useFetch from '../../utils/useFetch'
import Loader from '../../components/Loader'


function Coordinator() {
    const coordinatorSearchRef = useRef()
    const { data, error, loading } = useFetch('/manager/coordinator');
    const [isLoading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        try {
            
        } catch (error) {
            console.log(error)
            toast.error(error.message || "falied to Search", {
                position:'top-center'
            })
        }
    }

    if (loading) {
        return (
            <Loader/>
        )
    }

    if (error) {
        toast.error(error || "Failed fetch data", {
            position: "top-center"
        })
    }
  return (
      <>
          <div className="container">
          <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Coordinator</li>
                </ol>
                <div className="row mx-2">
                    <h2>Coordinators</h2>
                    <hr />
                </div>
              <div className="row">
              <div className='d-flex mb-3'>
                        <input type="text" className="form-control" ref={coordinatorSearchRef} placeholder="Coordinator name" aria-label="First name" />
                        { isLoading ? <p className='mb-0 mt-2'>Searching..</p> : <button className=' ms-1 btn btn-outline-dark' onClick={handleSearch}>search</button>  }
                        {/* <button className='ms-1 btn btn-dark'>Add</button> */}
                    </div>
              </div>
              <div className="row mx-2">
                  <table className='table text-center table-responsive-sm'>
                  <thead>
                            <tr>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Coupons</th>
                                <th scope="col"></th>
                                <th scope="col">details</th>
                            </tr>
                      </thead>
                      <tbody>
                          {data.map((item, index) => (
                              <tr key={index}>
                                  <td>{ item.studentId }</td>
                                  <td>{ item.name }</td>
                                  <td>{item.assignedCoupons}</td>
                                  <td>{}</td>
                                  <th><Link className='btn btn-outline-dark' to={`/manager/coordinator/${item.studentId}`}>view</Link></th>
                              </tr>
                          )) }
                      </tbody>
                  </table>
              </div>
          </div>
      </>
  )
}

export default Coordinator