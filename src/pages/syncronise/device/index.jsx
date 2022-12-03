import React from "react";
import { useState } from "react";
import { PlusCircle } from "react-feather";
import { Button, Card, Col, Container, Input, Label, Row } from "reactstrap";
import NavMenu from "../../../components/header/NavMenu";
import CustomPagination from "../../../components/pagination/CustomPagination";
import Spinner from "../../../components/spinner/Spinner";
import DeviceTable from "./DeviceTable";

const roleData = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function DeviceList() {
  // ! local state are delcared
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [selectRole, setSelectRole] = useState("all");
  const [searchName, setSearchName] = useState("");

  // ! hooks are initialized here
  const totalUser = 200;
  const loading = false;

  // ! handler are declared here
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleAddButtonClick = () => {
    console.log("add button clicked");
  };

  const handleRoleChange = (e) => {
    setSelectRole(e.target.value);
  };

  const handleSearchName = (e) => {
    setSearchName(e.target.value);
  };

  return (
    <>
      <NavMenu />
      <Container fluid className="px-md-5">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "80vh", width: "100%" }}
          >
            <Spinner />
          </div>
        ) : (
          <Row>
            <Col sm="12">
              <div className="display-6 font-fallback">User List</div>
              <hr className="border border-2 border-dark my-4" />

              {/* {addUserError ? (
              <Alert
                isOpen={!!addUserError}
                color="danger"
                className="font-fallback default-fz"
                toggle={dismissAlert}
              >
                <XCircle size={18} className="mb-1 me-1" />
                {addUserError?.includes("400")
                  ? "The Username/cellphone is associated with another user account!"
                  : addUserError?.includes("500")
                  ? "Something went wrong, please try after sometimes! If you are experiencing similar frequently, please report it to helpdesk."
                  : ""}
              </Alert>
            ) : (
              <CustomAlert
                addSuccess={addUserSuccess}
                addError={addUserError}
                updateSuccess={updateUserSuccess}
                updateError={updateUserError}
                deleteSuccess={deleteUserSuccess}
                deleteError={deleteUserError}
                dismissAlert={dismissAlert}
              />
            )} */}

              <Card className="px-4 py-4 border-0 shadow overflow-auto mb-5">
                <div className="mb-3 d-sm-flex justify-content-between responsive_table_class">
                  <Button
                    className="add-button border-0 font-fallback default-fz d-block "
                    onClick={handleAddButtonClick}
                  >
                    <PlusCircle size={20} className=" me-1" /> Add User
                  </Button>
                  <div className="d-flex mt-2 mt-sm-0">
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      className="font-fallback default-fz"
                      value={selectRole}
                      onChange={handleRoleChange}
                    >
                      <option value={0}>All</option>
                      {roleData &&
                        roleData.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                    </Input>
                    &nbsp;
                    <Input
                      type="text"
                      name="search"
                      className="font-fallback default-fz d-inline-block"
                      placeholder="Search By Name"
                      value={searchName}
                      onChange={handleSearchName}
                    />
                  </div>
                </div>
                {/* ! Device Table */}
                <DeviceTable />

                {/* pagination item are here */}
                <div className="d-flex justify-content-between align-items-center responsive_table_class">
                  <div className={`d-flex align-items-center`}>
                    <Label
                      for="limit"
                      className="default-fz font-fallback me-2 mb-0 "
                    >
                      Show
                    </Label>
                    <Input
                      name="limit"
                      id="limit"
                      type="select"
                      className="orange-500  font-fallback default-fz py-0 mb-0"
                      value={limit}
                      onChange={handleLimitChange}
                    >
                      <option value="10">10</option>
                      <option value="30">30</option>
                      <option value="50">50</option>
                    </Input>
                  </div>
                  &nbsp; &nbsp;
                  <div className="">
                    <CustomPagination
                      currentPage={currentPage}
                      limit={limit}
                      setCurrentPage={setCurrentPage}
                      totalItemCount={totalUser}
                    />
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}

export default DeviceList;
