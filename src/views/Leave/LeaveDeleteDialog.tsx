import React, {Dispatch, SetStateAction} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import {IconButton} from "@mui/material";
import {useGlobalContext} from "../../contexts/GlobalContext";
import {callAPI} from "../../controllers/api";

type Props = {
  rowId: string
  setChildUpdate: Dispatch<SetStateAction<boolean>>
}

const LeaveDeleteDialog = ({rowId, setChildUpdate}: Props) => {
  const {dispatch} = useGlobalContext()

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = async () => {
    try {
      const reponse = await callAPI({
        path: `/api/v1/leave_applications/${rowId}`,
        method: "delete",
      })

      if (reponse) {
        dispatch({type: "SET_SNACKBAR", payload: {message: 'success', severity: 'success'}})
        setOpen(false)
        setChildUpdate(true)
      }
    } catch (e) {
      dispatch({
        type: "SET_SNACKBAR",
        payload: {message: "error", severity: "error"}
      })
    }
  }

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <DeleteIcon sx={{color: "#ef5350"}} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          {"Leave Application Delete?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleOk} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default LeaveDeleteDialog
