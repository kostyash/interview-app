import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { AppComponent } from "./app/app.component";
import { UserEffects } from './app/state/user.effects';
import { userReducer } from './app/state/user.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideStore(userReducer),
        provideEffects(UserEffects),   
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: false, // Restrict extension to log-only mode
          }),   
    ]
});
