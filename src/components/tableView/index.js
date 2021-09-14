import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core'
import useStyles from './styles'


const TableView = () => {
    const classes = useStyles()

    const [users, setUsers] = useState([])
    const [postID, setPostID] = useState(0)
    const [userPosts, setUserPosts] = useState([])
    const [currentPage, setCurrentPage] = useState(0)
    const [fetching, setFetching] = useState(true)
    const [fetchingPost, setFetchingPost] = useState(true)

    useEffect(() => {
        if (fetching) {
            axios.get(`https://gorest.co.in/public-api/users?page=${currentPage + 1}`)
                .then(response => {
                    setUsers([...users, ...response.data.data])
                })
                .finally(() => setFetching(false))
        }
    }, [fetching])

    useEffect(() => {
        if (fetchingPost) {
            axios.get(`https://gorest.co.in/public-api/posts?user_id=${postID}`)
                .then(response => {
                    setUserPosts(response.data.data)
                })
                .finally(() => setFetchingPost(false))
        }
    }, [fetchingPost])

    const scrollHandler = (id) => {
        if(id > users.length - 10){
            setCurrentPage(prevState => prevState + 1)
            setFetching(true)
        }
    }

    const getPosts = (id) => {
        setPostID(id)
        setFetchingPost(true)
    }

    const columns = [
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 200 },
        {
            id: 'gender',
            label: 'Gender',
            minWidth: 100,
            align: 'right'
        },
        {
            id: 'status',
            label: 'Status',
            minWidth: 170,
            align: 'right'
        },
    ]

    return (
        <Paper className={classes.root} >
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody >
                        {users.map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id]

                                        return (
                                            <TableCell key={column.id} align={column.align} onMouseEnter={() => column.id === 'email' ? getPosts(column.id === 'email' ? row.id : {}):scrollHandler(row.id)}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    )
}

export default TableView