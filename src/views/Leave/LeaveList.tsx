import * as React from 'react';
import {useEffect, useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import {callAPI} from "../../controllers/api";
import EditIcon from '@mui/icons-material/Edit';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LeaveDialog, {LeaveForm} from "./LeaveDialog";
import {Chip, Grid} from "@mui/material";
import LeaveDeleteDialog from "./LeaveDeleteDialog";
import IconButton from "@mui/material/IconButton";
import dayjs from "dayjs";

interface ResponseAPI {
  id: string;
  attributes: {
    date_of_application: string;
    leave_type: string;
    remarks: string;
    leave_status: string;
    application_confirmed: boolean;
  };
}

interface LeaveColumn {
  id: 'leaveType' | 'leaveDate' | 'leaveStatus' | 'note';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string) => string | JSX.Element;
}

const capitalizeStr = (str: string) => {
  const lower = str.toLowerCase();
  return str.charAt(0).toUpperCase() + lower.slice(1);
}

const statusFormat = (str: string) => {
  if (str === 'approved') return (<Chip label={capitalizeStr(str)} color="success" variant="outlined" />)
  if (str === 'denied') return (<Chip label={capitalizeStr(str)} color="error" variant="outlined" />)
  if (str === 'pending') return (<Chip label={capitalizeStr(str)} color="primary" variant="outlined" />)
  return (<Chip label={str} />)
}

const leaveColumns: readonly LeaveColumn[] = [
  {id: "leaveType", label: "LeaveType", format: (value) => capitalizeStr(value)},
  {id: "leaveDate", label: "LeaveDate"},
  {id: "leaveStatus", label: "LeaveStatus", format: (value) => statusFormat(value)},
  {id: "note", label: "Note"},
]

export interface LeaveData {
  id: string;
  leaveType: string;
  leaveDate: string;
  leaveStatus: string;
  note: string;
  confirmed: boolean;
}

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [totalCount, setTotalCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false)
  const [childUpdate, setChildUpdate] = useState<boolean>(false)
  const [leaveList, setLeaveList] = useState<ResponseAPI[]>([])
  const [currentRow, setCurrentRow] = useState<LeaveForm|null>(null)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const loadLeaves = async () => {
    const response = await callAPI({
      path: "/api/v1/leave_applications",
      method: "get",
      query: {
        page: (page + 1),
        items: rowsPerPage
      }
    })

    setTotalCount(parseInt(response?.headers["total-count"] ?? '0'))
    setLeaveList(response?.data.data)
  }

  useEffect(() => {
    loadLeaves()
  }, [page, rowsPerPage])

  useEffect(() => {
    if (childUpdate) {
      loadLeaves()
      setChildUpdate(false)
    }
  }, [childUpdate])

  const leaveRows: LeaveData[] = leaveList.map((row) => {
    let attributes = row.attributes

    return {
      id: row.id,
      leaveDate: attributes.date_of_application,
      note: attributes.remarks,
      leaveType: attributes.leave_type,
      leaveStatus: attributes.leave_status,
      confirmed: attributes.application_confirmed,
    }
  })

  const handleDialogOpen = (rowId: string | null = null) => {
    setDialogOpen(true)
    const row = leaveRows.find((leave) => leave.id === rowId)
    if (!row) return setCurrentRow(null)

    if (row) {
      const leaveForm: LeaveForm = {
        id: row.id,
        leaveDate: dayjs(row.leaveDate),
        leaveType: row.leaveType,
        reason: row.note,
        confirmed: row.confirmed,
      }
      setCurrentRow(leaveForm)
    }
  }

  return (
    <React.Fragment>
      <Button variant="contained" style={{ marginBottom: 24 }} onClick={() => handleDialogOpen()}>
        <AddRoundedIcon />
      </Button>
      <LeaveDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        setChildUpdate={setChildUpdate}
        currentRow={currentRow}
      />

      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 540 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {leaveColumns.map((column) => (
                  <TableCell key={column.id} align={column.align} sx={{fontWeight: "bold"}}>
                    {column.label}
                  </TableCell>
                ))}
                <TableCell align="right" />
              </TableRow>
            </TableHead>
            <TableBody>
              {leaveRows.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {leaveColumns.map((column) => {
                      const value = row[column.id]
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format ? column.format(value) : value}
                        </TableCell>
                      );
                    })}
                    <TableCell sx={{width: "170px"}}>
                      {row["leaveStatus"] === "pending" && <>
                        <Grid container alignItems="center" spacing={1}>
                          <Grid item>
                            <IconButton onClick={() => handleDialogOpen(row.id)}>
                              <EditIcon color="primary" />
                            </IconButton>
                          </Grid>
                          <Grid item>
                            <LeaveDeleteDialog rowId={row.id} setChildUpdate={setChildUpdate} />
                          </Grid>
                        </Grid>
                      </>}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </React.Fragment>
  );
}
