import React from "react";
import { Container } from "reactstrap";
import Footer from "../../../components/footer/Footer";
import NavMenu from "../../../components/header/NavMenu";
import SearchIndexCard from "./SearchIndex";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjectData } from "../../project/store";
import { getProvinceData } from "../../province/store";
import { getIncidentCategoryData } from "../../incident-category/store";
import {
  getTicketData,
  getFilterdTicketData,
  clearSuccessAndError,
  getExpertTicketData,
  getExpertTeamLeaderTicketData,
  clientTicketData,
  getTicketById,
  uploadScreenShot,
  clearUploadAttachment,
} from "../store";
import { getSingleUserData } from "../../user/store";
import Swal from "sweetalert2";
import Spinner from "../../../components/spinner/Spinner";
import { useState } from "react";
import { useContext } from "react";
import AttachmentContext from "../../../context/AttachMent";

function SearchIndex() {
  // ! states are initialized here
  const [serchObj, setSearchObj] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [ticketNo, setTicketNo] = useState("");
  const [status, setStatus] = useState(1);

  // ! hooks are initialized here
  const dispatch = useDispatch();
  const { attacehMent, setAttacehMent } = useContext(AttachmentContext);

  // ! get data from redux store
  const loginUser = useSelector((state) => state.login.data);
  const teamLeader = useSelector((state) => state.user.teamLeader);
  const newCreatedTicket = useSelector(
    (state) => state.ticket.newCreatedTicket
  );
  const { closeTicketSuccess } = useSelector((state) => state.ticket);
  console.log("closeTicketSuccess", closeTicketSuccess);

  // ! handler functions are declared here
  // ! pagination handler
  const handlePagination = (page) => {
    setCurrentPage(page.selected);
  };

  // ! calculate from where start getting data
  const start = currentPage * limit;

  // ! useEffect hooks are initialized here
  useEffect(() => {
    if (currentPage > 0) {
      setCurrentPage(0);
      setTicketNo("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (ticketNo) {
      dispatch(
        getTicketById({
          key: ticketNo,
          start: currentPage * limit,
          limit,
          status,
          UserAccountID: loginUser?.oid,
        })
      );
    } else if (Object.keys(serchObj).length > 0) {
      dispatch(getFilterdTicketData({ limit, start, serchObj }));
      // } else if (loginUser?.role?.toLowerCase() === "client") {
      //   dispatch(
      //     clientTicketData({
      //       key: loginUser?.oid,
      //       limit,
      //       start,
      //       status: status,
      //     })
      //   );
      // }
    } else if (
      loginUser?.role?.toLowerCase() === "expert" &&
      !teamLeader?.isTeamLead
    ) {
      dispatch(
        getExpertTicketData({
          key: loginUser?.oid,
          limit,
          start,
          status: status,
        })
      );
    } else if (
      loginUser?.role?.toLowerCase() === "expert" &&
      teamLeader?.isTeamLead
    ) {
      dispatch(
        getExpertTeamLeaderTicketData({
          key: teamLeader?.teamID,
          limit,
          start,
          status: status,
        })
      );
    } else if (
      loginUser?.role?.toLowerCase() === "administrator" ||
      loginUser?.role?.toLowerCase() === "supervisor" ||
      loginUser?.role?.toLowerCase() === "agent"
    ) {
      dispatch(getTicketData({ limit, start, status: status }));
    }
    dispatch(getProjectData());
    dispatch(getProvinceData());
    dispatch(getIncidentCategoryData());
    dispatch(getSingleUserData(loginUser.oid));
  }, [
    dispatch,
    serchObj,
    loginUser.oid,
    loginUser.role,
    teamLeader,
    limit,
    start,
    status,
    ticketNo,
    currentPage,
  ]);

  const {
    loading,
    deleteTicketError,
    updateTicketError,
    addTicketError,
    deleteTicketSuccess,
    updateTicketSuccess,
    addTicketSuccess,
    uploadScreenShotSuccess,
  } = useSelector((state) => state.ticket);

  // ! upload attachement

  useEffect(() => {
    if (addTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: "Ticket Created Successfully",
        showConfirmButton: true,
        customClass: {
          confirmButton: "btn add-button px-4 py-2",
        },
        buttonsStyling: false,
      });
      if (loginUser?.role?.toLowerCase() === "client") {
        dispatch(
          clientTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        !teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTeamLeaderTicketData({
            key: teamLeader?.teamID,
            limit,
            start,
            status,
          })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "administrator" ||
        loginUser?.role?.toLowerCase() === "supervisor" ||
        loginUser?.role?.toLowerCase() === "agent"
      ) {
        dispatch(getTicketData({ limit, start, status }));
      }
    }

    if (updateTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: "Ticket Updated Successfully",
        showConfirmButton: true,
        customClass: {
          title: "default-fz",
          confirmButton: "btn add-button px-4 py-2",
        },
        buttonsStyling: false,
      });

      dispatch(clearSuccessAndError());
      if (loginUser?.role?.toLowerCase() === "client") {
        dispatch(
          clientTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        !teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTeamLeaderTicketData({
            key: teamLeader?.teamID,
            limit,
            start,
            status,
          })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "administrator" ||
        loginUser?.role?.toLowerCase() === "supervisor" ||
        loginUser?.role?.toLowerCase() === "agent"
      ) {
        dispatch(getTicketData({ limit, start, status }));
      }
    }
    if (uploadScreenShotSuccess) {
      Swal.fire({
        icon: "success",
        title: "Upload screenshot successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        dispatch(clearSuccessAndError());
        dispatch(clearUploadAttachment());
        setAttacehMent(null);
        console.log({ uploadScreenShotSuccess });
      });
      if (loginUser?.role?.toLowerCase() === "client") {
        dispatch(
          clientTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTeamLeaderTicketData({
            key: teamLeader?.teamID,
            limit,
            start,
            status,
          })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "administrator" ||
        loginUser?.role?.toLowerCase() === "supervisor" ||
        loginUser?.role?.toLowerCase() === "agent"
      ) {
        dispatch(getTicketData({ limit, start, status }));
      }
    }
    if (deleteTicketSuccess) {
      Swal.fire({
        icon: "success",
        title: "Ticket Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (addTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Creation Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (updateTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Update Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
    if (deleteTicketError) {
      Swal.fire({
        icon: "error",
        title: "Ticket Delete Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        dispatch(clearSuccessAndError());
      }, 1500);
    }
  }, [
    addTicketError,
    addTicketSuccess,
    deleteTicketError,
    deleteTicketSuccess,
    updateTicketError,
    updateTicketSuccess,
    dispatch,
    loginUser?.oid,
    loginUser?.role,
    teamLeader?.isTeamLead,
    teamLeader?.teamID,
    start,
    limit,
    status,
    uploadScreenShotSuccess,
    setAttacehMent,
  ]);

  // ! close ticket success
  useEffect(() => {
    if (closeTicketSuccess) {
      if (loginUser?.role?.toLowerCase() === "client") {
        dispatch(
          clientTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        !teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTicketData({ key: loginUser?.oid, limit, start, status })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "expert" &&
        teamLeader?.isTeamLead
      ) {
        dispatch(
          getExpertTeamLeaderTicketData({
            key: teamLeader?.teamID,
            limit,
            start,
            status,
          })
        );
      } else if (
        loginUser?.role?.toLowerCase() === "administrator" ||
        loginUser?.role?.toLowerCase() === "supervisor" ||
        loginUser?.role?.toLowerCase() === "agent"
      ) {
        dispatch(getTicketData({ limit, start, status }));
      }
      dispatch(clearSuccessAndError());
    }
  }, [closeTicketSuccess]);

  // ! upload image if ticket created successfully
  useEffect(() => {
    if (
      (addTicketSuccess && attacehMent) ||
      (updateTicketSuccess && attacehMent)
    ) {
      const formData = new FormData();
      formData.append("Ffile", attacehMent);

      const data = {
        id: newCreatedTicket?.oid,
        img: formData,
      };
      dispatch(uploadScreenShot(data));
    }
    dispatch(clearSuccessAndError());
    dispatch(clearUploadAttachment());
    console.log("attacment", attacehMent);
  }, [
    dispatch,
    newCreatedTicket?.oid,
    addTicketSuccess,
    attacehMent,
    updateTicketSuccess,
  ]);

  return (
    <>
      <NavMenu />
      <Container fluid className="px-md-5">
        {loading ? (
          <div
            style={{
              minHeight: "81vh",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Spinner />
          </div>
        ) : (
          <SearchIndexCard
            setSearchObj={setSearchObj}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            handlePagination={handlePagination}
            limit={limit}
            setLimit={setLimit}
            status={status}
            setStatus={setStatus}
            ticketNo={ticketNo}
            setTicketNo={setTicketNo}
          />
        )}
        <div></div>
      </Container>
      <Footer />
    </>
  );
}

export default SearchIndex;
