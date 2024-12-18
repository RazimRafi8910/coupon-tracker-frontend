import React from 'react'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function ManagerCard({label,title,link = false,linkTo}) {
  return (
      <>
          <div className='col-12 col-lg-4 px-2 mt-2'>
        <Card className='mx-3 shadow-lg' style={{ borderRadius: '6px' }}>
          <Card.Body className='d-flex justify-content-between align-items-center text-center mx-4'>
                      <div>
                      <Card.Subtitle className="mb-2 text-muted text-start">{label}</Card.Subtitle>
                      <Card.Title className='fs-1 text-start fw-bold' >{title}</Card.Title>
                      </div>
                      {link && <Link to={linkTo} className='btn btn-outline-dark'>View</Link>}
          </Card.Body>
        </Card>
      </div>
      </>
  )
}

export default ManagerCard