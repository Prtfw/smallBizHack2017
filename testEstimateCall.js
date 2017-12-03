export const estimate = {
  Line: [
    {
      Id: "1",
      LineNum: 1,
      Description: "Dev Project 1",
      Amount: 72023.0,
      DetailType: "SalesItemLineDetail",
      SalesItemLineDetail: {
        ItemRef: {
          value: "10",
          name: "Pest Control",
        },
        UnitPrice: 72023,
        Qty: 1,
        TaxCodeRef: {
          value: "NON",
        },
      },
    },
    {
      Amount: 72023.0,
      DetailType: "SubTotalLineDetail",
      SubTotalLineDetail: {},
    },
    // {
    //   Amount: 3.5,
    //   DetailType: "DiscountLineDetail",
    //   DiscountLineDetail: {
    //     PercentBased: true,
    //     DiscountPercent: 10,
    //     DiscountAccountRef: {
    //       value: "86",
    //       name: "Discounts given",
    //     },
    //   },
    // },
  ],
  TxnTaxDetail: {
    TotalTax: 0,
  },
  CustomerRef: {
    value: "3",
    name: "Cool Cars",
  },
  CustomerMemo: {
    value: "Thank you for your business and have a great day!",
  },
  BillAddr: {
    Id: "4",
    Line1: "65 Ocean Dr.",
    City: "Half Moon Bay",
    CountrySubDivisionCode: "CA",
    PostalCode: "94213",
    Lat: "37.4300318",
    Long: "-122.4336537",
  },
  ShipAddr: {
    Id: "4",
    Line1: "65 Ocean Dr.",
    City: "Half Moon Bay",
    CountrySubDivisionCode: "CA",
    PostalCode: "94213",
    Lat: "37.4300318",
    Long: "-122.4336537",
  },
  TotalAmt: 72023,
  ApplyTaxAfterDiscount: false,
  PrintStatus: "NeedToPrint",
  EmailStatus: "NotSet",
  BillEmail: {
    Address: "mns_catdogmice@yahoo.com",
  },
};
//{
//   Line: [
//     {
//       Id: "1",
//       LineNum: 1,
//       Description: "Dev Project 1",
//       Amount: 72023.0,
//       DetailType: "SalesItemLineDetail",
//       SalesItemLineDetail: {
//         ItemRef: {
//           value: "10",
//           name: "Pest Control",
//         },
//         UnitPrice: 72023.0,
//         Qty: 1,
//         TaxCodeRef: {
//           value: "NON",
//         },
//       },
//     },
//     {
//       Amount: 72023.0,
//       DetailType: "SubTotalLineDetail",
//       SubTotalLineDetail: {},
//     },
//     // {
//     //   Amount: 3.5,
//     //   DetailType: "DiscountLineDetail",
//     //   DiscountLineDetail: {
//     //     PercentBased: true,
//     //     DiscountPercent: 10,
//     //     DiscountAccountRef: {
//     //       value: "86",
//     //       name: "Discounts given",
//     //     },
//     //   },
//     // },
//   ],
//   TxnTaxDetail: {
//     TotalTax: 0,
//   },
//   CustomerRef: {
//     value: "3",
//     name: "Cool Cars",
//   },
//   CustomerMemo: {
//     value: "Thank you for your business and have a great day!",
//   },
//   BillAddr: {
//     Id: "4",
//     Line1: "65 Ocean Dr.",
//     City: "Half Moon Bay",
//     CountrySubDivisionCode: "CA",
//     PostalCode: "94213",
//     Lat: "37.4300318",
//     Long: "-122.4336537",
//   },
//   ShipAddr: {
//     Id: "4",
//     Line1: "65 Ocean Dr.",
//     City: "Half Moon Bay",
//     CountrySubDivisionCode: "CA",
//     PostalCode: "94213",
//     Lat: "37.4300318",
//     Long: "-122.4336537",
//   },
//   TotalAmt: 72023,
//   ApplyTaxAfterDiscount: false,
//   PrintStatus: "NeedToPrint",
//   EmailStatus: "NotSet",
//   BillEmail: {
//     Address: "mns_catdogmice@yahoo.ca",
//   },
// };
