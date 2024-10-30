const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/customerController');

router.get('/customers', CustomerController.getAllCustomers);

router.post('/customers', CustomerController.create);

router.put('/customers/:id', CustomerController.updateCustomer);

router.delete('/customers/:id', CustomerController.deleteCustomer);

module.exports = router;