import React from 'react'
import SimpleCard from '../components/cards/SimpleCard'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import UserTable from '../components/UserCouponTable';

function CoordinatorHomePage() {
  return (
    <>
      <div className="container">
        <div className="row mt-3 text-center">
          <h2>Coordinator Page</h2>
        </div>
        <hr className='mb-2' />
        <div className="row mt-4 d-flex justify-content-center">
          <SimpleCard title={15} label={'Avalabile Coupons'} />
          <SimpleCard title={10} label={'Assigned Coupons'} />
          <SimpleCard title={5} label={'Coupons Left'} />
          <SimpleCard title={290} label={'Total Amount recieved'} />
          <SimpleCard title={1000} label={'Total Due Amount'} />
        </div>
        <hr />
        <div className="row">
          <h3 className='text-center'>Assign Coupons</h3>
          <div className='d-flex px-5 justify-content-center'>
            <Form className='w-100 d-flex align-items-center'>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Control type="number" className='mt-3 w-100 px-4' placeholder="Enter the username" />
              </Form.Group>
              <Button variant="primary" className='px-3 ms-2' type="submit">Search</Button>
            </Form>
          </div>
        </div>
        <div className="row mx-3">
          <Card className='border border-dark'>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <div className='d-flex justify-content-between fw-bold'>
                  Username
                </div>
                <div className=''>
                  <Form className='w-100 align-items-center'>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                      <Form.Control type="number" className='mt-3 w-100 px-4 border-dark' placeholder="Enter the Coupon assigned Count" />
                    </Form.Group>
                    <div className='d-flex justify-content-end'>
                    <Button variant="outline-dark" className='px-3 ms-2' type="submit">Assign</Button>
                    </div>
                  </Form>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </div>
        <div className='row mx-1 text-center mt-3'>
          <h3>Assigned Users</h3>
          <div>
          <UserTable/>
          </div>
        </div>
      </div>
    </>
  )
}

export default CoordinatorHomePage