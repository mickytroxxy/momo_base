import { getIsoFormat, getNoOfDate, getTransactionList } from "methods";

let transactionhistoryval =
  [
    {
      "financialtransactionid": "535934",
      "datetime": getIsoFormat(new Date()),
      "from": "FRI:233535121981/MSISDN",
      "type": "TRANSFER",
      "reference": "TRANSFER",
      "amount": "78.00",
      "toamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "balance": "10060.42",
      "transactionstatus": "SUCCESS",

    },
    
    {
      "financialtransactionid": "535408",
      "datetime": getIsoFormat(new Date()),
      "from": "FRI:233244304915/MSISDN",
      "type": "EXTERNAL_PAYMENT",
      "reference": "PAYMENT",
      "amount": "289.00",
      "balance": "8860.42",
      "fromamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "transactionstatus": "SUCCESS",

    },
    {
      "financialtransactionid": "535406",
      "datetime": getNoOfDate(2),
      "from": "FRI:233535121981/MSISDN",
      "type": "EXTERNAL_PAYMENT",
      "reference": "PAYMENT",
      "amount": "100.00",
      "balance": "8862.42",
      "fromamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "transactionstatus": "SUCCESS",

    },

    {
      "financialtransactionid": "8854654",
      "datetime": getNoOfDate(3),
      "from": "FRI:233596254713/MSISDN",
      "type": "EXTERNAL_PAYMENT",
      "reference": "PAYMENT",
      "amount": "289.00",
      "balance": "8962.42",
      "toamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "transactionstatus": "SUCCESS",

    },
    {
      "financialtransactionid": "535404",
      "datetime": getNoOfDate(2),
      "from": "FRI:233596254713/MSISDN",
      "type": "EXTERNAL_PAYMENT",
      "reference": "PAYMENT",
      "amount": "289.00",
      "balance": "8962.42",
      "toamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "transactionstatus": "SUCCESS",

    },
    {
      "financialtransactionid": "535401",
      "datetime": getNoOfDate(1),
      "from": "FRI:233535121981/MSISDN",
      "type": "EXTERNAL_PAYMENT",
      "reference": "PAYMENT",
      "amount": "40.00",
      "balance": "9251.42",
      "toamount": {
        "amount": 120,
        "currency": 'GHc'
      },
      "transactionstatus": "SUCCESS",

    }
  ]
let  transactionhistory = getTransactionList(transactionhistoryval,233244304915);
export const dummyTransaction = [{"fri":"FRI:2880385/MM","accountstatus":"ACTIVE","accounttype":"MOBILE_MONEY","profilename":"MTNGH Normal Account Profile","balance":{"amount":"726.67","currency":"GHS"},"committedbalance":{"amount":"726.67","currency":"GHS"},"totalreservation":{"amount":"0.00","currency":"GHS"},"totalpositivereservation":{"amount":"0.00","currency":"GHS"},"bankdomainname":"ACCESS BANK","lastactivitytime":"2023-10-23T17:06:01.616Z","transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]},{"fri":"FRI:2880387/MM","accountstatus":"ACTIVE","accounttype":"MOBILE_MONEY","profilename":"MTNGH MOMOPAY Account Profile","balance":{"amount":"880.00","currency":"GHS"},"committedbalance":{"amount":"880.00","currency":"GHS"},"totalreservation":{"amount":"0.00","currency":"GHS"},"totalpositivereservation":{"amount":"0.00","currency":"GHS"},"bankdomainname":"ACCESS BANK","lastactivitytime":"2023-10-23T17:07:04.827Z","transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]},{"fri":"FRI:31285216507080968083385837342229@QWIKLOAN-SAVINGS/SP","accountstatus":"ACTIVE","accounttype":"MOBILE_MONEY","balance":{"amount":"1.00","currency":"GHS"},"transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]},{"fri":"FRI:20134605258726973164913610259976@BOSEA-PERSONAL/SP","accountstatus":"ACTIVE","accounttype":"MOBILE_MONEY","balance":{"amount":"1.00","currency":"GHS"},"transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]},{"fri":"FRI:2880386/MM","accountstatus":"ACTIVE","accounttype":"COMMISSIONING","profilename":"MTNGH Commissioning Account Profile","balance":{"amount":"0.00","currency":"GHS"},"committedbalance":{"amount":"0.00","currency":"GHS"},"totalreservation":{"amount":"0.00","currency":"GHS"},"totalpositivereservation":{"amount":"0.00","currency":"GHS"},"bankdomainname":"ACCESS BANK","lastactivitytime":"2023-09-15T12:39:53.072Z","transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]},{"fri":"FRI:2880384/MM","accountstatus":"ACTIVE","accounttype":"LOYALTY_POINTS","profilename":"MTNGH Loyalty Points Account Profile","balance":{"amount":"0","currency":"LOY"},"committedbalance":{"amount":"0","currency":"LOY"},"totalreservation":{"amount":"0","currency":"LOY"},"totalpositivereservation":{"amount":"0","currency":"LOY"},"lastactivitytime":"2023-09-15T12:39:53.059Z","transactions":[{"financialtransactionid":"567120","datetime":"2023-10-23T17:06:01.415Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"60.00","balance":"726.67","toamount":{"amount":"60.00","currency":"GHS"},"fromamount":{"amount":"60.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567119","datetime":"2023-10-23T17:05:41.218Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"786.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"},{"financialtransactionid":"567115","datetime":"2023-10-23T16:58:47.191Z","from":"FRI:233535105508/MSISDN","type":"EXTERNAL_PAYMENT","reference":"PAYMENT","amount":"120.00","balance":"906.67","toamount":{"amount":"120.00","currency":"GHS"},"fromamount":{"amount":"120.00","currency":"GHS"},"transactionstatus":"SUCCESSFUL"}]}]
export default transactionhistory;