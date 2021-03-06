import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
    templateUrl: 'app.html',
    host: { '[class.desktop]': 'isDesktop' }
})
export class MyApp {
    rootPage: any = HomePage;
    isDesktop: boolean = false;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
        platform.ready().then(() => {
            if (platform.is('core')) {
                this.isDesktop = true;
            }

            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
}
