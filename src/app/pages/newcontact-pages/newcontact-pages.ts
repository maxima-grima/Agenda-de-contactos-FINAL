import { Component, ElementRef, inject, input, OnInit, viewChild } from '@angular/core';
import { Form, FormGroup, FormsModule, NgControl, NgForm, NgModel } from '@angular/forms';
import { Contact, NewContact } from '../../interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { Router } from '@angular/router';
import { Spiner } from '../../components/spiner/spiner';

@Component({
  selector: 'app-new-edit-contact',
  imports: [FormsModule, Spiner],
  templateUrl: './newcontact-pages.html',
  styleUrl: './newcontact-pages.scss'
})
export class NewContactPages implements OnInit {
  contactsService = inject(ContactsService);
  router = inject(Router)
  errorBack = false;
  idContacto = input<number>();
  contactoOriginal: Contact | undefined = undefined;
  form = viewChild<NgForm>('newContactForm');
  isLoading = false;

  async ngOnInit() {
    if (this.idContacto()) {
      this.contactoOriginal = await this.contactsService.getContactById(this.idContacto()!);
      this.form()?.setValue({
        firstName: this.contactoOriginal!.firstName,
        lastName: this.contactoOriginal!.lastName,
        address: this.contactoOriginal!.address,
        email: this.contactoOriginal!.email,
        image: this.contactoOriginal!.image,
        number: this.contactoOriginal!.number,
        company: this.contactoOriginal!.company,
        isFavorite: this.contactoOriginal!.isFavorite
      })
    }
  }

  async handleFormSubmission(form: NgForm) {
    this.errorBack = false;
    const nuevoContacto: NewContact = {
      firstName: form.value.firstName,
      lastName: form.value.lastName,
      address: form.value.address,
      email: form.value.email,
      image: form.value.image,
      number: form.value.number,
      company: form.value.company,
      isFavorite: form.value.isFavorite
    }
    let res;
    this.isLoading = true;
    if (this.idContacto()) {
      res = await this.contactsService.editContact({
        ...nuevoContacto,
        id: this.idContacto()!.toString()
      });
    } else {
      res = await this.contactsService.createContact(nuevoContacto);
    }

    this.isLoading = false;

    if (!res) {
      this.errorBack = true;
      return
    };

    this.router.navigate(["/contacts", res.id]);
  }
}


