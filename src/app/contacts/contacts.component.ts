import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {ContactService} from '../contact.service';
import {Contact} from '../contact';


@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.component.html',
	styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
	
	contacts: Contact[];
	contact: Contact;
	first_name: string;
	last_name: string;
	phone: string;
	selectedContacts: Contact[] = [];

	constructor(private contactService: ContactService, private router: Router) { }
	
	addContact(){
		const newContact = {
			first_name: this.first_name,
			last_name: this.last_name,
			phone: this.phone
		}
		this.contactService.addContact(newContact)
		.subscribe(data => {
			this.contacts.push(data);
			this.contactService.getContacts()
			.subscribe(contacts => this.contacts = contacts);
		}); 
	}

	viewContact(contact){
		this.router.navigate(['/contact',contact._id]);
	}
	
	editContact(id){
		var contact = this.contacts.find(x => x._id === id);
		if(this.selectedContacts.indexOf(contact) < 0){
			this.selectedContacts.push(contact);
		}
	}

	updateContact(newContact){
		var contacts = this.contacts;
		var selectedContacts = this.selectedContacts;
		this.contactService.updateContact(newContact)
		.subscribe(data => {
			//update contacts
			let index = contacts.indexOf(contacts.find(x => x._id === newContact._id));
			contacts[index] = newContact;
			//remove from selected contacts
			for (var i = 0; i < selectedContacts.length; ++i) {
				if (selectedContacts[i]._id == newContact._id) {
					selectedContacts.splice(i,1);
				}
			}
		});
	}
	
	deleteContact(id){
		var contacts = this.contacts;
		this.contactService.deleteContact(id)
		.subscribe(data => {
			for (var i = 0; i < contacts.length; ++i) {
				if (contacts[i]._id == id) {
					contacts.splice(i,1);
				}
			}
		});
	}
	
	ngOnInit() {
		this.contactService.getContacts()
		.subscribe( contacts =>
			this.contacts = contacts);
		}
	}