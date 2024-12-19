import React, { useRef } from 'react'
import { Link } from 'react-router-dom'


function Coordinator() {
    const coordinatorSearchRef = useRef()

    const handleSearch = async () => {
        
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
                        <button className=' ms-1 btn btn-outline-dark' onClick={handleSearch}>search</button>
                        <button className='ms-1 btn btn-dark'>Add</button>
                    </div>
              </div>
              <div className="row mx-2">
                  <table className='table text-center table-responsive-sm'>
                  <thead>
                            <tr>
                                <th scope="col">id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Assigned Coupons</th>
                                <th scope="col"></th>
                                <th scope="col">details</th>
                            </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <th>1</th>
                              <td>razim</td>
                              <th>10</th>
                              <th></th>
                              <th><Link className='btn btn-outline-dark' to={'/manager/coordinator/view'}>view</Link></th>
                          </tr>
                      </tbody>
                  </table>
              </div>
          </div>
      </>
  )
}

export default Coordinator