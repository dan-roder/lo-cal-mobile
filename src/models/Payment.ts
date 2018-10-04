export interface SavedPayment{
    $id: string;
    AccountId: string;
    AccountNumber: string;
    ExpirationDate: string;
    MaskedAccountNumber: string;
    MaskedExpirationDate: string;
    MethodType: number;
    ProviderType: number;
    SecurityCode: string;
    ZipCode: string;
  }

  export interface RailsSavePayment{
    payment: {
      AccountNumber: string;
      ExpirationDate: string;
      PaymentMethodType: number;
    }
  }

  export interface InSubmitOrderInformation{
    PaymentMethods: Array<Payment>; // [(Payment)] Required) : Information describing the Payment Method ,
    Vehicle?: Vehicle; // (Vehicle , optional) : Information describing the Vehicle ,
    LoyaltyNumber?: string; // (string , optional) ,
    SpecialInstructions?: string; // (string , optional) ,
    SendEmail?: boolean; // (boolean , optional) ,
    FavoriteName?: string; // (string , optional) ,
    UpdateTimeDisabled?: boolean; // (boolean , optional) ,
    EnforceATODeposit?: boolean; // (boolean , optional) ,
    ASAPDeliveryTimeEnabled?: boolean; // (boolean , optional) : Information that sets the delivery time to ASAP, this bypasses the earlier available time
  }

  export interface Payment{
    PaymentMethod: number; // 0 - SecureCreditCardPayment (saved), 1 - ClearCreditCardPayment, 2 - PayAtSitePayment
    AccountId?: string; // Used for SecureCreditCardPayment
    AccountNumber?: number; // Credit card number
    ExpirationDate?: string; // The expiration date for the credit card required for ClearCreditCardPayment
    SecurityCode?: string; // The security code for the credit card required for ClearCreditCardPayment
    Amount?: number; // Amount to be paid for this payment method. A positive non-zero amount is required when applying stored value payments.
    ZipCode?: string; // The billing zip code for the credit card, used with the ClearCreditCardPayment enum
    CardNumber?: string; // The billing zip code for the credit card, used with the ClearCreditCardPayment enum
    Pin?: string; // Pin for Stored Value Card payment. Required if attempting to apply stored value and if company setting "Aloha Enterprise ePin Validation Required" is set to true.
    PaymentMethodType?: number; // <i>Nullable</i> What kind of card is passed in, used with ClearCreditCardPayment enum NOTE: Include this field with every payment.
    ProcessingType?: number;
  }

  export interface Vehicle{
    Make?: string; // (string , optional) : The make of the vehicle ,
    Model?: string; // (string , optional) : The model of the vehicle ,
    Color?: string; // (string , optional) : The color of the vehicle
  }

  export interface RailsInSubmitOrder{
    order_submission : InSubmitOrderInformation
  }
