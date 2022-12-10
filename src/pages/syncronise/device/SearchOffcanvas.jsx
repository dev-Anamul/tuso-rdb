import React from "react";
import { Offcanvas } from "react-bootstrap";
import { Button, Form, Input, Label } from "reactstrap";

function SearchOffcanvas({
  show,
  handleClose,
  handleAdvanceSearch,
  handleAdvanceSearchChange,
  advanceSearch,
  clearAdvanceSearch,
}) {
  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Device search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex justify-content-center align-items-center border-top border-3 pt-3">
            <Form className="w-100" onSubmit={handleAdvanceSearch}>
              <div className="mb-3">
                <Label for="UserName">Username</Label>
                <Input
                  id="UserName"
                  name="UserName"
                  placeholder="Enter username"
                  value={advanceSearch.UserName}
                  onChange={handleAdvanceSearchChange}
                />
              </div>
              <div className="mb-3">
                <Label for="DeviceName">Device</Label>
                <Input
                  id="DeviceName"
                  name="DeviceName"
                  placeholder="Enter device name"
                  value={advanceSearch.DeviceName}
                  onChange={handleAdvanceSearchChange}
                />
              </div>
              <div className="mb-3">
                <Label for="PublicIP">Public IP</Label>
                <Input
                  id="PublicIP"
                  name="PublicIP"
                  placeholder="Enter public IP"
                  value={advanceSearch.PublicIP}
                  onChange={handleAdvanceSearchChange}
                />
              </div>
              <div className="mb-3">
                <Label for="Status">Status</Label>
                <Input
                  type="select"
                  name="Status"
                  id="Status"
                  value={advanceSearch.Status}
                  onChange={handleAdvanceSearchChange}
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                </Input>
              </div>
              <div>
                <Button type="submit" className="add-button w-100">
                  Search
                </Button>

                <Button className="mt-2 w-100" onClick={clearAdvanceSearch}>
                  Clear
                </Button>
              </div>
            </Form>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SearchOffcanvas;
