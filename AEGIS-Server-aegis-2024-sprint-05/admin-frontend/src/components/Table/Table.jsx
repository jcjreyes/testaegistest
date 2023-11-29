import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { useTable, usePagination } from 'react-table';

const TableContainer = styled.table`
    width: 100%;
    margin: 2% 0;
    border-spacing: 0;
`;
const TableHeaders = styled.thead``;
const TableHeaderRow = styled.tr`
    background: transparent;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;
`
const TableRow = styled.tr`
    background: transparent;

    :nth-child(2n+1) {
        background: rgba(189, 189, 189, 0.1);
    }
`;
const TableHeader = styled.th`
    width: auto;
    min-height: 48px;
    padding: 0.5rem 0.75rem;
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 10px;
    line-height: 3rem;
    text-align: left;
    vertical-align: middle;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #333333;
    border-top: 1px solid #E2E2E2;
    border-bottom: 1px solid #E2E2E2;
`;
const TableBody = styled.tbody``;
const TableCell = styled.td`
    font-family: 'Montserrat', sans-serif;
    font-size: 0.8rem;
    line-height: 3rem;
    padding: 0.5rem 0.75rem;
    color: #333;
    text-align: left;
    vertical-align: middle;
`;

function Table({ columns, data }) {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
      } = useTable(
        {
            columns,
            data
        }, 
        usePagination,
      );

    return (
        <TableContainer {...getTableProps()}>
            <TableHeaders>
                {// Loop over the header rows
                    headerGroups.map(headerGroup => (
                        <TableHeaderRow {...headerGroup.getHeaderGroupProps()}>
                            {// Loop over the headers in each row
                            headerGroup.headers.map(column => (
                                // Apply the header cell props
                                <TableHeader {...column.getHeaderProps()}>
                                    {// Render the header
                                    column.render("Header")}
                                </TableHeader>
                            ))}
                        </TableHeaderRow>
                    ))
                }
            </TableHeaders>
            {/* Apply the table body props */}
            <TableBody {...getTableBodyProps()}>
                {// Loop over the table rows
                    rows.map((row, i) => {
                        // Prepare the row for display
                        prepareRow(row);
                        return (
                            // Apply the row props
                            <TableRow {...row.getRowProps()}>
                                {// Loop over the rows cells
                                row.cells.map(cell => {
                                // Apply the cell props
                                return (
                                    <TableCell {...cell.getCellProps()}>
                                        {// Render the cell contents
                                        cell.render('Cell')}
                                    </TableCell>
                                )
                                })}
                            </TableRow>
                        );
                    })
                }
            </TableBody>
        </TableContainer>
    )
};

export default Table;