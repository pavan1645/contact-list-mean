const express = require('express');
const router = express.Router();

const Contact = require("../models/contact");

//retrieving data
router.get("/contacts", (req,res) => {
	Contact.find((err, contacts) => {
		res.json(contacts);
	});
});

//retrieving single data
router.get("/contact/:id", (req,res) => {
	Contact.findById(req.params.id, (err, contact) => {
		if (err) {
			res.json({msg: "Error", err: err});
		} else {
			res.json(contact);
		}
	});
});

//add contact
router.post('/contact', (req, res, next) => {
	let newContact = new Contact({
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	});

	newContact.save((err, contact) => {
		if (err) {
			res.json({msg: "Failed to add contact", err: err});
		} else {
			res.json({msg: "Contact added successfully"});
		}
	})

});

//edit contact
router.put('/contact/:id', (req, res, next) => {
	let newContact = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		phone: req.body.phone
	};
	Contact.findByIdAndUpdate(req.params.id, newContact, {new: true}, (err, result) => {
		if (err) {
			res.json({msg: "Failed to update contact", err: err});
		} else {
			res.json({msg: "Contact updated successfully", result: result});
		}
	});
});

//delete contact
router.delete('/contact/:id', (req, res, next) => {
	Contact.remove({_id: req.params.id}, (err, result) => {
		if (err) {
			res.json(err);
		} else {
			res.json(result);
		}
	});
});

//aman 
router.post('/aman', function(req, res, next) {
	let aman = {
		"ac":123456789012,
		"s":"Guru Teg Bahadur Nagar",
		"d":"Guru Teg Bahadur Nagar",
		"sd":"2017/12/27",
		"ed":"2017/12/27",
		"ul":10,
		"dl":10,
		"pc":123456789012
	}
	res.json(aman);
});

module.exports = router;