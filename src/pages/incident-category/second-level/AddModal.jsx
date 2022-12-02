import React from "react";
import { useState } from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  Row,
} from "reactstrap";
import fistLevelCategoryValidator from "../../../validator/firstLevelCategoryValidation";
import { addIncidentCategoryData } from "../store";

function AddModal({ open, setOpen }) {
  // ! states are declared here
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [validationResult, setValidationResult] = useState({});

  // ! hooks are declared here
  const dispatch = useDispatch();

  // ! functions are declared here
  const parentCategory = useSelector(
    (state) => state.incidentCategory.selectedIncidentCategory
  );
  // ! functions are declared here
  const onSubmit = () => {
    const newIncident = {
      incidentCategorys: categoryName,
      description: description,
      parentID: parentCategory.oid,
    };

    const validation = fistLevelCategoryValidator(newIncident);

    if (validation.isValid) {
      dispatch(addIncidentCategoryData(newIncident));
      setCategoryName("");
      setDescription("");
      setOpen(false);
    } else {
      setValidationResult(validation);
    }
  };

  const handleReset = () => {
    setCategoryName("");
    setDescription("");
    setOpen(false);
    setValidationResult({});
  };

  return (
    <>
      <Modal
        isOpen={open}
        toggle={() => setOpen(!open)}
        className="modal-dialog-centered"
        size="lg"
      >
        <ModalBody className="">
          <div className="display-6 font-fallback">
            Create Second Level Category
          </div>
          <hr className="border border-2 border-dark my-4" />
          <Card className="">
            <CardBody>
              <Row className="my-3">
                <Col md={5} className="font-fallback default-fz">
                  Category Name
                </Col>
                <Col md={7} className="font-fallback default-fz">
                  {parentCategory?.incidentCategorys}
                </Col>
              </Row>

              <Row>
                <Col md={12} className="font-fallback default-fz my-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="name">
                      Second Level Category<span className="orange-400">*</span>
                    </Label>
                    {validationResult?.error?.incidentCategorys && (
                      <p className="text-danger">
                        {validationResult.error?.incidentCategorys}
                      </p>
                    )}
                  </div>
                  <Input
                    id="facilityName"
                    type="text"
                    value={categoryName}
                    maxLength={90}
                    className={
                      validationResult?.error?.incidentCategorys
                        ? "is-invalid"
                        : ""
                    }
                    onChange={(e) => setCategoryName(e.target.value)}
                  />
                </Col>
                <Col md={12} className="font-fallback default-fz my-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <Label className="form-label" for="description">
                      Description<span className="orange-400">*</span>
                    </Label>
                    {validationResult?.error?.description && (
                      <p className="text-danger">
                        {validationResult?.error?.description}
                      </p>
                    )}
                  </div>
                  <Input
                    id="description"
                    type="textarea"
                    value={description}
                    maxLength={250}
                    className={
                      validationResult?.error?.description ? "is-invalid" : ""
                    }
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Col>
              </Row>
              <div className="d-flex justify-content-start my-2">
                <Button
                  className="me-2 add-button border-0 px-4"
                  onClick={onSubmit}
                >
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
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    </>
  );
}

export default AddModal;
