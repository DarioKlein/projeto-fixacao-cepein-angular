import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HomeComponent } from './components/pages/home/home.component'
import { LoginComponent } from './components/pages/login/login.component'
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component'
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component'
import { NotFoundComponent } from './components/pages/not-found/not-found.component'
import { MessageService } from 'primeng/api'
import { ToastModule } from 'primeng/toast'
import { CadastroComponent } from './components/pages/cadastro/cadastro.component'
import { ButtonModule } from 'primeng/button'
import { InputTextModule } from 'primeng/inputtext'
import { MessagesModule } from 'primeng/messages'
import { MessageModule } from 'primeng/message'
import { InputMaskModule } from 'primeng/inputmask';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { PerfilComponent } from './components/pages/perfil/perfil.component';
import { ListaTarefaComponent } from './components/lista-tarefa/lista-tarefa.component';
import { FormTarefaComponent } from './components/form-tarefa/form-tarefa.component';
import { HistoricoTarefaComponent } from './components/pages/historico-tarefa/historico-tarefa.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    NotFoundComponent,
    CadastroComponent,
    PerfilComponent,
    ListaTarefaComponent,
    FormTarefaComponent,
    HistoricoTarefaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ButtonModule,
    InputTextModule,
    InputMaskModule,
    DialogModule,
    DropdownModule,
    TableModule,
    MessagesModule,
    MessageModule,
    ToastModule,
    BrowserAnimationsModule,
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
