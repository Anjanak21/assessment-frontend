import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PrintPage() {
  const [salesData, setSalesData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/details");
      setSalesData(res.data);
    } catch (err) {
      console.error("Error fetching sales data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="container-fluid my-4">
      <h2 className="text-center mb-4">Sales Report</h2>

      <div className="row">
        <div className="col-12">
          <div className="table-responsive">
            <table
              className="table table-bordered table-hover table-striped align-middle w-100"
              style={{ tableLayout: "fixed" }}
            >
              <thead className="table-dark text-center">
                <tr>
                  <th style={{ width: "12%" }}>Voucher No</th>
                  <th style={{ width: "12%" }}>Date</th>
                  <th style={{ width: "18%" }}>Account Name</th>
                  <th style={{ width: "18%" }}>Item Name</th>
                  <th style={{ width: "18%" }}>Quantity</th>
                  <th style={{ width: "12%" }}>Amount</th>
                  <th style={{ width: "12%" }}>Status</th>
                 
                  
                </tr>
              </thead>
              <tbody>
                {salesData.length > 0 ? (
                  salesData.map((entry, index) =>
                    entry.details_table && entry.details_table.length > 0 ? (
                      entry.details_table.map((item, i) => (
                        <tr key={`${index}-${i}`}>
                          <td className="text-center">
                            {entry.header_table?.vr_no || "-"}
                          </td>
                          <td className="text-center">
                            {entry.header_table?.vr_date
                              ? new Date(entry.header_table.vr_date).toLocaleDateString()
                              : "-"}
                          </td>
                          <td>{entry.header_table?.ac_name || "-"}</td>
                          <td>{item.item_name || "-"}</td>
                          <td className="text-end">{item.qty ?? "-"}</td>
                          <td className="text-end">{item.amount ?? "-"}</td>
                          <td className="text-center">{entry.header_table?.status || "-"}</td>
                          
                        </tr>
                      ))
                    ) : (
                      <tr key={index}>
                        <td className="text-center">{entry.header_table?.vr_no || "-"}</td>
                        <td className="text-center">
                          {entry.header_table?.vr_date
                            ? new Date(entry.header_table.vr_date).toLocaleDateString()
                            : "-"}
                        </td>
                        <td>{entry.header_table?.ac_name || "-"}</td>
                        <td colSpan={4} className="text-center text-muted">
                          No items
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center text-muted">
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary px-4"
          onClick={() => window.print()}
        >
          Print this page
        </button>
      </div>
    </div>
  );
}
