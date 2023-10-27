import { gpsh, gpsw } from '@/utils/parseTokenStyle';
import { Box, Text } from '@atom';
import React from 'react';
import TransactionDetailItem from './TransactionDetailItem';
import HorizontalCardSeparator from '@/component/molecule/Card/HorizontalCardSeparator';
import { cardsPaymentSummaryBg, cardsPaymentSummaryBorder, cardsPaymentSummaryBorderColour, cardsPaymentSummaryBorderRadius, cardsPaymentSummaryFontColour1, cardsPaymentSummaryFontSize3, cardsPaymentSummaryFontWeight1, cardsPaymentSummaryHeight, cardsPaymentSummaryRowTopPading, cardsPaymentSummaryWidth } from '@/style-dictionary-dist/momoStyle';
import { fontFamily } from '@/style/theme';
import { formatDate, formatTime } from 'methods';


const TransactionDetailsData = (values: any) => {
  //console.log(values.setIsWhatFeesShown, 'values')
  const {
    startdate = '',
    // fromaccount = '',
    // tomessage = '',
    // fromfirstname = '',
    // fromlastname = '',
    // originalamount = {},
    // transfertype = '',
    // toamount = {},
    // fromtotalbalance = {},
    // instructionid = ''

    financialtransactionid='',
    datetime='',
    from='',
    type='',
    reference='',
    amount='',
    toamount={},
    fromamount={},
    transactionstatus='',
    fromfirstname='',
    fromlastname='',
    IsmoneyReceive='',
    fromUser=''

    // "financialtransactionid": "535401",
    // "datetime": getNoOfDate(1),
    // "from": "FRI:233596254713/MSISDN",
    // "type": "EXTERNAL_PAYMENT",
    // "reference": "PAYMENT",
    // "amount": "40.00",
    // "balance": "9251.42",
    // "toamount":{
    //   "amount":120,
    //   "currency":'GHc'
    // },
    // "transactionstatus":"SUCCESS",
    // fromfirstname:userDetails.firstname,
    // fromlastname:userDetails.surname

  } = values


  return (
    <Box
      style={{
        backgroundColor: cardsPaymentSummaryBg,
        borderRadius: gpsw(cardsPaymentSummaryBorderRadius),
        paddingTop: gpsh('36'),
        borderWidth: parseInt('2'),
        borderColor: 'rgba(232, 232, 232, 0.50)',
        width: gpsw(cardsPaymentSummaryWidth),
        // height: gpsh(cardsPaymentSummaryHeight)
      }}>
        
      <Box
        style={{
          paddingHorizontal: gpsw('24'),
        }}>
        <Text
          style={{
            paddingBottom: gpsw('24'),
            fontSize: gpsw(cardsPaymentSummaryFontSize3),
            fontFamily: fontFamily(cardsPaymentSummaryFontWeight1),
            color: cardsPaymentSummaryFontColour1,
            lineHeight: gpsh('23.4')
          }}
        >
          Transaction Details
        </Text>
        <HorizontalCardSeparator w={1} />
      </Box>

      <Box
        style={{
          paddingTop: gpsh(cardsPaymentSummaryRowTopPading),
          paddingHorizontal: gpsw('24'),
        }}>
        {datetime != '' &&
          <>
            <TransactionDetailItem title="Date" value={formatDate(datetime)} />
            <TransactionDetailItem title="Time" value={formatTime(datetime)} />
          </>
        }
        {fromUser &&
          <TransactionDetailItem title="From" value={fromUser} />
        }
        {type &&
          <TransactionDetailItem title="Transaction Type" value={type} />

        }
        {financialtransactionid &&
          <TransactionDetailItem title="Transaction ID" value={financialtransactionid} />
        }
        {reference &&
          <TransactionDetailItem title="Reference" value={reference} />
        }
      </Box>
      {IsmoneyReceive&& toamount.amount ?
      <Box
        style={{
          backgroundColor: '#F4F4F4',
          // backgroundColor: '#F4F4F4',
          paddingTop: gpsh('15'),
          paddingBottom: gpsh('5'),
          paddingHorizontal: gpsw('12'),
          marginHorizontal: gpsw('12'),
          marginBottom: gpsw('12'),
          borderRadius: gpsw('10'),
        }}>
        <TransactionDetailItem title="Amount" value={`${toamount.currency} ${toamount.amount}`} />
        <TransactionDetailItem setIsWhatFeesShown={values.setIsWhatFeesShown} icon title="Fees" value={`${toamount.currency} ${toamount.amount}`} />
        <TransactionDetailItem total title="Total" value={`${toamount.currency} ${toamount.amount}`} />
      </Box>
         :
         IsmoneyReceive==false&& fromamount.amount ?
         <Box
         style={{
           backgroundColor: '#F4F4F4',
           // backgroundColor: '#F4F4F4',
           paddingTop: gpsh('15'),
           paddingBottom: gpsh('5'),
           paddingHorizontal: gpsw('12'),
           marginHorizontal: gpsw('12'),
           marginBottom: gpsw('12'),
           borderRadius: gpsw('10'),
         }}>
         <TransactionDetailItem title="Amount" value={`${fromamount.currency} ${fromamount.amount}`} />
         <TransactionDetailItem setIsWhatFeesShown={values.setIsWhatFeesShown} icon title="Fees" value={`${fromamount.currency} ${fromamount.amount}`} />
         <TransactionDetailItem total title="Total" value={`${fromamount.currency} ${fromamount.amount}`} />
       </Box>:<></> }

    </Box>
  );
};

export default TransactionDetailsData;
