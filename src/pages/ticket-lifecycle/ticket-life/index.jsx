import { useEffect } from "react";
import { useState } from "react";
import { AlignJustify, PlusCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Input, Label, Row } from "reactstrap";
import NavMenu from "../../../components/header/NavMenu";
import CustomPagination from "../../../components/pagination/CustomPagination";
import Spinner from "../../../components/spinner/Spinner";
import SearchOffcanvas from "../../syncronise/device/SearchOffcanvas";
import { getDeviceByFilter, getFileterDeivces } from "../../syncronise/store";
import { getTicketLifecycle } from "../store";
import TicketLifeTable from "./TicketLifeTable";

function TicketLifeList() {
  // ! local state are delcared
  const [currentPage, setCurrentPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [selectStatus, setSelectStatus] = useState(0);
  const [ticketNO, setTicketNo] = useState("");
  const [show, setShow] = useState(false);
  const [advanceObject, setAdvanceObject] = useState({});
  const [advanceSearch, setAdvanceSearch] = useState({
    UserName: "",
    DeviceName: "",
    PublicIP: "",
    Status: "online",
  });

  // ! hooks are initialized here
  const loading = false;
  const dispatch = useDispatch();

  // ! get DAta from redux store
  const totalTicketLife = useSelector(
    (state) => state.ticketLifecycle.data.totalIncident
  );
  const ticketLifeList = useSelector(
    (state) => state.ticketLifecycle.data.list
  );

  // ! handler are declared here
  const handleLimitChange = (e) => {
    setLimit(e.target.value);
  };

  const handleAddButtonClick = () => {
    console.log("add button clicked");
  };

  const handleStatusChange = (e) => {
    setAdvanceObject({});
    setSelectStatus(e.target.value);
  };

  const handleTicketNoChange = (e) => {
    setCurrentPage(0);
    setAdvanceObject({});
    setTicketNo(e.target.value);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdvanceSearch = (e) => {
    e.preventDefault();
    setAdvanceObject(advanceSearch);
    setShow(false);
  };

  const clearAdvanceSearch = () => {
    setAdvanceSearch({
      UserName: "",
      DeviceName: "",
      PublicIP: "",
      Status: "online",
    });

    setAdvanceObject({});
    setShow(false);
  };

  const handleAdvanceSearchChange = (e) => {
    setAdvanceSearch({
      ...advanceSearch,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (Object.keys(advanceObject).length > 0) {
      dispatch(
        getDeviceByFilter({
          start: currentPage * limit,
          take: limit,
          UserName: advanceObject.UserName,
          DeviceName: advanceObject.DeviceName,
          PublicIP: advanceObject.PublicIP,
          Status: advanceObject.Status,
        })
      );
    }
    dispatch(
      getTicketLifecycle({
        start: currentPage * limit,
        take: limit,
        Status: selectStatus,
        TicketNo: ticketNO,
      })
    );
  }, [currentPage, limit, dispatch, selectStatus, advanceObject, ticketNO]);

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
              <div className="display-6 font-fallback mt-3">
                Ticket Lifecycle
              </div>
              <hr className="border border-2 border-dark my-4" />

              <Card className="px-4 py-4 border-0 shadow overflow-auto mb-5">
                <div className="mb-3 d-sm-flex justify-content-end responsive_table_class align-items-center">
                  <div className="d-flex mt-2 mt-sm-0">
                    <Input
                      type="select"
                      name="select"
                      id="exampleSelect"
                      className="font-fallback default-fz"
                      value={selectStatus}
                      onChange={handleStatusChange}
                    >
                      <option value={0}>All</option>
                      <option value={1}>Open</option>
                      <option value={2}>Close</option>
                    </Input>
                    &nbsp;
                    <Input
                      type="text"
                      name="search"
                      className="font-fallback default-fz d-inline-block"
                      placeholder="Search By Ticket No"
                      value={ticketNO}
                      onChange={handleTicketNoChange}
                    />
                  </div>
                  &nbsp;
                  <AlignJustify
                    size={40}
                    className="border p-1 rounded cursor-pointer"
                    onClick={handleShow}
                  />
                </div>
                {/* ! Device Table */}
                <TicketLifeTable ticketLifeList={ticketLifeList} />

                {/* pagination item are here */}
                <div className="d-flex justify-content-between align-items-center responsive_table_class mt-3">
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
                      totalItemCount={totalTicketLife}
                    />
                    <SearchOffcanvas
                      show={show}
                      handleClose={handleClose}
                      handleAdvanceSearch={handleAdvanceSearch}
                      handleAdvanceSearchChange={handleAdvanceSearchChange}
                      advanceSearch={advanceSearch}
                      clearAdvanceSearch={clearAdvanceSearch}
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

export default TicketLifeList;
