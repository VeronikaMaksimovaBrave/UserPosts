import TableCellEmail from '../table/tableCellEmail'
import TableCellDefault from '../table/tableCellDefault'

import React from "react"
import {
    TableRow as TRow
} from '@material-ui/core'

export const TableRow = ({
    columns,
    row,
    scrollhandler,
}) => {

    const rowRender = (column, value) => {
        if (column.id === 'email') {
            return (
                <TableCellEmail
                    key={column.id}
                    column={column}
                    row={row}
                    scrollhandler={(id) => scrollhandler(id)}
                    value={value}
                />
            )
        }
        else return (
            <TableCellDefault
                key={column.id}
                column={column}
                row={row}
                scrollhandler={(id) => scrollhandler(id)}
                value={value}
            />
        )
    }

    return (
        <TRow hover role="checkbox" tabIndex={-1} key={row.code}>
            {columns.map((column) => {
                const value = row[column.id]
                return rowRender(column, value)
            })}
        </TRow>)
}