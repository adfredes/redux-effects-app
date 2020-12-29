import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/store/app.reducers';
import * as actions from 'src/app/store/actions';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: [
  ]
})
export class UsuarioComponent implements OnInit, OnDestroy {

  routerSubscription: Subscription;
  storeSubscription: Subscription;
  usuario: Usuario;

  constructor(private router: ActivatedRoute, private store: Store<AppState>) { }

  ngOnInit(): void {
    this.storeSubscription = this.store.select('usuario').subscribe(({user}) => this.usuario = user);
    this.routerSubscription = this.router.params.subscribe(({id}) => this.store.dispatch(actions.cargarUsuario({id})))
  }

  ngOnDestroy = () => {
    this.routerSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
