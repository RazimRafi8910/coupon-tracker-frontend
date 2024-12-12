import Table from 'react-bootstrap/Table';

function UserTable() {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>username</th>
          <th>Coupons</th>
          <th>Amount</th>
          <th>leaf Left</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>razim</td>
          <td>6</td>
          <td>Rs 1500</td>
          <td>190</td>
        </tr>
        <tr>
          <td>razim1</td>
          <td>6</td>
          <td>Rs 1500</td>
          <td>20</td>
        </tr>
        <tr>
          <td>raim2</td>
                  <td>6</td>
                  <td>Rs 1500</td>
          <td>150</td>
        </tr>
      </tbody>
    </Table>
  );
}

export default UserTable;