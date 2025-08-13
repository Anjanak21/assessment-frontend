import React, { useEffect, useState } from "react";
import HeaderForm from "../components/HeaderForm";
import DetailsTable from "../components/DetailsTable";
import axios from "axios";
import {useNavigate} from "react-router-dom";


const SalesEntry = () => {
  const [header, setHeader] = useState({
    vr_no: "",
    vr_date: "",
    ac_name: "",
    ac_amt: 0,
    status: "A",
  });

  const [details, setDetails] = useState([
    {
      sr_no: 1,
      item_code: "",
      item_name: "",
      description: "",
      qty: "",
      rate: "",
      amount: 0,
    },
  ]);
  const validateForm = () => {
  const errors = [];

  // Header validations
  if (!header.vr_no.trim()) errors.push("Voucher number (vr_no) is required.");
  if (!header.ac_name.trim()) errors.push("Account name is required.");

  // Details validations
  if (details.length === 0) {
    errors.push("At least one item must be added.");
  } else {
    const itemCodes = details.map(d => d.item_code.trim());
    const duplicateCodes = itemCodes.filter((code, idx) => code && itemCodes.indexOf(code) !== idx);
    if (duplicateCodes.length > 0) {
      errors.push("Duplicate item codes are not allowed.");
    }

    details.forEach((item, i) => {
      if (!item.item_code.trim()) errors.push(`Item code is required for row ${i + 1}`);
      if (!item.qty || Number(item.qty) < 1) errors.push(`Quantity must be at least 1 for row ${i + 1}`);
      if (!item.rate || Number(item.rate) < 1) errors.push(`Rate must be at least 1 for row ${i + 1}`);
    });
  }

  return errors;
};


  const updateTotal = (updatedDetails) => {
    const total = updatedDetails.reduce((sum, row) => sum + (row.amount || 0), 0);
    setHeader((prev) => ({ ...prev, ac_amt: total }));
  };
  useEffect(() => {
    if (!header.vr_no) return;
    axios.get(`http://localhost:5000/api/sales/${header.vr_no}`)
      .then((res) => {
        setHeader({
          vr_no: res.data.vr_no,
          vr_date: res.data.vr_date,
          ac_name: res.data.ac_name,
          ac_amt: res.data.ac_amt,
          status: res.data.status
        });
        setDetails(res.data.details);
    })
    .catch((err) => {
      console.log("No existing data, starting fresh");
    });
}, [header.vr_no]);

//    const handleSubmit = async () => {
//     const payload = {
//       vr_no: header.vr_no,
//       vr_date: header.vr_date,
//       ac_name: header.ac_name,
//       ac_amt: header.ac_amt,
//       status: header.status,
//       details: details
//     };
//     console.log("Submitting data:", payload);

//     try {
//       await axios.post("http://localhost:5000/api/sales", payload); 
//       alert("Data saved successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Error saving data");
//     }
//   };
const handleSubmit = async () => {
  const errors = validateForm();
  if (errors.length > 0) {
    alert(errors.join("\n")); // You can replace this with better UI error display
    return;
  }
    const payload = {
      header_table: {
        vr_no: header.vr_no,
        vr_date: header.vr_date,
        ac_name: header.ac_name,
        ac_amt: header.ac_amt,
        status: header.status
      },
      details_table: details.map((row, index) => ({
        sr_no: index + 1,
        item_code: row.item_code,
        item_name: row.item_name,
        description: row.description,
        qty: parseFloat(row.qty) || 0,
        rate: parseFloat(row.rate) || 0,
        amount: parseFloat(row.amount) || 0
      }))
    };
  
    console.log("Submitting data:", payload);
  
    try {
      await axios.post("http://localhost:5000/api/sales", payload);
      alert("Data saved successfully!");
    } catch (err) {
      console.error(err);
      alert("could not save data!!!")
    }
  };
  const navigate=useNavigate();
  const handlePrint=()=>{
    navigate("/print");
  }

  return (
    <div className="container my-4">
    
      <h2 className="mb-4">Sales Entry</h2>
      <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
        {/* Table section */}
        <div style={{ flex: 1 }}>
      <HeaderForm header={header} setHeader={setHeader} />
       
          <DetailsTable
            details={details}
            setDetails={setDetails}
            updateTotal={updateTotal}
          />
        </div>
      {/* <DetailsTable
        details={details}
        setDetails={setDetails}
        updateTotal={updateTotal}
      /> */}
      
      
       <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "120px" }}>
          <button className="btn btn-primary">New</button>
          <button className="btn btn-warning">Insert</button>
          <button className="btn btn-info" onClick={handleSubmit}>
            Save
          </button>
          <button className="btn btn-success" onClick={handlePrint}>
            Print
          </button>
        </div>
        </div>
      
      
      {/* <button className="btn btn-success" onClick={handleSubmit}>
        Save Voucher
      </button> */}
      
    </div>
  );
};

export default SalesEntry;

