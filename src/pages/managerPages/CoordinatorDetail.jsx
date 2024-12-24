import React from 'react';
import { useParams,Link } from 'react-router-dom';
import useFetch from '../../utils/useFetch';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';
import CoordinatorTable from '../../components/CoordinatorTable';

function CoordinatorDetail() {
    const { coordinatorId } = useParams()
    const { data, loading, error } = useFetch(`/manager/coordinator/${coordinatorId}`)

    if (error) {
        toast.error(error || "Failed fetch data", {
            position:"top-center"
        })
    }

    // if (loading) {
    //     return (
    //         <Loader/>
    //     )
    // }
  return (
      <>
          <div className="container">
          <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active"><Link to={'/manager/coordinator'}>Coordinator</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">details</li>
                </ol>
                <div className="row mx-2">
                    <h2>Coordinator details</h2>
                    <hr />
              </div>
              {loading ? (
                <Loader />
            ) : error ? (
                <p className="text-danger">Failed to load data</p>
            ) : (
                <>
                    {/* Coordinator Details */}
                    <div className="row mx-3">
                        <p>Reg No : <strong>51/bca/2024</strong></p>
                        <div className="col">
                            <p>Name : <strong>{data.name}</strong></p>
                            <p>Student ID : <strong>{data.studentId}</strong></p>
                        </div>
                        <div className="col ms-3">
                            <p>Class : <strong>{data.class}</strong></p>
                            <p>Batch : <strong>{data.batch}</strong></p>
                        </div>
                        <p>Phone : <strong>{data.phone}</strong></p>
                        <p>Email : <strong>{data.email}</strong></p>
                        <p>Coupons Assigned: <strong>{data.assignedCoupons}</strong></p>
                    </div>

                    {/* Coupon Register */}
                    <div className="row mx-3 mt-2">
                        <div className="d-flex justify-content-between">
                            <h4>Coupon Register</h4>
                            <button className="btn btn-outline-dark mb-1">Assign</button>
                        </div>
                        <hr />
                    </div>
                    <div className="row mx-2">
                        {data.register && data.register.length > 0 ? (
                            <CoordinatorTable data={data.register} />
                        ) : (
                            <p className="text-center w-100">No register found</p>
                        )}
                    </div>
                </>
            )}
              
              {/* <div className="row mx-3">
                    <p>Reg No : <strong>51/bca/2024</strong> </p>
                    <div className='col'>
                        <p>Name : <strong>{data.name}</strong> </p>
                        <p>Student Id : <strong> {data.studentId} </strong> </p>
                    </div>
                    <div className="col ms-3">
                        <p>Class : <strong>{data.class}</strong> </p>
                        <p>Batch : <strong>{data.batch}</strong> </p>
                    </div>
                    <p>Phone : <strong>{data.phone}</strong> </p>
                    <p>Email : <strong> {data.email} </strong> </p>
                    <p>Coupons Assgined: <strong>{data.assignedCoupons}</strong> </p>
              </div>
              <div className="row mx-3 mt-2">
                    <div className='d-flex justify-content-between'>
                        <h4>Coupon Register</h4>
                        <button className='btn btn-outline-dark mb-1'>Assign</button>
                    </div>

                    <hr />
              </div>
              <div className="row mx-2">
                    {!data.register ? <p className='text-center w-100'>No register found</p> : <CoordinatorTable data={data.register}/>}
                </div> */}
          </div>
      </>
  )
}

export default CoordinatorDetail