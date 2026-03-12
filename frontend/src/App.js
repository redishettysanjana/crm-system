import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const API = "https://crm-system-7ppz.onrender.com/customers";

  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");


  // FETCH CUSTOMERS
  const fetchCustomers = async () => {
    const res = await axios.get(API);
    setCustomers(res.data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);


  // ADD OR UPDATE CUSTOMER
  const addCustomer = async () => {

    if (editId) {
      await axios.put(`${API}/${editId}`, {
        name,
        email,
        phone,
        company
      });
      setEditId(null);

    } else {

      await axios.post(API, {
        name,
        email,
        phone,
        company
      });

    }

    setName("");
    setEmail("");
    setPhone("");
    setCompany("");

    fetchCustomers();
  };


  // DELETE CUSTOMER
  const deleteCustomer = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchCustomers();
  };


  // EDIT CUSTOMER
  const editCustomer = (customer) => {
    setName(customer.name);
    setEmail(customer.email);
    setPhone(customer.phone);
    setCompany(customer.company);
    setEditId(customer._id);
  };


  return (
    <div className="container mt-4">

      <h2>Add Customer</h2>

      <div className="row mb-3">

        <div className="col">
          <input
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="col">
          <input
            className="form-control"
            placeholder="Company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>

        <div className="col">
          <button
            className="btn btn-primary"
            onClick={addCustomer}
          >
            {editId ? "Update Customer" : "Add Customer"}
          </button>
        </div>

      </div>


      <h2>Customer List</h2>

      <h4>Total Customers: {customers.length}</h4>

      <input
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: "10px" }}
      />


      <table className="table table-bordered table-striped">

        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {(customers || [])
            .filter((c) =>
              c.name.toLowerCase().includes(search.toLowerCase())
            )
            .map((c) => (
              <tr key={c._id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.company}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => editCustomer(c)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm ms-2"
                    onClick={() => deleteCustomer(c._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;
