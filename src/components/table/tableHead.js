import React from "react"
import {
    TableCell,
    TableHead as THead,
    TableRow,
} from '@material-ui/core'

export const TableHead = ({ columns }) => {
    return (
        <THead>
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
        </THead>
    )
}