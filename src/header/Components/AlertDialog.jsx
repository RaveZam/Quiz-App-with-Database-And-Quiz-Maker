import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({ open, setOpen }) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          style: {
            backgroundColor: "#171217", // Black background for the dialog
            color: "white", // White text color
            border: "2px solid #5c2e6b", // Purple border
          },
        }}
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{
            color: "purple", // Purple color for the title
          }}
        >
          {"Login In Required"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              color: "white", // White color for the content text
            }}
          >
            Please log in to access this feature. Your account ensures a
            personalized and secure experience
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button
            onClick={handleClose}
            style={{
              color: "purple", // Purple text for the buttons
            }}
          >
            Disagree
          </Button> */}
          <Button
            onClick={handleClose}
            autoFocus
            style={{
              marginRight: "12px",
              color: "purple", // Purple text for the buttons
            }}
          >
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
