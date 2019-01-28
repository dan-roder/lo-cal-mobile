import { LineItem, LineItemModifier } from "./lineItem";
import { Customer, CustomerAddress } from "./customer";

export interface Order{
  SiteId?: number; //  (integer , optional) : Get or set the SiteId property ,
  OrderId?: number; //  (integer , optional) : Get or set the OrderId property ,
  MenuId?: number; //  (integer , optional) : Get or set the MenuId property ,
  DesignId?: number; //  (integer , optional) : Get or set the DesignId property ,
  OrderMode?: number; //  (enum , optional) = ['Pickup' or 'Delivery' or 'CurbSide'] : Get or set the OrderMode property ,
  LastModifiedTimestamp?: string; //  (string , optional) : Get or set the LastModifiedTimestamp property ,
  Status?: string; //  (enum , optional) = ['Unordered' or 'Validated' or 'Submitted' or 'PendingOperation' or 'Deleted' or 'CreditProcessed' or 'SubmittedAndCanceled' or 'SubmittedWithDepositFailure'] : Get or set the Status property ,
  PromiseDateTime?: string; //  (string , optional) : Get or set the PromiseDateTime property ,
  PaymentMode?: string; //  (enum , optional) = ['Unknown' or 'ProvidedToSite' or 'PaymentDeferred' or 'PaidOnline'] : Get or set the PaymentMode property ,
  Customer?: Customer; // (OrderCustomer , optional) : Get or set the Customer property ,
  CustomerAddressForOrder?: CustomerAddress; // (CustomerAddress , optional) : Get or set the CustomerAddressForOrder property ,
  LineItems?: Array<LineItem>; // (array[ExternalLineItem] , optional) : Get or set the LineItems property ,
  SubTotalAmount?: number; //  (number , optional) : Get or set the SubTotalAmount property ,
  TaxAmount?: number; //  (number , optional) : Get or set the TaxAmount property ,
  PaymentAmount?: number; //  (number , optional) : Get or set the PaymentAmount property ,
  TotalAmount?: number; //  (number , optional) : Get or set the TotalAmount property ,
  BalanceDueAmount?: number; //  (number , optional) : Get or set the BalanceDueAmount property ,
  LoyaltyCardNumber?: string; //  (string , optional) : Get or set the loyalty card number sent with the order ,
  OrderSource?: string; //  (enum , optional) = ['Web' or 'Mobile' or 'MobileWeb'] : Get or set the OrderSource property ,
  Destination?: string; //  (enum , optional) = ['DestinationNull' or 'MobileDineIn' or 'MobileCarryOut' or 'MobileCurbSide' or 'MobileDriveThru' or 'CateringPickup' or 'CateringDelivery'] : Describes where the order is suppose to be at ,
  NextItemLineNumber?: number; //  (integer , optional) : Get or set the NextItemLineNumber property ,
  SpecialInstructions?: string; //  (string , optional) : Get or set the SpecialInstructions property ,
  SubmitCommandId?: string; //  (Guid , optional) : Get or set the SubmitCommandId property ,
  SubmitOrderNumber?: number; //  (integer , optional) : Get or set the SubmitOrderNumber property ,
  SubmitMessage?: string; //  (string , optional) : Get or set the SubmitMessage property ,
  CreationDateTime?: string; //  (string , optional) : Get or set the CreationDateTime property ,
  CompId?: number; //  (integer , optional) : Get or set the CompId property ,
  CompValue?: number; //  (number , optional) : Get or set the CompValue property ,
  CompName?: string; //  (string , optional) : Get or set the CompName property ,
  DeliveryFeeAmount?: number; //  (number , optional) : Get or set the DeliveryFeeAmount property ,
  TaxJurisdictionId?: number; //  (integer , optional) : Get or set the TaxJurisdictionId property ,
  SubmitOrderId?: number; //  (integer , optional) : Get or set the SubmitOrderId property ,
  IsFailover?: boolean; //  (boolean , optional) : Get or set the IsFailover property ,
  ReferenceNumber?: number; //  (integer , optional) : Gets or sets the reference number. ,
  ComboItems?: Array<ComboItem>; // (array[ComboItem] , optional) : A list of combo items in the order ,
  SVCAmount?: number; //  (number , optional) : Stored value card amount applied to the order ,
  Payments?: Array<any>; // (array[ExternalPayment] , optional) : List of payments assigned to this order ,
  NextOrderOfProcessing?: number; //  (integer , optional) : The order of processing that will be given to the next payment added to the order
}

