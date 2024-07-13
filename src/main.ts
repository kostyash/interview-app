import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from "./app/app.component";
import { UserEffects } from './app/state/user.effects';
import { userReducer } from './app/state/user.reducer';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideStore(userReducer),
        provideEffects(UserEffects),      
    ]
});
