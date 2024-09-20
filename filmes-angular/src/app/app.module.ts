import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';  // Alteração para usar provideHttpClient com fetch
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule],
  providers: [
    provideHttpClient(withFetch())  // Habilitando o uso de fetch
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