export interface ComboItem{
  PromoId?: number; // (integer , optional) : the promo id ,
  PromoType?: string; // (enum , optional) = ['Unknown' or 'BOGO' or 'Combo' or 'Coupon' or 'NewPrice' or 'CheckReduction' or 'QuickCombo' or 'PackagePromo'] : The combo type of the combo item ,
  Price?: number; // (number , optional) : price of the combo item ,
  WebSalesGroupLineItems?: Array<OrderWebSalesGroup>; // (array[OrderWebSalesGroup] , optional) : A List of web sales group items in the combo item
}

export interface OrderWebSalesGroup{
  WebSalesGroupId?: number; // (integer , optional) : WebSalesGroupId, this pertains mainly to Menu Configurator where sales items are grouped ,
  LineItemNumber?: number; // (integer , optional) : LineItem Number, relates back to the line item object of the Order ,
  GroupLineId?: number; // (integer , optional) : LineItem Number, random unique lineId of the combo generated on add items This will be used to group the combos items together ,
  MenuItemName?: string; // (string , optional) : MenuItem Name ,
  SalesItemId?: number; // (integer , optional) : The item id in the SalesItemId table
}

export interface OrderResults{
  ResultCode: string; // (enum , optional) = ['Success|0' or 'GeneralFailure|1' or 'SiteCommunicationFailure|2' or 'ItemFailures|3' or 'PromiseTimeChanged|4' or 'OrderMinimumNotMet|5' or 'FailedToStartOrder|6' or 'FailedToUpdateOrder|7' or 'InvalidSiteOrOrder|11' or 'SiteNotAcceptingOrders|12' or 'CapacityExceeded|13' or 'InvalidPaymentInformation|14' or 'FailedToSubmitOrder|15' or 'UnsupportedOrderMode|16'] : Gets or sets the ResultCode ,
  OrderId: number; // (integer , optional) : ID of newly created order. ,
  Order: any; // (ExternalOrder , optional) : Gets or sets the modified Order to be returned ,
  HasFailedItems: boolean; // (boolean , optional) : Indiciates whether or not any of the items in the order failed ,
  FailedItems: Array<LineItem>; // (array[ExternalLineItem] , optional) : List of all the Items that either failed or have modifiers that failed ,
  FailedModifiers: Array<LineItemModifier>; // (array[ExternalLineItemModifier] , optional) : List of all the Modifiers that either failed or have modifiers that failed ,
  ErrorMessage: string; // (string , optional) : The error message receivied from the AppDomain ,
  ErrorCode: number; // (integer , optional) : The site communication error code ,
  AmountDueAtSite: number; // (number , optional) : The payment amount due at the site upon pickup
  FinancialSummary: any;
}

export interface InOrderLineItem{
  ItemLineNumber?: number; //  (integer , optional) : The internal index for the line items for the order ,
  SalesItemId?: number; //  (integer Required Range: inclusive between 1 and 9.22337203685478E+18) : The item id in the SalesItemId table ,
  MenuItemId?: number; //  (integer Required Range: inclusive between 1 and 9.22337203685478E+18) : The item id in the MenuItem table ,
  SpecialInstructions?: string; //  (string , optional) : Special instructions for this item ,
  RecipientName?: string; //  (string , optional) : The person that is suppose to receive this specific item ,
  Quantity?: number; //  (integer , optional) : The number of items ,
  NextModifierSequenceNumber?: number; //  (integer , optional) : The internal index for the modifiers for this line item ,
  ItemOrderingMode?: string; // (enum , optional) = ['Normal' or 'Pizza' or 'QtyModifierItem' or 'BuildYourOwn' or 'ModifierDeterminesQty'] : Tells the POS how to apply the modifiers to the item ,
  UnitPriceOverride?: number; // (number , optional) : Nullable Used in conjunction with EnablePriceOverride to override the POS price. EnablePriceOverride must be True ,
  EnablePriceOverride?: boolean; // (boolean , optional) : Nullable Used in conjunction with UnitPriceOverride to override the POS price. The site setting UseTakeOutPrice must also be True ,
  Section1Type?: string; // (enum , optional) = ['Unassigned' or 'Half' or 'Third' or 'Quarter' or 'Left' or 'Right'] : Nullable Pizza configuration _only used for Pizza items_ ,
  Section2Type?: string; // (enum , optional) = ['Unassigned' or 'Half' or 'Third' or 'Quarter' or 'Left' or 'Right'] : Nullable Pizza configuration _only used for Pizza items_ ,
  Section3Type?: string; // (enum , optional) = ['Unassigned' or 'Half' or 'Third' or 'Quarter' or 'Left' or 'Right'] : Nullable Pizza configuration _only used for Pizza items_ ,
  Section4Type?: string; // (enum , optional) = ['Unassigned' or 'Half' or 'Third' or 'Quarter' or 'Left' or 'Right'] : Nullable Pizza configuration _only used for Pizza items_ ,
  Modifiers?: Array<InOrderLineItemModifier>; // [(InOrderLineItemModifier)] , optional) : The modfiers for the item
}

export interface InOrderLineItemModifier{
  SequenceNumber?: number; // (integer , optional) : The internal index for the modfiers for an line item ,
  ItemOptionGroupId: number; // (integer Required Range: inclusive between 1 and 9.22337203685478E+18) : The group id in the ItemOptionGroups table ,
  SalesItemOptionId: number; // (integer Required Range: inclusive between 1 and 9.22337203685478E+18 ) : The option id in the SalesItemOptions table ,
  Action?: string; // (string , optional) = ['Default' or 'Add' or 'No' or 'Extra' or 'Side' or 'Light' or 'Everything' or 'Plain'] : Tells the system how the modifier should be applied to the line item ,
  DefaultAction?: string; // (string , optional) = ['Default' or 'Add' or 'No' or 'Extra' or 'Side' or 'Light' or 'Everything' or 'Plain'] : The default way how the modifier is added to the item ,
  ItemLineNumber?: number; // (integer , optional) : The line item index where this modifier is to be applied to use 0 if the parent item is a modifier ,
  ParentSequenceNumber?: number; // (integer , optional) : The parent internal index for the modifier where this modifier is to be applied to ,
  Quantity?: number; // (integer , optional) : The number of modifiers that should be applied. ,
  IsOnEntireItem?: boolean; // (boolean , optional) : Nullable Value to match up the Pizza configuration, if no value is provided defaults to true ,
  IsOnSection1?: boolean; // (boolean , optional) : Nullable Value to match up the Pizza configuration, if no value is provided defaults to false ,
  IsOnSection2?: boolean; // (boolean , optional) : Nullable Value to match up the Pizza configuration, if no value is provided defaults to false ,
  IsOnSection3?: boolean; // (boolean , optional) : Nullable Value to match up the Pizza configuration, if no value is provided defaults to false ,
  IsOnSection4?: boolean; // (boolean , optional) : Nullable Value to match up the Pizza configuration, if no value is provided defaults to false ,
  FreeQuantity?: number; // (integer , optional) : The number of modifiers that are to be free ,
  Modifiers?: Array<InOrderLineItemModifier>; // [(InOrderLineItemModifier)] , optional) : Allows the user add modifiers to another modifier
}

export interface ComboItem{

}

export interface RailsOrder{
  order : any;
}
