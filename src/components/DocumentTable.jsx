import { Text, View, StyleSheet } from "@react-pdf/renderer";
import React from "react";

function DocumentTable({ columns, data, startIndex = 0 }) {

    const fixedWidths = columns
        .filter(col => col.width && col.width !== "auto")
        .map(col => parseFloat(col.width));

    const totalFixed = fixedWidths.reduce((a, b) => a + b, 0);
    const autoCols = columns.filter(col => !col.width || col.width === "auto").length;
    const autoWidth = autoCols > 0 ? (100 - totalFixed) / autoCols : 0;

    const getWidth = (w) =>
        (!w || w === "auto" ? `${autoWidth}%` : `${parseFloat(w)}%`);

    const styles = StyleSheet.create({
        table: {
            display: "table",
            width: "auto",
            borderStyle: "solid",
            borderWidth: 1,
            borderColor: "#d1d5dc",
            borderRadius: 10,
            padding: 3,
        },
        row: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderColor: "#ebe6e7",
            padding: "7 6",
        },
        headerRow: {
            backgroundColor: "#127475",
            color: "#fff",
            borderRadius: 7,
        },
        cell: { fontSize: 8 },
        headerCell: { fontSize: 8, fontWeight: "bold" },
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
                const globalIdx = startIndex + index;

                return (
                    <View
                        key={globalIdx}
                        style={[
                            styles.row,
                            index === data.length - 1 && { borderBottomWidth: 0 },
                        ]}
                    >
                        {columns.map((col, colIndex) => {
                            let value = "";

                            try {
                                const raw = col.render
                                    ? col.render(item, globalIdx)
                                    : item[col.field];

                                value =
                                    raw === null ||
                                    raw === undefined ||
                                    typeof raw === "object"
                                        ? ""
                                        : String(raw);
                            } catch (e) {
                                value = "";
                            }

                            return (
                                <View key={colIndex} style={{ width: getWidth(col.width) }}>
                                    <Text style={styles.cell}>{value}</Text>
                                </View>
                            );
                        })}
                    </View>
                );
            })}
        </View>
    );
}

export default DocumentTable;
