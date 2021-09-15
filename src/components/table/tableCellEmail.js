import React, { useEffect, useState } from 'react'

import {
    TableCell as TCell,
    Tooltip
} from '@material-ui/core'

import { getPosts } from '../../api/queries'

export const TableCellEmail = ({
    column,
    row,
    scrollhandler,
    value
}) => {

    const [postID, setPostID] = useState(0)
    const [userPosts, setUserPosts] = useState([])
    const [fetchingPost, setFetchingPost] = useState(true)

    useEffect(() => {
        if (fetchingPost && postID) {
            getPosts(postID)
                .then(response => {
                    setUserPosts(response.data.data)
                })
                .finally(() => setFetchingPost(false))
        }
    }, [fetchingPost, postID])

    const showUserPosts = (id) => {
        setPostID(id)
        setFetchingPost(true)
    }

    const countPosts = userPosts.length.toString()

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
        </Tooltip >
    )
}