import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
const EssayQuestion = (props) => {
    const [response, setTutorials] = useState([]);
    const retrieveTutorials = () => {
        const { tutorials, totalPages } = {
            tutorials: [
                {
                    invoice_date: "18 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
                {
                    invoice_date: "19 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
                {
                    invoice_date: "20 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
                {
                    invoice_date: "21 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
                {
                    invoice_date: "22 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
                {
                    invoice_date: "23 Oct 2021",
                    company: "ABC Enterprise",
                    invoice_no: "INV/ABC/21-22/109",
                },
            ],
            totalPages: 1,
        };
        setTutorials(tutorials);
    };

    useEffect(retrieveTutorials, []);
    const columns = useMemo(
        () => [
            {
                Header: "invoice_date",
                accessor: "invoice_date",
            },
            {
                Header: "invoice Company",
                accessor: "company",
            },
            {
                Header: "Invoice No.",
                accessor: "invoice_no",
            },
        ],
        []
    );
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data: response,
    });
    return (
        <div>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                {response.length > 0 ? (
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return (
                                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                                        );
                                    })}
                                </tr>
                            );
                        })}
                    </tbody>
                ) : (
                    <tbody>
                        <tr>
                            <td colSpan="8">
                                <figure className="noRecord-found"></figure>
                                <span className="norecord-text">No records found</span>
                            </td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    );
};
export default EssayQuestion;