import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BurgersPage } from './burgers';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
    declarations: [
        BurgersPage,
    ],
    imports: [
        IonicPageModule.forChild(BurgersPage),
        ComponentsModule,
        PipesModule

    ],
    exports: [
        BurgersPage
    ]
})
export class BurgersPageModule { }
