import axios from "axios";
import React, { Fragment } from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useDispatch } from "react-redux";
import {
  Card,
  Form,
  Modal,
  Label,
  Input,
  Button,
  CardBody,
  ModalBody,
} from "reactstrap";
import { getAllSyncData } from "../../pages/syncronise/store";

function SyncMOdal({ open, setOpen, sync, setSync }) {
  const dispatch = useDispatch();

  // ! handler are declared here
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URL}/tuso-api/Sync`, {
        synced: sync,
      })
      .then(() => {
        dispatch(getAllSyncData());
        alert("successfully add");
        setOpen(!open);
      })
      .catch(() => {
        alert("failure");
      });
  };

  const handleReset = () => {
    setSync("");
    setOpen(!open);
  };
  return (
    <Fragment>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <h3 className="mb-1 font-fallback display-6">Syncronyzation</h3>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Form onSubmit={handleSubmit}>
                <div className="mb-1">
                  <Label className="form-label" for="sync">
                    Sync Time
                  </Label>
                  <Input
                    type="text"
                    id="sync"
                    placeholder="Enter sync time"
                    value={sync}
                    onChange={(e) => setSync(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-start mt-4">
                  <Button className="add-button border-0 px-4" type="submit">
                    <CheckCircle size={18} className="me-2" />
                    Save
                  </Button>
                  &nbsp;
                  <Button
                    outline
                    color="secondary"
                    type="reset"
                    className="font-fallback px-4"
                    onClick={handleReset}
                  >
                    <ArrowLeftCircle size={18} className="me-2" />
                    Back
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </Fragment>
  );
}

export default SyncMOdal;
