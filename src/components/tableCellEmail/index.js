/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { getPosts } from '../../utils/queries'
import {
    TableCell as TCell,
    Tooltip
} from '@material-ui/core'

const TableCellEmail = ({
    column,
    row,
    scrollhandler,
    value
}) => {

    const [postID, setPostID] = useState(0)
    const [userPosts, setUserPosts] = useState([])
    const [fetchingPost, setFetchingPost] = useState(true)

    useEffect(() => {
        if (fetchingPost) {
            getPosts(postID)
                .then(response => {
                    setUserPosts(response.data.data)
                })
                .finally(() => setFetchingPost(false))
        }
    }, [fetchingPost])

    const showUserPosts = (id) => {
        setPostID(id)
        setFetchingPost(true)
    }

    const countPosts = userPosts.length ?? '0'

    return (
        <Tooltip title={countPosts} key={column.id} placement='right'>
            <TCell
                key={column.id}
                align={column.align}
                onMouseEnter={() => {
                    showUserPosts(row.id)
                    scrollhandler(row.id)
                }}
            >
                {value}
            </TCell>
        </Tooltip>
    )
}

export default TableCellEmail