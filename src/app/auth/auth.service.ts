import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

import { Router } from '@angular/router';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { User } from './user.model';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ActivateLoading, DeactivateLoading } from './ui.actions';
import { Subscription } from 'rxjs';
import { UpdateUserAction } from './user.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  subscriptionUser: Subscription;

  // tslint:disable-next-line:variable-name
  constructor(private _afAuth: AngularFireAuth,
              // tslint:disable-next-line:variable-name
              private _router: Router,
              // tslint:disable-next-line:variable-name
              private _afDB: AngularFirestore,
              // tslint:disable-next-line:variable-name
              private _store: Store<AppState>) { }


  initAuthListener() {

    this._afAuth.authState.subscribe((fbUser: firebase.User) => {

      if (fbUser) {
        this._afDB.doc(`${fbUser.uid}/usuario`).valueChanges().subscribe((usuarioObj: any) => {
          const newUser = new User(usuarioObj);
          this._store.dispatch(new UpdateUserAction(newUser));
        });
      } else {
        this.subscriptionUser?.unsubscribe();
      }

    });

  }

  crearUsuario(nombre: string, email: string, password: string) {

    this._store.dispatch(new ActivateLoading());

    this._afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(resp => {

        // console.log(resp);
        const user: User = {
          uid: resp.user.uid,
          nombre,
          email: resp.user.email
        };

        this._afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {

            this._router.navigate(['/']);

          });


      })
      .catch(error => {
        console.error(error);
        Swal.fire('Error en el login', error.message, 'error');
      }).finally(() => {
        this._store.dispatch(new DeactivateLoading());
      });


  }


  login(email: string, password: string) {

    this._store.dispatch(new ActivateLoading());

    this._afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(resp => {

        // console.log(resp);

        this._router.navigate(['/']);

      })
      .catch(error => {
        console.error(error);
        Swal.fire('Error en el login', error.message, 'error');
      }).finally(() => {
        this._store.dispatch(new DeactivateLoading());
      });

  }

  logout() {

    this._router.navigate(['/login']);
    this._afAuth.auth.signOut();

  }


  isAuth() {
    return this._afAuth.authState
      .pipe(
        map(fbUser => {

          if (fbUser == null) {
            this._router.navigate(['/login']);
          }

          return fbUser != null;
        })
      );
  }

}
