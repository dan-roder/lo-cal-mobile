import { NgModule, Component, Directive, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser'
import { FormBuilder, ReactiveFormsModule, FormsModule, NgControl } from '@angular/forms';

@Directive({
    selector: '[formControlName][phone]', // Attribute selector
    host: {
        '(ngModelChange)': 'onInputChange($event)'
    }
})
export class PhoneMaskDirective {

    constructor(
        public model: NgControl
    ) {

        console.log('Hello PhoneMaskDirective Directive');

    }

    @Output() rawChange: EventEmitter<string> = new EventEmitter<string>();

    onInputChange( e, backspace ) {

        let x = e.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
        let rawValue = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        console.log( rawValue );
        // new value
        this.model.valueAccessor.writeValue( rawValue );
        this.rawChange.emit( rawValue );

    }

}
