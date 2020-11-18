// =============================
// Email: info@ebenmonney.com
// www.ebenmonney.com/templates
// =============================

import {NgModule, ErrorHandler, LOCALE_ID} from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { OAuthModule, OAuthStorage } from 'angular-oauth2-oidc';
import { ToastaModule } from 'ngx-toasta';
import { ChartsModule } from 'ng2-charts';
import { NguCarouselModule } from '@ngu/carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppErrorHandler } from './app-error.handler';

import { SharedModule } from './shared/shared.module';
import { AdminModule } from './admin/admin.module';
import { SettingsModule } from './settings/settings.module';
import { FooterModule } from './shared/footer/footer.component';
import { ThemePickerModule } from './shared/theme-picker/theme-picker.component';

import { AppTitleService } from './services/app-title.service';
import { AppTranslationService, TranslateLanguageLoader } from './services/app-translation.service';
import { ConfigurationService } from './services/configuration.service';
import { AlertService } from './services/alert.service';
import { LocalStoreManager } from './services/local-store-manager.service';
import { AuthStorage } from './services/auth-storage';
import { NotificationService } from './services/notification.service';
import { NotificationEndpoint } from './services/notification-endpoint.service';
import { AccountService } from './services/account.service';
import { AccountEndpoint } from './services/account-endpoint.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoginControlComponent } from './components/login/login-control.component';
import { LoginDialogComponent } from './components/login/login-dialog.component';
import { HomeComponent } from './components/home/home.component';
/*
import { CustomersComponent } from './components/customers/customers.component';
import { ProductsComponent } from './components/products/products.component';
import { OrdersComponent } from './components/orders/orders.component';
*/
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

/*import { BannerDemoComponent } from './components/controls/banner-demo.component';
import { TodoDemoComponent } from './components/controls/todo-demo.component';*/
import { StatisticsDemoComponent } from './components/controls/statistics-demo.component';
/*
import { NotificationsViewerComponent } from './components/controls/notifications-viewer.component';
import { AddTaskDialogComponent } from './components/controls/add-task-dialog.component';
*/
import { DeviceListComponent } from './components/devices/device-list/device-list.component';
import { DeviceEditDialogComponent } from './components/devices/device-edit-dialog/device-edit-dialog.component';
import {DeviceService} from './services/device-service/device.service';
import {DeviceEndpointService} from './services/device-service/device-endpoint.service';
import { DeviceViewComponent } from './components/devices/device-view/device-view.component';
import {MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, MatBadgeModule, MatBottomSheetModule} from '@angular/material';
import {MAT_DATE_LOCALE} from '@angular/material';
import localeRu from '@angular/common/locales/ru';
import {registerLocaleData} from '@angular/common';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DeviceScreenshotShowComponent } from './components/devices/device-screenshot-show/device-screenshot-show.component';
import { DeviceScreenshotDialogComponent } from './components/devices/device-screenshot-dialog/device-screenshot-dialog.component';
import { DeviceScreenshotSheetComponent } from './components/devices/device-screenshot-sheet/device-screenshot-sheet.component';
import { DeviceViewSheetComponent } from './components/devices/device-view-sheet/device-view-sheet.component';
import { DeviceViewDialogComponent } from './components/devices/device-view-dialog/device-view-dialog.component';
import { DeviceVolumeComponent } from './components/devices/device-volume/device-volume.component';
import { DeviceVolumeDialogComponent } from './components/devices/device-volume-dialog/device-volume-dialog.component';
import { DeviceVolumeSheetComponent } from './components/devices/device-volume-sheet/device-volume-sheet.component';
import { LinkpoolViewComponent } from './components/linkpools/linkpool-view/linkpool-view.component';
import { LinkpoolListComponent } from './components/linkpools/linkpool-list/linkpool-list.component';
import { LinkpoolEditDialogComponent } from './components/linkpools/linkpool-edit-dialog/linkpool-edit-dialog.component';
import { LinkpoolDeviceEditDialogComponent } from './components/linkpools/linkpool-device-edit-dialog/linkpool-device-edit-dialog.component';

registerLocaleData(localeRu);

@NgModule({
  imports: [
    SharedModule,
    FooterModule,
    ThemePickerModule,
    HttpClientModule,
    AdminModule,
    SettingsModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: TranslateLanguageLoader
      }
    }),
    OAuthModule.forRoot(),
    ToastaModule.forRoot(),
    ChartsModule,
    NguCarouselModule,
    MatBadgeModule,
    MatBottomSheetModule
  ],
  declarations: [
    AppComponent,
    LoginComponent, LoginControlComponent, LoginDialogComponent,
    HomeComponent,
    /*CustomersComponent,
    ProductsComponent,
    OrdersComponent,*/
    AboutComponent,
    NotFoundComponent,
    /*NotificationsViewerComponent,
    AddTaskDialogComponent,*/
    StatisticsDemoComponent, /*TodoDemoComponent, BannerDemoComponent,*/ DeviceListComponent, DeviceEditDialogComponent, DeviceViewComponent, SafeHtmlPipe,
    DeviceScreenshotShowComponent, DeviceScreenshotDialogComponent, DeviceScreenshotSheetComponent, DeviceViewSheetComponent, DeviceViewDialogComponent, DeviceVolumeComponent, DeviceVolumeDialogComponent, DeviceVolumeSheetComponent, LinkpoolViewComponent, LinkpoolListComponent, LinkpoolEditDialogComponent, LinkpoolDeviceEditDialogComponent
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    { provide: OAuthStorage, useClass: AuthStorage },
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    { provide: LOCALE_ID, useValue: 'ru-ru' },
    {provide: MAT_BOTTOM_SHEET_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    AlertService,
    ConfigurationService,
    AppTitleService,
    AppTranslationService,
    NotificationService,
    NotificationEndpoint,
    AccountService,
    AccountEndpoint,
    LocalStoreManager,
    DeviceService,
    DeviceEndpointService
  ],
  entryComponents: [
    LoginDialogComponent,
    DeviceEditDialogComponent,
    DeviceScreenshotDialogComponent,
    DeviceScreenshotSheetComponent,
    DeviceViewSheetComponent,
    DeviceViewDialogComponent,
    DeviceVolumeDialogComponent,
    DeviceVolumeSheetComponent,
    LinkpoolEditDialogComponent,
    LinkpoolDeviceEditDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
