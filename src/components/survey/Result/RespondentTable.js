import React, { useEffect, useMemo, useState } from "react";
import { useTable } from "react-table";
import "./Table.css";

const RespondentTable = (props) => {
    const [response, setResponse] = useState([]);
    const retrieveResponse = () => {
        const { data, totalPages } = {
            data: [
                {
                    name: "홍길동",
                    gender: "남성",
                    age_range: "20~29",
                    email: "heykakao@example.com",
                    response_date: "2022-10-15"
                },
                {
                    name: "임채윤",
                    gender: "여성",
                    age_range: "20~29",
                    email: "heykakao2@example.com",
                    response_date: "2022-11-2"
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
                Header: "이름",
                accessor: "name",
            },
            {
                Header: "성별",
                accessor: "gender",
            },
            {
                Header: "연령대",
                accessor: "age_range",
            },
            {
                Header: "이메일",
                accessor: "email",
            },
            {
                Header: "응답 날짜",
                accessor: "response_date"
            }
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
export default RespondentTable;