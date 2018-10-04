export interface Customer {
    CustomerId?: string; //  (Guid , optional) : Nullable The unique identifier for a customer. PUT - CustomerId will be ignored ,
    EMail: string; //  (integer , Required) : The customer's email address ,
    FirstName: string; //  (integer , Required) : The customer's first name ,
    LastName: string; //  (integer , Required) : The customer's last name ,
    BusinessName?: string; //  (string , optional) : The customer's business name ,
    VoicePhone?: string; //  (string , optional) : The customer's primary phone number ,
    VoicePhoneExtension?: string; // (string Max length: 4, optional) : The customer's primary phone number extension ,
    DepartmentName?: string; //  (string , optional) : The customer's department name ,
    AltPhone?: string; //  (string , optional) : The customer's second phone number ,
    AltPhoneExtension?: string; // (string Max length: 4, optional) : The customer's second phone number's extension ,
    FavoriteSiteId?: number; //  (integer , optional) : The site id that the customer likes the most ,
    LoyaltyCardNumber?: string; //  (string , optional) : The customer's loyalty number ,
    SecondaryEmailAddress?: string; //  (string , optional) : The customer's second email address ,
    Addresses: Array<CustomerAddress>; // (array[CustomerAddress] Required) : A collection of addresses for this customer ,
    Birthday?: string; //  (string , optional) : Get or set the Birthday property ,
    LoyaltyZipCode?: string; //  (string , optional) : Get or set the LoyaltyZipCode property ,
    FacebookId?: number; //  (integer , optional) : Get or sets facebookid property
}

export interface CustomerAddress {
    AddressId?: number; //  (integer , optional) : Nullable The Id of the address ,
    AddressType?: string; // (enum , optional) = ['Billing' or 'NonBilling'] : Nullable Get or set the AddressType property ,
    IsDefault?: boolean; // (boolean , optional) : True if this is the default address for a customer ,
    Description?: string; //  (string , optional) : A descriptive name for the address (e.g. Home, Office, Girl Friends House) ,
    DepartmentName?: string; //  (string , optional) : The department name if the address is a business ,
    AddressLine1?: string; //  (string , optional) : The first line of the customer's address ,
    AddressLine2?: string; //  (string , optional) : The second line of the customer's address ,
    City?: string; //  (string , optional) : The customer's city of residence ,
    State: string; // (string Max length: 3 Min length: 2, optional) : Required for adresss validation The customer's state of residence ,
    Postal: string; //  (string , optional) : Required for adresss validation The customer's postal code of residence ,
    ExtraData?: Array<any>; // (array[KeyValuePair[String,String]] , optional) : Extra address data valid for company culture
}

export interface InRegistration {
    Customer: Customer;
    Password: string;
    SecurityQuestion: string;
    SecurityAnswer: string;
}

export interface InLogin {
    Email: string;
    Password: string;
}

export interface InLoginUpdate {
    Email: string; // (string Required) ,
    OldPassword: string; // (string Required) ,
    NewPassword: string; // (string , optional) ,
    NewSecurityQuestion?: string; // (string , optional) ,
    NewAnswer?: string; // (string , optional)
}

export interface InPasswordReset{
    Email: string;
    SecurityAnswer: string;
    NewPassword: string;
  }

export interface InPasswordEmailReset{
    Email: string;
    SecurityAnswer: string;
  }

  export interface RailsUpdate{
    customer_info : Customer;
  }

  export interface RailsCustomer{
    customer_info : InRegistration;
  }

  export interface RailsLogin{
    credentials : InLogin;
  }

  export interface MailchimpSignup{
    email_address : string;
    status : string;
  }
