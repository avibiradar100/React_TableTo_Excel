import {useState,useEffect} from 'react';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
  
function App(){
 
  const[result,setResult]= useState([]);

  const getData = ()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
    .then(response => response.json())
    .then(res => setResult( res));
  }
  
  useEffect(() => {
      getData();
  },[])

  const handleExport = () => {

    // Create an Excel workbook
    const workbook = XLSX.utils.book_new();

    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(result);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Export the workbook to an Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([excelBuffer], { type: "application/octet-stream" }), "data.xlsx");
  };

  return <button onClick={handleExport}>Export to Excel</button>;
}
  
export default App;