import React, { useState, useEffect, useMemo } from "react";
import { useTable } from "react-table";
import "./Table.css";

const Table = (props) => {
    const [response, setResponse] = useState([]);
    const retrieveResponse = () => {
        const { data, totalPages } = {
            data: [
                {
                    Email: "abc123@example.com",
                    Name: "임채윤",
                    Question1: "1번문항 답변내용",
                    Question2: "2번문항 답변내용",
                },
                {
                    Email: "def456@example.com",
                    Name: "박수빈",
                    Question1: "1번문항 답변내용",
                    Question2: "2번문항 답변내용",
                },
            ],
            totalPages: 1,
        };
        setResponse(data);
    };

    useEffect(retrieveResponse, []);
    const columns = useMemo(
        () => [
            {
                Header: "이메일",
                accessor: "Email",
            },
            {
                Header: "이름",
                accessor: "Name",
            },
            {
                Header: "첫번째문항",
                accessor: "Question1",
            },
            {
                Header: "두번째문항",
                accessor: "Question2",
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
        <>
            <div className="table-box-wrap">
                <div className="table-box">
                    <table style={{ margin: "0px auto 40px auto", textAlign: "center" }} {...getTableProps()}>
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
                            <tbody className="tbody" >
                                <tr>
                                    <td>
                                        <figure className="noRecord-found"></figure>
                                        <span className="norecord-text">No records found</span>
                                    </td>
                                </tr>
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
        </>
    );
};
export default Table;