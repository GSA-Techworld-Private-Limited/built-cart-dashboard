import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { toast } from "react-toastify";
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

  // Generate and download Excel file
  if (fileType === "xlsx" || fileType === "xls") {
    // Export to Excel
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
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

    const columns = Object.keys(filteredData[0]).map((key) => ({
      header: key,
      dataKey: key,
    }));

    const rows = filteredData.map((item) => Object.values(item));

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
        1: { cellWidth: 70 },
        2: { cellWidth: 70 },
      },
      margin: { top: 20, left: 15, right: 15 },
    });

    doc.save("exported-data.pdf");
    afterComplete();
  } else {
    toast.error("Request Failed!! Try Again", {
      className: "rounded-[10px]",
    });
  }

  console.log(filteredData);
};
