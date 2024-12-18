import Card from 'react-bootstrap/Card';

function SimpleCard({ title, label }) {
  return (
    <>
      <div className='col-12 px-2 mt-2'>
        <Card className='border border-dark mx-3' style={{ borderRadius: '6px' }}>
          <Card.Body className='text-center mx-4'>
            <Card.Subtitle className="mb-2 text-muted text-start">{label}</Card.Subtitle>
            <Card.Title className='fs-1 text-start fw-bold' >{title}</Card.Title>
          </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default SimpleCard