// import { Tab } from 'react-bootstrap';
// import { useTable } from 'react-table';
// import styled from 'styled-components';
// import React, { useState, useEffect, useMemo } from "react";

// // useTable에다가 작성한 columns와 data를 전달한 후 아래 4개의 props를 받아온다
// const Table = ({ props }) => {
//     const [data, setData] = useState([]);
//     const retrieveData = () => {
//         const { data, totalPages } = {
//             data: [
//                 {
//                     email: "이메일이에용",
//                     walletID: "아이디에용",
//                     created_at: "2021-08-03 01:14:47",
//                     edited_at: "2021-08-03 01:15:49",
//                     coin_list: ["TRV", "BTC", "BCH", "ETH"]
//                 },
//             ], totalPages: 1,
//         };
//         setData(data);
//     };


//     useEffect(retrieveData, []);
//     const columnData = useMemo(
//         () => [
//             {
//                 accessor: 'email',
//                 Header: 'Email',
//             },
//             {
//                 accessor: 'walletID',
//                 Header: 'Wallet ID',
//             },
//             {
//                 accessor: 'coin_list',
//                 Header: 'Wallet Balance',
//             },
//             {
//                 accessor: 'created_at',
//                 Header: 'Created At',
//             },
//             {
//                 accessor: 'edited_at',
//                 Header: 'Edited At',
//             },
//         ],
//         []
//     );

//     const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//         useTable({ columnData, data: data, });

//     return (

//         <TableSheet {...getTableProps()}>
//             <TableHead>
//                 {headerGroups.map(header => (
//                     // getHeaderGroupProps를 통해 header 배열을 호출한다
//                     <Header {...header.getHeaderGroupProps()}>
//                         {header.headers.map(col => (
//                             // getHeaderProps는 각 셀 순서에 맞게 header를 호출한다
//                             <Th {...col.getHeaderProps()}>{col.render('Header')}</Th>
//                         ))}
//                     </Header>
//                 ))}
//             </TableHead>
//             <tbody {...getTableBodyProps()}>
//                 {rows.map(row => {
//                     prepareRow(row);
//                     return (
//                         // getRowProps는 각 row data를 호출해낸다
//                         <tr {...row.getRowProps()}>
//                             {row.cells.map(cell => (
//                                 // getCellProps는 각 cell data를 호출해낸다
//                                 <Td {...cell.getCellProps()}>{cell.render('Cell')}</Td>
//                             ))}
//                         </tr>
//                     );
//                 })}
//             </tbody>
//         </TableSheet>
//     );
// };

// export default Table;