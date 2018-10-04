import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormArray } from '@angular/forms';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { CustomerProvider } from '../../providers/customer/customer';
import { InPasswordReset } from '../../models/customer';

@AutoUnsubscribe()

@IonicPage()

@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

    public passwordResetForm: FormGroup;
    public forcePasswordResetForm: FormGroup;
    public foundSecurityQuestion: boolean = false;
    public errorData: any = {};
    public securityQuestion: string = '';
    public switchForms: boolean = false;
    public submittedOnce: boolean = false;
    public passwordResetError: string = '';
    public passwordSuccess: boolean = false;
    public forcePasswordSuccess: boolean = false;
    public forceProcessing: boolean = false;
    public processing: boolean = false;
    public securityQuestionError: string = '';
    public forcePasswordError: string = '';
    email        : AbstractControl;
    securityAnswer : AbstractControl;
    password : AbstractControl;
    confirmPassword : AbstractControl;
    forceEmail    : AbstractControl;

    constructor(

        public navCtrl: NavController,
        public navParams: NavParams,
        private fb: FormBuilder,
        private customerService: CustomerProvider

    ) {

    }
    ngOnInit() {
        this.passwordResetForm = this.fb.group({
            'email' : ['', Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])],
            'securityAnswer' : [null, Validators.required],
            'password' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])],
            'confirmPassword' : ['', Validators.compose([Validators.required, Validators.minLength(8), Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)])]
          }, {
            validator : this.checkPasswords
          });

          this.forcePasswordResetForm = this.fb.group({
            'forceEmail' : [null, Validators.compose([Validators.required, Validators.pattern(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)])]
          });

          this.email     = this.passwordResetForm.controls['email'];
          this.securityAnswer = this.passwordResetForm.controls['securityAnswer'];
          this.password = this.passwordResetForm.controls['password'];
          this.confirmPassword = this.passwordResetForm.controls['confirmPassword'];
          this.forceEmail = this.forcePasswordResetForm.controls['forceEmail'];
    }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
    console.log(this.passwordResetForm.controls['email'].valid)

  }
  // must be present with auto-unsubscribe even if empty
  ngOnDestroy() {
    // You can also do whatever you need here
  }

  checkPasswords( group: FormGroup ) {

    let pass = group.get('password').value
    let confirm = group.get('confirmPassword').value
    console.log(group)
    if (group.controls.password.invalid) {

        // display helper message if password does not meet criteria
        return { notValid : true }

    } else if(pass !== confirm) {

        // compare password with confirmation, display message if no match
        return { notSame : true }
    }


}
public retrieveSecurityQuestion(email){
    // Start spinner
    this.processing = true;
    this.securityQuestionError = '';

    // Call API to get security question for user's email
    this.customerService.getSecurityQuestion(email).subscribe(question => {
        console.log(question._body)
      this.processing = false;
      this.foundSecurityQuestion = true;
      this.securityQuestion = question._body;
    }, error => {
      this.processing = false;
      let errorMessage = JSON.parse(error._body).message;
      this.securityQuestionError = errorMessage;
    });

    return false;
  }

  public resetPasswordWithAnswer(formData){

    if(formData.valid){
      this.processing = true;
      let newPassData: InPasswordReset = {
        Email : formData.get('email').value,
        SecurityAnswer : formData.get('securityAnswer').value,
        NewPassword : formData.get('password').value
      }

      this.customerService.passwordResetWithAnswer(newPassData).subscribe(result => {
        if(result){
          this.processing = false;
          this.passwordResetError = '';
          this.passwordSuccess = true;
        }
      }, error => {
        this.processing = false;
        let errorMessage = JSON.parse(error._body).message;
        this.passwordResetError = errorMessage;
      })
    }
  }

  public forcePasswordReset(formData){
    this.forceProcessing = true;
    this.forcePasswordError = '';

    if(formData.valid){
      let psReset = {
        Email : formData.get('forceEmail').value
      }
      this.customerService.forcePasswordReset(psReset).subscribe(result => {
        this.forcePasswordSuccess = true;
        this.forceProcessing = false;
      }, error => {
        let errorMessage = JSON.parse(error._body).message;
        this.forcePasswordError = errorMessage;
        this.forceProcessing = false;
      })
    }
  }

  public swapForms(): boolean{
    this.switchForms = !this.switchForms;
    return false;
  }

}
