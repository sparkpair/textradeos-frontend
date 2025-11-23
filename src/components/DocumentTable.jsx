// import {
//     Text,
//     View,
//     StyleSheet,
// } from "@react-pdf/renderer";
// import React from 'react'

// function DocumentTable({ columns, data }) {
//     // 1. Extract numeric widths for fixed columns
//     const fixedWidths = columns
//         .map(col => col.width)
//         .filter(w => w && w !== "auto")
//         .map(w => parseFloat(w));

//     const totalFixed = fixedWidths.reduce((a, b) => a + b, 0);

//     // 2. Count auto columns
//     const autoColumns = columns.filter(col => !col.width || col.width === "auto").length;

//     // 3. Remaining width distributed to auto columns
//     const autoWidth = autoColumns > 0 ? (100 - totalFixed) / autoColumns : 0;

//     // 4. Final column width resolver
//     const getColumnWidth = (width) => {
//         if (!width || width === "auto") return `${autoWidth}%`;
//         return `${parseFloat(width)}%`;
//     };

//     const tableStyles = StyleSheet.create({
//         table: {
//             display: "table",
//             width: "auto",
//             borderStyle: "solid",
//             borderWidth: 1,
//             borderColor: '#d1d5dc', // Match hr/summary box border color
//             borderRadius: 10,
//             padding: 3,
//         },
//         tableRowHeader: {
//             backgroundColor: "#127475",
//             color: "#ffff",
//             borderRadius: 7,
//             borderBottomWidth: 0,
//         },
//         tableRow: {
//             flexDirection: "row",
//             padding: "2.5 1.5",
//             borderStyle: 'solid',
//             borderBottomWidth: 1,
//             borderColor: '#ebe6e7',
//         },
//         // Table Header Cell
//         tableColHeader: {
//             padding: 4,
//             fontSize: 8,
//             fontWeight: '500',
//             textAlign: 'center', // Defaulting to center unless overridden
//         },
//         // Table Data Cell
//         tableCol: {
//             padding: 4,
//             fontSize: 8,
//             textAlign: 'left', // Defaulting to left unless overridden
//         },
//     });

//     return (
//         <View style={tableStyles.table}>
//             {/* Table Header */}
//             <View style={[tableStyles.tableRow, tableStyles.tableRowHeader]}>
//                 {columns.map((col, index) => (
//                     <View key={index} style={[tableStyles.tableColHeader, { width: getColumnWidth(col.width), textAlign: col.align || 'left' }]}>
//                         <Text>{col.label}</Text>
//                     </View>
//                 ))}
//             </View>
//             {/* Table Rows */}
//             {data.map((item, index) => (
//                 <View
//                     key={index}
//                     style={[
//                         tableStyles.tableRow,
//                         index === data.length - 1 && { borderBottomWidth: 0 } // ✅ remove border for last row
//                     ]}
//                 >
//                     {columns.map((col, colIndex) => (
//                         <View
//                             key={colIndex}
//                             style={[
//                                 tableStyles.tableCol,
//                                 { width: getColumnWidth(col.width), textAlign: col.align || 'left' }
//                             ]}
//                         >
//                             <Text>
//                                 {col.render ? col.render(item, index) : item[col.field]}
//                             </Text>
//                         </View>
//                     ))}
//                 </View>
//             ))}
//         </View>
//     );
// };

// export default DocumentTable


import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

function DocumentTable({ columns, data, startIndex = 0 }) {
    const fixedWidths = columns
        .filter(col => col.width && col.width !== "auto")
        .map(col => parseFloat(col.width));

    const totalFixed = fixedWidths.reduce((a, b) => a + b, 0);
    const autoCols = columns.filter(col => !col.width || col.width === "auto").length;
    const autoWidth = autoCols > 0 ? (100 - totalFixed) / autoCols : 0;

    const getWidth = w => (!w || w === "auto" ? `${autoWidth}%` : `${parseFloat(w)}%`);

    const styles = StyleSheet.create({
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: '#d1d5dc', // Match hr/summary box border color
            borderRadius: 10,
            padding: 3,
        },
        row: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#ebe6e7",
            padding: "7 6"
        },
        headerRow: {
            backgroundColor: "#127475",
            color: "#fff",
            borderRadius: 7,
        },
        cell: { fontSize: 8 },
        headerCell: { fontSize: 8, fontWeight: "bold" }
    });

    return (
        <View style={styles.table}>
            {/* Header */}
            <View style={[styles.headerRow, styles.row]}>
                {columns.map((col, i) => (
                    <View key={i} style={{ width: getWidth(col.width) }}>
                        <Text style={styles.headerCell}>{col.label}</Text>
                    </View>
                ))}
            </View>

            {/* Rows */}
            {data.map((item, index) => {
                const globalIndex = startIndex + index; // <-- continuous numbering

                return (
                    <View
                        key={globalIndex}
                        style={[
                            styles.row,
                            index === data.length - 1 && { borderBottomWidth: 0 }
                        ]}
                    >
                        {columns.map((col, colIndex) => (
                            <View key={colIndex} style={{ width: getWidth(col.width) }}>
                                <Text style={styles.cell}>
                                    {col.render
                                        ? col.render(item, globalIndex)
                                        : item[col.field]}
                                </Text>
                            </View>
                        ))}
                    </View>
                );
            })}
        </View>
    );
}

export default DocumentTable;

