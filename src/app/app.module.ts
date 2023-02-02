import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule} from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthInterceptor } from './core/interceptors/interceptor';
import { AlertComponent } from './core/components/alerts/alert/alert.component';
import { ToastComponent } from './core/components/alerts/toast/toast.component';
import { ScreenOrientation } from '@awesome-cordova-plugins/screen-orientation/ngx';
import { TextToSpeechAdvanced } from '@awesome-cordova-plugins/text-to-speech-advanced/ngx';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
// import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';


@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        IonicStorageModule.forRoot(),
        IonicModule.forRoot(),
        Ng2SearchPipeModule,
    ],
    providers: [
        ToastComponent,
        AlertComponent,
        ScreenOrientation,
        TextToSpeechAdvanced,
        // Base64ToGallery,
        Camera,
        {
            provide: RouteReuseStrategy,
            useClass: IonicRouteStrategy,
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
