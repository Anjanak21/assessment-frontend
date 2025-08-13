import React from 'react'

const DetailsTable = ({details,setDetails,updateTotal}) => {
  const handleChange=(index,e)=>{
    const{name,value}=e.target;
    const updateDetails=[...details];
    updateDetails[index][name]=value;
    if (name==="qty"||name==="rate"){
        updateDetails[index].amount=
        (parseFloat(updateDetails[index].qty)||0)*
        (parseFloat(updateDetails[index].rate)||0);
    }
    setDetails(updateDetails);
    updateTotal(updateDetails);
  };
   const addRow=()=>{
    setDetails([...details,{
        sr_no:details.length+1,
        item_code:"",
        item_name:"",
        description:"",
        qty:"",
        rate:"",
        amount:0,
    },]);
   };
   const removeRow = (index) => {
    const updatedDetails = details.filter((_, i) => i !== index);
    setDetails(updatedDetails);
    updateTotal(updatedDetails);
  };
    return (
        <div className="card p-4 mb-4">
        <h4 className="mb-3">Detail Items</h4>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Description</th>
              <th>Qty</th>
              <th>Rate</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {details.map((row, index) => (
              <tr key={index}>
                <td>{row.sr_no}</td>
                <td>
                  <input
                    type="text"
                    name="item_code"
                    value={row.item_code}
                    onChange={(e) => handleChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="item_name"
                    value={row.item_name}
                    onChange={(e) => handleChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="description"
                    value={row.description}
                    onChange={(e) => handleChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="qty"
                    value={row.qty}
                    onChange={(e) => handleChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td>
                  <input
                    type="number"
                    name="rate"
                    value={row.rate}
                    onChange={(e) => handleChange(index, e)}
                    className="form-control"
                  />
                </td>
                <td>{row.amount}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeRow(index)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        <button className="btn btn-primary" onClick={addRow}>
          Add Row
        </button>
      </div>
    );
  };
  
  


export default DetailsTable
