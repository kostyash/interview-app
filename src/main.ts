import { provideHttpClient } from "@angular/common/http";
import { bootstrapApplication } from '@angular/platform-browser';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { AppComponent } from "./app/app.component";
import { reducers } from "./app/state";
import { UserEffects } from './app/state/user.effects';

bootstrapApplication(AppComponent, {
    providers: [
        provideHttpClient(),
        provideStore(reducers),
        provideEffects(UserEffects),   
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: false, // Restrict extension to log-only mode
          }),   
    ]
});
