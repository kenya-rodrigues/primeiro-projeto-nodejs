const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();

app.use(express.json());

const customers = [];

app.get("/statement/:documentNumber", (request, response) => {
  const { documentNumber } = request.params;

  const customer = customers.find(
    (customer) => customer.documentNumber === documentNumber
  );

  if (!customer) {
    return response.status(400).json({ error: "Customer not found" });
  }

  return response.json(customer.statement);
});

app.post("/accounts", (request, response) => {
  const { documentNumber, name } = request.body;

  const customerAlreadyExists = customers.some(
    (customer) => customer.documentNumber === documentNumber
  );

  if (customerAlreadyExists) {
    return response.status(400).json({ error: "Customer already exists" });
  }

  customers.push({
    documentNumber,
    name,
    id: uuidv4(),
    statement: [],
  });

  return response.status(201).send();
});

app.listen(3332);
