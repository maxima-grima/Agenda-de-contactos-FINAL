import { Component, inject, input, OnInit } from '@angular/core';
import { ContactsService } from '../../service/contacts-service';
import { Contact } from '../../interfaces/contact';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-details-page',
  imports: [RouterModule],
  templateUrl: './contact-details-pages.html',
  styleUrl: './contact-details-pages.scss'
})
export class ContactDetailsPage implements OnInit {
  idContacto = input.required<string>();
  readonly contactService = inject(ContactsService);
  contacto: Contact | undefined;
  cargandoContacto = false;
  router = inject(Router);

  async ngOnInit() {
    if(this.idContacto()){
      this.contacto = this.contactService.contacts.find(contacto => contacto.id.toString() === this.idContacto());
      if(!this.contacto) this.cargandoContacto = true;
      const res = await this.contactService.getContactById(this.idContacto());
      if(res) this.contacto = res;
      this.cargandoContacto = false;
    }
  }

  async toggleFavorite(){
    if(this.contacto){
      const res = await this.contactService.setFavorite(this.contacto.id);
      if(res) this.contacto.isFavorite = !this.contacto.isFavorite;
    }
  }

  async deleteContact() {
    if (!this.contacto) return; 
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      const res = await this.contactService.deleteContact(this.contacto.id);
      
      if (res) {
        await Swal.fire(
          '¡Borrado!',
          'El contacto ha sido eliminado.',
          'success'
        );
        this.router.navigate(['/']); 
      } else {
        Swal.fire(
          'Error',
          'No se pudo eliminar el contacto.',
          'error'
        );
      }
    }
  }
}