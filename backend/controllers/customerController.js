"use strict";

const  {Customer}  = require("../models");
require("dotenv").config();

const CustomerController = {
  create: async (req, res) => {
    try {
      const { name, email } = req.body;
      const customerExists = await Customer.findOne({ where: { email } });
      if (customerExists) {
        return res
          .status(409)
          .json({ error: "Customer with the same email already exists" });
      }

      const customerSave = await Customer.create({ name, email });
      return res
        .status(201)
        .json({ message: "Customer created!", customer: customerSave });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateCustomer: async (req, res) => {
    try {
      const { name, email } = req.body;
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res
          .status(409)
          .json({ error: "Customer with the email not exists" });
      }
      customer.name = name || customer.name;
      customer.email = email || customer.email;

      await customer.save();

      return res
        .status(201)
        .json({ message: "Customer updated!", customer: customer });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  deleteCustomer: async (req, res) => {
    try {
      const { id } = req.params;
      const customer = await Customer.findByPk(id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      await customer.destroy();
      return res.status(200).json({ message: "Customer deleted" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  getAllCustomers: async (req, res) => {
    try {
        console.log(Customer)
      const customers = await Customer.findAll();
      return res.status(200).json({ customers });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};


module.exports = CustomerController