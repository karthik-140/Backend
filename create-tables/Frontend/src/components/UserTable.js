// import { useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import { Table, TableContainer, TableHead, TableRow, TableCell, Paper, TableBody } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { useSelector, useDispatch } from 'react-redux'
import { tableActions } from '../store/tableSlice';

const UserTable = ({ fetch, setFetch, table }) => {
  // const [users, setUsers] = useState([])
  const { tableName } = useSelector((state) => state.table)
  const dispatch = useDispatch()

  // const fetchUsers = useCallback(async () => {
  //   setFetch(false)
  //   try {
  //     const response = await axios.get("http://localhost:3001/users")
  //     // console.log(response)
  //     const data = response?.data?.response
  //     setUsers(() => [...data])
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }, [setFetch])

  // useEffect(() => {
  //   fetchUsers()
  // }, [fetch, fetchUsers])

  const deleteHandler = async (id) => {
    console.log(tableName)
    try {
      await axios.delete(`http://localhost:3001/delete/${id}`, {
        params: {
          tableName: tableName
        }
      })
    } catch (err) {
      console.log(err)
    }
    // setFetch(true)
    dispatch(tableActions.fetchTable())
  }

  // const displayUsers = users.map((user) => {
  //   return (
  //     <TableRow key={`${user.id}`}>
  //       <TableCell>{user.name}</TableCell>
  //       <TableCell>{user.email}</TableCell>
  //       <TableCell>{user.phone}</TableCell>
  //       <TableCell><DeleteIcon onClick={() => deleteHandler(user.id)} className='text-red-600 cursor-pointer' /></TableCell>
  //     </TableRow>
  //   )
  // })

  const tableHeaders = table[1]?.slice(1).map((header, idx) => {
    return (
      <TableCell key={idx}>{header.name}</TableCell>
    )
  })

  const tableBody = table[0]?.map((row, idx) => {
    return (
      <TableRow key={`${row.id}`}>
        {Object.keys(row).slice(1).map((key, idx) => (
          <TableCell key={`row-${idx}`}>{row[key]}</TableCell>
        ))}
        <TableCell><DeleteIcon onClick={() => deleteHandler(row.id)} className='text-red-600 cursor-pointer' /></TableCell>
      </TableRow>
    )
    // return (
    //   <TableRow key={`${row.id}`}>
    //     <TableCell>{row.name}</TableCell>
    //     <TableCell><DeleteIcon onClick={() => deleteHandler(row.id)} className='text-red-600 cursor-pointer' /></TableCell>
    //   </TableRow>
    // )
  })

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 600 }} >
        <TableHead >
          <TableRow>
            {/* <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Phone</TableCell> */}
            {tableHeaders}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {displayUsers} */}
          {tableBody}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserTable
