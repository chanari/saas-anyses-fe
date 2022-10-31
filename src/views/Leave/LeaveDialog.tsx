import React, {Dispatch, SetStateAction, useContext, useEffect} from "react"
import {
  Box,
  Button, Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select,
  TextField
} from "@mui/material";
import dayjs, {Dayjs} from "dayjs";
import {MobileDatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {useGlobalContext} from "../../contexts/GlobalContext";
import {callAPI} from "../../controllers/api";
import {AxiosError} from "axios";

interface Props {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  setChildUpdate: Dispatch<SetStateAction<boolean>>;
  currentRow: LeaveForm | null
}

export interface LeaveForm {
  id: string | null;
  leaveDate: Dayjs | null;
  leaveType: string;
  reason: string;
  confirmed: boolean;
}

const leaveFormFieldRequired = ["leaveType", "leaveDate", "reason"] as const

const leaveParams = (leaveForm: LeaveForm) => {
  return {
    leave_application: {
      remarks: leaveForm.reason,
      date_of_application: leaveForm.leaveDate?.format("YYYY-MM-DD"),
      application_confirmed: leaveForm.confirmed,
      leave_type: leaveForm.leaveType,
    }
  }
}

const LeaveDialog = ({dialogOpen, setDialogOpen, setChildUpdate, currentRow}: Props) => {
  const {dispatch} = useGlobalContext()

  const leaveFormDefault = {
    id: null,
    leaveDate: dayjs(),
    leaveType: "",
    reason: "",
    confirmed: false,
  }

  const [leaveForm, setLeaveForm] = React.useState<LeaveForm>(leaveFormDefault)

  const createLeaveApplication = async () => {
    const path = `/api/v1/leave_applications/${leaveForm.id ? leaveForm.id : ''}`
    const method = (leaveForm.id ? "put" : "post")
    try {
      const reponse = await callAPI({
        path: path,
        method: method,
        body: leaveParams(leaveForm)
      })

      if (reponse) {
        dispatch({type: "SET_SNACKBAR", payload: {message: 'success', severity: 'success'}})
        setDialogOpen(false)
        setChildUpdate(true)
      }
    } catch (e) {
      const axiosErr = e as AxiosError
      // @ts-ignore
      const messageErr = axiosErr.response?.data?.error
      dispatch({
        type: "SET_SNACKBAR",
        payload: {message: messageErr, severity: 'error'}
      })
    }
  }

  useEffect(() => {
    setLeaveForm(currentRow ?? leaveFormDefault)
  }, [currentRow])

  const handleSubmit = () => {
    const isFormValid = leaveFormFieldRequired.every((field) => leaveForm[field])
    if (isFormValid) {
      createLeaveApplication()
      setLeaveForm(leaveFormDefault)
    }
  }

 return (
   <>
     <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Leave Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To submit this application to this admin, please enter your information here. We
            will send updates occasionally.
          </DialogContentText>

          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <FormControl fullWidth>
                    <MobileDatePicker
                      label="Leave Date"
                      inputFormat="DD/MM/YYYY"
                      value={leaveForm.leaveDate}
                      disablePast={true}
                      onChange={(value) => setLeaveForm({...leaveForm, leaveDate: value})}
                      renderInput={(params) => <TextField name="leaveDate" {...params} />}
                    />
                  </FormControl>
                </LocalizationProvider>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth error={!leaveForm.leaveType}>
                  <InputLabel id="leave-type">Leave Type*</InputLabel>
                  <Select
                    labelId="leave-type"
                    id="leave-type-select"
                    label="Leave Type"
                    value={leaveForm.leaveType}
                    onChange={(e) => setLeaveForm({...leaveForm, leaveType: e.target.value})}
                  >
                    <MenuItem selected value=""><em>None</em></MenuItem>
                    <MenuItem value="morning">Morning</MenuItem>
                    <MenuItem value="afternoon">Afternoon</MenuItem>
                    <MenuItem value="full">Full</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <TextField
                    required
                    error={!leaveForm.reason}
                    label="Reason"
                    multiline
                    maxRows={4}
                    value={leaveForm.reason}
                    onChange={(e) => setLeaveForm({...leaveForm, reason: e.target.value})}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox
                    checked={leaveForm.confirmed}
                    onChange={(e) => {
                      setLeaveForm({...leaveForm, confirmed: e.target.checked})
                    }} />}
                  label="Asked permission from Manager?"
                  name="managerConfirmed"
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions sx={{mb: 1}}>
          <Button variant="outlined" onClick={() => setDialogOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
   </>
 )
}

export default LeaveDialog
