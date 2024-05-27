import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";

const flattenObject = (obj, parent = "", res = {}) => {
  for (let key in obj) {
    const propName = parent ? `${parent}.${key}` : key;
    let displayName = key.replace(/_/g, " "); // Replace underscores with spaces
    displayName = displayName = displayName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "); // Capitalize each word; // Capitalize the first letter
    if (Array.isArray(obj[key])) {
      continue;
    } else if (typeof obj[key] == "object" && obj[key] !== null) {
      flattenObject(obj[key], propName, res);
    } else {
      res[propName] = { value: obj[key], display: displayName }; // Store both value and display name
    }
  }
  return res;
};

export const exportData = (timeFrame, userData, fileType, afterComplete) => {
  const startDate = new Date(`${timeFrame.from}T00:00:00Z`);
  const endDate = new Date(`${timeFrame.to}T23:59:59Z`);
  if (!startDate || !endDate) {
    toast.error("Please select both start and end date.!! Try Again", {
      className: "rounded-[10px]",
    });
    return;
  }

  const filteredData = userData.filter((item) => {
    const itemDate = new Date(item.created_at);
    return itemDate >= startDate && itemDate <= endDate;
  });

  if (filteredData.length === 0) {
    toast.error("No data found for the selected date range.", {
      className: "rounded-[10px]",
    });
    return;
  }

  const flattenedData = filteredData.map((item) => flattenObject(item));

  if (fileType === "xlsx" || fileType === "xls") {
    // Convert flattenedData to an array of arrays
    const dataArray = flattenedData.map((item) =>
      Object.values(item).map((obj) => obj.value)
    );

    // Extract header row from flattenedData and map it to display names
    const headerRow = Object.keys(flattenedData[0]).map(
      (key) => flattenedData[0][key].display
    );

    const worksheet = XLSX.utils.aoa_to_sheet([headerRow, ...dataArray]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: fileType,
      type: "array",
    });
    const dataBlob = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });
    saveAs(dataBlob, `exported-data.${fileType}`);
    afterComplete();
  } else if (fileType === "pdf") {
    const doc = new jsPDF("p", "pt", "a4");

    const chunkArray = (arr, chunkSize) => {
      const result = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
      }
      return result;
    };

    const keys = Object.keys(flattenedData[0]);
    const chunkedKeys = chunkArray(keys, 9);

    chunkedKeys.forEach((keyChunk, index) => {
      const columns = keyChunk.map((key) => ({
        header: flattenedData[0][key].display,
        dataKey: key,
      }));
      const rows = flattenedData.map((item) =>
        keyChunk.map((key) => item[key].value)
      );

      doc.autoTable({
        head: [columns.map((col) => col.header)],
        body: rows,
        theme: "striped",
        headStyles: {
          fillColor: [189, 189, 189],
          textColor: [40, 40, 40],
        },
        alternateRowStyles: {
          fillColor: [254, 249, 235],
          textColor: [67, 68, 68],
        },
        styles: {
          fontSize: 5,
        },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: "auto" },
          2: { cellWidth: "auto" },
          3: { cellWidth: "auto" },
          4: { cellWidth: "auto" },
          5: { cellWidth: "auto" },
          6: { cellWidth: "auto" },
        },
        margin: { top: index === 0 ? 20 : 10, left: 15, right: 15 },
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 10 : 20,
      });
    });

    doc.save("exported-data.pdf");
    afterComplete();
  } else {
    toast.error("Request Failed!! Try Again", {
      className: "rounded-[10px]",
    });
  }

  console.log(flattenedData);
};
