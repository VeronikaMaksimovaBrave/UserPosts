import React, { useEffect, useState } from 'react'
import { getUsers } from '../../../api/queries'
import { columns } from './config'
import TableHead from '../tableHead'
import TableRow from '../tableRow'

import {
    Paper,
    Table,
    TableBody,
    TableContainer,
} from '@material-ui/core'
import useStyles from './styles'


const TableMain = () => {
    const classes = useStyles()

    const [users, setUsers] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)


    useEffect(() => {
        if (fetching) {
            getUsers(currentPage + 1)
                .then(response => {
                    setUsers([...users, ...response.data.data])
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])



    const scrollHandler = (id) => {
        if (id > users.length - 10) {
            setCurrentPage(prevState => prevState + 1)
            setFetching(true)
        }
    }

    return (
        <Paper className={classes.root} >
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead columns={columns} />
                    <TableBody >
                        {users.map((row, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    columns={columns}
                                    row={row}
                                    scrollhandler={scrollHandler}
                                />
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper >
    )
}

export default TableMain