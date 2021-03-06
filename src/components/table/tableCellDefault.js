import React from 'react'
import {
    TableCell as TCell
} from '@material-ui/core'

export const TableCellDefault = ({
    column,
    row,
    scrollhandler,
    value
}) => {
    return (
        <TCell
            key={column.id}
            align={column.align}
            onMouseEnter={() => {
                scrollhandler(row.id)
            }}
        >
            {value}
        </TCell>
    )
}