import Card from 'react-bootstrap/Card';

function SimpleCard({ title, label }) {
  return (
    <>
      <div className='col-6 px-2 mt-2'>
        <Card className='border border-dark' style={{ borderRadius: '6px' }}>
          <Card.Body className='text-center'>
            <Card.Title className='fs-1 text-start ms-1' style={{fontWeight:'800'}}>{title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted text-start" style={{fontSize:'15px'}}>{label}</Card.Subtitle>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default SimpleCard