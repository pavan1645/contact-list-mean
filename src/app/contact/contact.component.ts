import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import {ContactService} from '../contact.service';
import{ Contact } from '../contact';

@Component({
	selector: 'app-contact',
	templateUrl: './contact.component.html',
	styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
	contact: Contact[] = null;

	constructor(private route: ActivatedRoute, private contactService: ContactService) { }
	
	ngOnInit() {
		//var id = this.route.snapshot.params["id"];
		this.route.params.subscribe((params: Params) => {
			let id = params["id"];
			this.contactService.getContact(id)
			.subscribe( contact =>{
				if(!contact.err){
					this.contact = contact;
				}
			});
		});
	}
}
