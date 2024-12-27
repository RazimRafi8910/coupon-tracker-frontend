import React from "react";
import { Card } from "react-bootstrap";
import CouponDetailsTable from "../CouponDetailsTable";

function UserDetailsCard({ data }) {
  return (
    <>
      <Card className="px-0" style={{ backgroundColor: "#e8e8e8" }}>
        {/* <Card.Header as="h4">Coordinator Details</Card.Header> */}
        <Card.Body className="px-0">
          <div className="row px-2 mb-3">
            <div className="col">
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Name
                </span>{" "}
                : <br />
                {data.name?.toUpperCase()}
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Reg No : <br />{" "}
                </span>
                {data.regNo}
              </Card.Text>
              <Card.Text className="fw-bold">
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Email : <br />{" "}
                </span>
                {data.email}
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Phone : <br />{" "}
                </span>{" "}
                {data.phone}
              </Card.Text>
            </div>
            <div className="col">
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Id : <br />{" "}
                </span>{" "}
                {data.studentId}
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Class : <br />{" "}
                </span>{" "}
                {data.class?.toUpperCase()}
              </Card.Text>
              <Card.Text className="fw-bold">
                {" "}
                <span className="text-muted" style={{ fontWeight: "500" }}>
                  Batch : <br />{" "}
                </span>{" "}
                {data.batch}
              </Card.Text>
            </div>
          </div>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                  <Card.Header as={"h6"}>Coupon</Card.Header>
                  <div className="row px-2">
                      <CouponDetailsTable data={data.coordinatorRegister}/>
                  </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default UserDetailsCard;
