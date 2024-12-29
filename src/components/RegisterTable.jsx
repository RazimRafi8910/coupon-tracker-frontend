import React from 'react';
import { Table } from 'react-bootstrap';

function RegisterTable({ data }) {
  return (
      <>
          <div className="">
          <Table className='text-center' variant='secondary' responsive bordered hover>
      <thead>
        <tr className='text-nowrap'>
          <th>Reg Id</th>
          <th className='text-nowrap'>Book No</th>
          <th className='text-nowrap'>Issued To</th>
          <th>Amount</th>
          <th>leaf Start</th>
          <th>Commision</th>
          <th>Due Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        {data && data?.map((item, index) => {
          const due = 2500 - item.commision
          let status
          if (item.status == 0) {
            status = 'Pending'
          } else if(item.status == 1){ 
            status = 'Completed'
          } else if (item.status == 2) { 
            status = 'Reviced'
          }
          return (
            <tr key={index}>
              <td>{item.issueId}</td>
              <td>{item.couponNo}</td>
              <td>{item.issuedToUser.name}</td>
              <td>Rs 2500</td>
              <td>{item.leaveStart}</td>
              <td>{item.commision}</td>
              <td>{due}</td>
              <td>{status}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
          </div>
      </>
  )
}

export default RegisterTable