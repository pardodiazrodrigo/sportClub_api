import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getAllCustomers } from "./api.customers";

function App() {
  const [customers, setCustomers] = useState([]);
  const [filterByGBA, setFilterByGBA] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    async function loadCustomers() {
      try {
        const res = await getAllCustomers();
        const data = res.data;
        setCustomers(data);
      } catch (error) {
        console.log("Error loading customers:", error);
      }
    }
    loadCustomers();
  }, []);

  const handleCheckboxChange = (event) => {
    setFilterByGBA(event.target.checked);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const filteredCustomers = customers.filter((customer) => {
    const customerFullName = `${customer.name} ${customer.lastname} ${customer.dni}`;
    const fullNameIncludesSearchTerm = customerFullName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const dobInRange = isDobInRange(customer.dob, startDate, endDate);

    if (filterByGBA) {
      return customer.is_gba && fullNameIncludesSearchTerm && dobInRange;
    } else {
      return fullNameIncludesSearchTerm && dobInRange;
    }
  });

  function isDobInRange(dob, startDate, endDate) {
    if (!startDate && !endDate) {
      return true;
    }

    const dobDate = new Date(dob);
    if (startDate && endDate) {
      const startDateWithoutTime = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      );
      const endDateWithoutTime = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate()
      );
      return (
        dobDate >= startDateWithoutTime && dobDate <= endDateWithoutTime
      );
    } else if (startDate) {
      return dobDate >= startDate;
    } else if (endDate) {
      return dobDate <= endDate;
    }

    return true;
  }

  return (
    <div className="App">
      <Container>
        <h1 className="text-center mt-4">Customers</h1>
        <Form>
          <InputGroup className="my-3">
            <Form.Control
              placeholder="Search customers"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </InputGroup>
          <Form.Group className="my-3">
            <Form.Label>Date of Birth Range:</Form.Label>
            <div>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                placeholderText="Start Date"
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                placeholderText="End Date"
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </div>
          </Form.Group>
        </Form>
        <Form.Check
          type="checkbox"
          label="Show only GBA customers"
          onChange={handleCheckboxChange}
        />
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Last Name</th>
              <th>DNI</th>
              <th>Birthday</th>
              <th>GBA</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer) => (
              <tr key={customer.dni}>
                <td>{customer.name}</td>
                <td>{customer.lastname}</td>
                <td>{customer.dni}</td>
                <td>{customer.dob}</td>
                <td>{customer.is_gba ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}

export default App;
