import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuItemPage } from './menu-item';
import { PipesModule } from '../../pipes/pipes.module';
@NgModule({
    declarations: [
        MenuItemPage,
    ],
    imports: [
        IonicPageModule.forChild(MenuItemPage),
        PipesModule
    ],
    exports: [
        MenuItemPage
    ]
})
export class MenuItemPageModule { }
