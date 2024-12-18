import React from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../../utils/useFetch'
import { Link } from 'react-router-dom'

function StudentDetails() {
    const {studentid} = useParams()
    // const { data, loading, error } = useFetch(`/manager/student/${studentid}`)

  return (
      <>
          <div className="container">
          <ol className="breadcrumb mx-3">
                    <li className="breadcrumb-item"><Link to={'/manager'}>manager</Link></li>
                    <li className="breadcrumb-item active"><Link to={'/manager/students'}>Students</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Student details</li>
                </ol>
              <div className="row mx-2">
                  <h2>Student details</h2>
                  <hr />
              </div>
          </div>
      </>
  )
}

export default StudentDetails