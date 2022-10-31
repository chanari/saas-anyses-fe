import React, {useEffect} from "react"
import {Alert, Snackbar} from "@mui/material";
import {useGlobalContext} from "../../contexts/GlobalContext";

type Props = {
  open: boolean
  severity: "success" | "info" | "warning" | "error"
  message: string
}
const GlobalSnackbar = ({open, severity, message}: Props) => {
  const {dispatch} = useGlobalContext()

  const [openSnack, setOpenSnack] = React.useState(false);

  useEffect(() => {
    setOpenSnack(open)
  }, [open])

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setOpenSnack(false);
    dispatch({type: "RESET_SNACKBAR"})
  };

  return (
    <Snackbar
      open={openSnack}
      autoHideDuration={3000}
      anchorOrigin={{vertical: 'top', horizontal: 'right'}}
      onClose={handleClose}
    >
      <Alert severity={severity} sx={{width: '100%'}} onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default GlobalSnackbar
