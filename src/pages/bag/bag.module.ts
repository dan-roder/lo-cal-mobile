import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BagPage } from './bag';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
    declarations: [
        BagPage,
    ],
    imports: [
        IonicPageModule.forChild(BagPage),
        PipesModule
    ],
    exports: [
        BagPage
    ]
})
export class BagPageModule { }
