import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { AppState } from '../../app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit {

  public loading = false;

  constructor( public authService: AuthService,
               // tslint:disable-next-line:variable-name
               private _store: Store<AppState> ) { }

  ngOnInit() {
    this._store.select('ui').subscribe( (ui) => this.loading = ui.isLoading );
  }

  onSubmit( data: any ) {
    console.log(data);
    this.authService.crearUsuario( data.nombre, data.email, data.password );
  }

}
