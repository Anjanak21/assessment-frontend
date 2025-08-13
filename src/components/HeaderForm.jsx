// import React, { useState } from 'react'

// const HeaderForm = ({onHeaderChange}) => {
//     const [header, setHeader]=useState({
//         vr_no:"",
//         vr_date:"",
//         ac_name:"",
//         ac_amt:0,
//         status:"A",
//     });
//     const handleChange=(e)=>{
//         const {name,value}= e.target;
//         const updatedHeader={...header,[name]:value};
//         setHeader(updatedHeader);
//         if (onHeaderChange) onHeaderChange(updatedHeader);
//     };

    
//   return (
//     <div className="card p-4 mb-4">
//        <h4 className="mb-3">Header Details</h4>
//       <div className="row g-3">
//         {/* Voucher No */}
//         <div className="col-md-4">
//           <label className="form-label">Voucher No</label>
//           <input
//             type="number"
//             name="vr_no"
//             value={header.vr_no}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Date */}
//         <div className="col-md-4">
//           <label className="form-label">Date</label>
//           <input
//             type="date"
//             name="vr_date"
//             value={header.vr_date}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Account Name */}
//         <div className="col-md-4">
//           <label className="form-label">Account Name</label>
//           <input
//             type="text"
//             name="ac_name"
//             value={header.ac_name}
//             onChange={handleChange}
//             className="form-control"
//           />
//         </div>

//         {/* Total Amount */}
//         <div className="col-md-4">
//           <label className="form-label">Amount</label>
//           <input
//             type="number"
//             name="ac_amt"
//             value={header.ac_amt}
//             onChange={handleChange}
//             // readOnly
//             className="form-control bg-light"
//           />
//         </div>

//         {/* Status */}
//         <div className="col-md-4">
//           <label className="form-label">Status</label>
//           <select
//             name="status"
//             value={header.status}
//             onChange={handleChange}
//             className="form-select"
//           >
//             <option value="A">Active</option>
//             <option value="I">Inactive</option>
//           </select>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default HeaderForm;


import React from 'react'

const HeaderForm = ({ header, setHeader }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHeader((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="card p-4 mb-4">
      <h4 className="mb-3">Header Details</h4>
      <div className="row g-3">
        <div className="col-md-4">
          <label className="form-label">Voucher No</label>
          <input
            type="number"
            name="vr_no"
            value={header.vr_no}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Date</label>
          <input
            type="date"
            name="vr_date"
            value={header.vr_date}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Account Name</label>
          <input
            type="text"
            name="ac_name"
            value={header.ac_name}
            onChange={handleChange}
            className="form-control"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Amount</label>
          <input
            type="number"
            name="ac_amt"
            value={header.ac_amt}
            onChange={handleChange}
            className="form-control bg-light"
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Status</label>
          <select
            name="status"
            value={header.status}
            onChange={handleChange}
            className="form-select"
          >
            <option value="A">Active</option>
            <option value="I">Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default HeaderForm;
