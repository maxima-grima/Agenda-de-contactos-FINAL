import { Component, inject, input } from '@angular/core';
import { Contact } from '../../interfaces/contact';
import { ContactsService } from '../../service/contacts-service';
import { RouterModule } from '@angular/router';
import Swal from 'sweetalert2'; 

@Component({
  selector: 'app-contact-list-item',
  imports: [RouterModule],
  templateUrl: './contact-list-item.html',
  styleUrl: './contact-list-item.scss'
})
export class ContactListItem {
  contact = input.required<Contact>()
  aleatorio = Math.random()
  contactsService = inject(ContactsService)

  async confirmDelete() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await this.contactsService.deleteContact(this.contact().id);
        if (res) {
          Swal.fire(
            '¡Borrado!',
            'El contacto ha sido eliminado.',
            'success'
          );
        } else {
          Swal.fire(
            'Error',
            'No se pudo eliminar el contacto.',
            'error'
          );
        }
      }
    });
  }
}