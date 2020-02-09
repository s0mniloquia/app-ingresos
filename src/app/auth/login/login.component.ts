import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {

  public loading = false;

  constructor( public authService: AuthService,
               // tslint:disable-next-line:variable-name
               private _store: Store<AppState> ) { }

  ngOnInit() {
    this._store.select('ui').subscribe( ui => this.loading = ui.isLoading );
  }

  onSubmit( data: any ) {

    console.log(data);

    this.authService.login( data.email, data.password );

  }

}
