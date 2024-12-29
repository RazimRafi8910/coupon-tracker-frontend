import { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';

function UserCouponTable({ data }) {
  const [total, setTotal] = useState(0);
  const [totalCommision, setTotalCommision] = useState(0);
  const [totalDueAmount, setTotalDueAmount] = useState(0);
  
  useEffect(() => {
    // Calculate totals when data changes
    if (data) {
      const calculatedTotal = data.length * 2500;
      const calculatedTotalCommision = data.reduce((acc, item) => acc + item.commision, 0);
      const calculatedTotalDueAmount = calculatedTotal - calculatedTotalCommision;

      setTotal(calculatedTotal);
      setTotalCommision(calculatedTotalCommision);
      setTotalDueAmount(calculatedTotalDueAmount);
    }
  }, [data]);

  return (
    <Table className='text-center' variant='secondary' responsive bordered hover>
      <thead>
        <tr>
          <th>Reg Id</th>
          <th>Issued Date</th>
          <th>Coupon No</th>
          <th>Amount</th>
          <th>leaf Start</th>
          <th>leaf End</th>
          <th>Commision</th>
          <th>Due Amount</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>

        {data && data?.map((item, index) => {
          const due = 2500 - item.commision
          let date = new Date(item.issuedDate).toLocaleDateString()
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
              <td>{date}</td>
              <td>{item.couponNo}</td>
              <td>Rs 2500</td>
              <td>{item.leaveStart}</td>
              <td>{item.leaveEnd}</td>
              <td>{item.commision}</td>
              <td>{due}</td>
              <td>{status}</td>
            </tr>
          )
        })}
        <tr className='text-center highlight-row'>
          <td></td>
          <td></td>
          <td></td>
          <td>Total : <strong>{total}</strong> </td>
          <td></td>
          <td></td>
          <td>Total Commision : <strong>{totalCommision}</strong> </td>
          <td>Total Amount : <strong>{totalDueAmount}</strong></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UserCouponTable;