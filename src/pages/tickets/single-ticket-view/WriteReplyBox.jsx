import React from "react";
import { ArrowLeftCircle, CheckCircle } from "react-feather";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  FormGroup,
  Input,
} from "reactstrap";

function WriteReplyBox({
  description,
  setDescription,
  handleMessageSend,
  open,
  setOpen,
}) {
  return (
    <Card className="border-0">
      <CardHeader className="bg-white">
        <h6 className="mb-0 font-fallback display-6">Message</h6>
      </CardHeader>
      <CardBody>
        <FormGroup>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            placeholder="The entered message must not exceed 500 characters."
            style={{ height: "100px" }}
            className=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <div className="d-flex justify-content-start align-items-center">
          <Button
            className="add-button border-0 px-3 py-2"
            onClick={() => {
              handleMessageSend();
              setDescription("");
              setOpen(!open);
            }}
          >
            <CheckCircle size={18} className="me-2" />
            Send
          </Button>
          &nbsp;
          <Button
            outline
            color="secondary"
            className="px-3 py-2"
            onClick={() => {
              setDescription("");
              setOpen(!open);
            }}
          >
            <ArrowLeftCircle size={18} className="me-2" />
            Back
          </Button>
        </div>
      </CardBody>
    </Card>
  );
}

export default WriteReplyBox;
