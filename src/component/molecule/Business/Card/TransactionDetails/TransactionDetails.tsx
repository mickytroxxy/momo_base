import { gpsh, gpsw } from '@/utils/parseTokenStyle';
import { Box, Icon, Text } from '@atom';
import React from 'react';
import TransactionDetailItem from './TransactionDetailItem';
import HorizontalCardSeparator from '@/component/molecule/Card/HorizontalCardSeparator';
import { cardsPaymentSummaryBg, cardsPaymentSummaryBorder, cardsPaymentSummaryBorderColour, cardsPaymentSummaryBorderRadius, cardsPaymentSummaryFontColour1, cardsPaymentSummaryFontSize3, cardsPaymentSummaryFontWeight1, cardsPaymentSummaryHeight, cardsPaymentSummaryRowTopPading, cardsPaymentSummaryWidth } from '@/style-dictionary-dist/momoStyle';
import { fontFamily } from '@/style/theme';
import { View } from 'react-native';

const TransactionDetails = ({ transactionDetailsArr = [], pagetitle = '', paymentDetailsArr=[] }: any) => {
  
  return (
    <Box
      style={{
        backgroundColor: cardsPaymentSummaryBg,
        borderRadius: gpsw(cardsPaymentSummaryBorderRadius),
        paddingTop: gpsh('36'),
        borderWidth: gpsh('2'),
        borderColor: cardsPaymentSummaryBorderColour,
        width: gpsw(cardsPaymentSummaryWidth),
        elevation:1,
        paddingBottom:gpsh('12')
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
          {pagetitle}
        </Text>
        <HorizontalCardSeparator w={1} />
      </Box>

      <Box
        style={{
          paddingTop: gpsh(cardsPaymentSummaryRowTopPading),
          paddingHorizontal: gpsw('7'),gap:gpsh('14'),marginHorizontal: gpsw('12'),
        }}>
        {transactionDetailsArr.length > 0 && transactionDetailsArr.map((item: any, index: any) => {
          const { title, value } = item
          return (
            <View key={index} style={{flexDirection:'row'}}>
              <View style={{flex:1}}><Text style={{fontFamily:fontFamily('Medium'),fontSize:gpsh('12'),color:'black'}}>{title}</Text></View>
              <View style={{alignItems:'flex-end'}}><Text style={{fontFamily:fontFamily('Light'),fontSize:gpsh('12'),color:'#5F5F5F'}}>{value}</Text></View>
            </View>
          )
        }
        )}
      </Box>
      <Box
        style={{
          backgroundColor: '#F4F4F4',
          paddingTop: gpsh('15'),
          paddingHorizontal: gpsw('7'),
          marginHorizontal: gpsw('12'),
          borderRadius: gpsw('10'),
          marginTop:gpsh('10'),
          paddingVertical:gpsh('15'),
          gap:gpsh('14')
        }}>
        {paymentDetailsArr.length > 0 && paymentDetailsArr.map((item: any, index: any) => {
          const { title, value, icon } = item
          return (
            <View key={index} style={{flexDirection:'row'}}>
              <View style={{flex:1,flexDirection:'row'}}>
                <Text style={{fontFamily:fontFamily('Medium'),fontSize:gpsh('12'),color:'black'}}>{title}</Text>
                {icon && <View style={{marginLeft:gpsh('12')}}><Icon name="InfoIcon" size={16} /></View>}
              </View>
              <View style={{alignItems:'flex-end'}}><Text style={{fontFamily:fontFamily('Light'),fontSize:gpsh('12'),color:'#5F5F5F'}}>{value}</Text></View>
            </View>
          )
        }
        )}
        {/* <TransactionDetailItem title="Amount" value="GHc 989.00" />
        <TransactionDetailItem icon title="Fees" value="GHc 9.99" />
        <TransactionDetailItem total title="Total" value="GHc 999.99" /> */}
      </Box>
    </Box>
  );
};

export default TransactionDetails;


// import { gpsh, gpsw } from '@/utils/parseTokenStyle';
// import { Box, Text } from '@atom';
// import React from 'react';
// import TransactionDetailItem from './TransactionDetailItem';
// import HorizontalCardSeparator from '@/component/molecule/Card/HorizontalCardSeparator';
// import { cardsPaymentSummaryBg, cardsPaymentSummaryBorder, cardsPaymentSummaryBorderColour, cardsPaymentSummaryBorderRadius, cardsPaymentSummaryFontColour1, cardsPaymentSummaryFontSize3, cardsPaymentSummaryFontWeight1, cardsPaymentSummaryHeight, cardsPaymentSummaryRowTopPading, cardsPaymentSummaryWidth } from '@/style-dictionary-dist/momoStyle';
// import { fontFamily } from '@/style/theme';
// import { formatDate, formatTime } from 'methods';

// const TransactionDetails = (values: any) => {
//   console.log(values, 'values')
//   const {
//     startdate = '',
//     // fromaccount = '',
//     // tomessage = '',
//     // fromfirstname = '',
//     // fromlastname = '',
//     // originalamount = {},
//     // transfertype = '',
//     // toamount = {},
//     // fromtotalbalance = {},
//     // instructionid = ''

//     financialtransactionid='',
//     datetime='',
//     from='',
//     type='',
//     reference='',
//     amount='',
//     toamount={},
//     fromamount={},
//     transactionstatus='',
//     fromfirstname='',
//     fromlastname='',
//     IsmoneyReceive='',
//     fromUser=''

//     // "financialtransactionid": "535401",
//     // "datetime": getNoOfDate(1),
//     // "from": "FRI:233596254713/MSISDN",
//     // "type": "EXTERNAL_PAYMENT",
//     // "reference": "PAYMENT",
//     // "amount": "40.00",
//     // "balance": "9251.42",
//     // "toamount":{
//     //   "amount":120,
//     //   "currency":'GHc'
//     // },
//     // "transactionstatus":"SUCCESS",
//     // fromfirstname:userDetails.firstname,
//     // fromlastname:userDetails.surname

//   } = values


//   return (
//     <Box
//       style={{
//         backgroundColor: cardsPaymentSummaryBg,
//         borderRadius: gpsw(cardsPaymentSummaryBorderRadius),
//         paddingTop: gpsh('36'),
//         borderWidth: parseInt(cardsPaymentSummaryBorder.width),
//         borderColor: cardsPaymentSummaryBorderColour,
//         width: gpsw(cardsPaymentSummaryWidth),
//         // height: gpsh(cardsPaymentSummaryHeight)
//       }}>
//       <Box
//         style={{
//           paddingHorizontal: gpsw('24'),
//         }}>
//         <Text
//           style={{
//             paddingBottom: gpsw('24'),
//             fontSize: gpsw(cardsPaymentSummaryFontSize3),
//             fontFamily: fontFamily(cardsPaymentSummaryFontWeight1),
//             color: cardsPaymentSummaryFontColour1,
//             lineHeight: gpsh('23.4')
//           }}
//         >
//           Transaction Details
//         </Text>
//         <HorizontalCardSeparator w={1} />
//       </Box>

//       <Box
//         style={{
//           paddingTop: gpsh(cardsPaymentSummaryRowTopPading),
//           paddingHorizontal: gpsw('24'),
//         }}>
//         {datetime != '' &&
//           <>
//             <TransactionDetailItem title="Date" value={formatDate(datetime)} />
//             <TransactionDetailItem title="Time" value={formatTime(datetime)} />
//           </>
//         }
//         {fromUser &&
//           <TransactionDetailItem title="From" value={fromUser} />
//         }
//         {type &&
//           <TransactionDetailItem title="Transaction Type" value={type} />

//         }
//         {financialtransactionid &&
//           <TransactionDetailItem title="Transaction ID" value={financialtransactionid} />
//         }
//         {reference &&
//           <TransactionDetailItem title="Reference" value={reference} />
//         }
//       </Box>
//       {IsmoneyReceive&& toamount.amount ?
//       <Box
//         style={{
//           backgroundColor: '#F4F4F4',
//           // backgroundColor: '#F4F4F4',
//           paddingTop: gpsh('15'),
//           paddingBottom: gpsh('5'),
//           paddingHorizontal: gpsw('12'),
//           marginHorizontal: gpsw('12'),
//           marginBottom: gpsw('12'),
//           borderRadius: gpsw('10'),
//         }}>
//         <TransactionDetailItem title="Amount" value={`${toamount.currency} ${toamount.amount}`} />
//         <TransactionDetailItem icon title="Fees" value={`${toamount.currency} ${toamount.amount}`} />
//         <TransactionDetailItem total title="Total" value={`${toamount.currency} ${toamount.amount}`} />
//       </Box>
//          :
//          IsmoneyReceive==false&& fromamount.amount ?
//          <Box
//          style={{
//            backgroundColor: '#F4F4F4',
//            // backgroundColor: '#F4F4F4',
//            paddingTop: gpsh('15'),
//            paddingBottom: gpsh('5'),
//            paddingHorizontal: gpsw('12'),
//            marginHorizontal: gpsw('12'),
//            marginBottom: gpsw('12'),
//            borderRadius: gpsw('10'),
//          }}>
//          <TransactionDetailItem title="Amount" value={`${fromamount.currency} ${fromamount.amount}`} />
//          <TransactionDetailItem icon title="Fees" value={`${fromamount.currency} ${fromamount.amount}`} />
//          <TransactionDetailItem total title="Total" value={`${fromamount.currency} ${fromamount.amount}`} />
//        </Box>:<></> }
//     </Box>
//   );
// };

// export default TransactionDetails;
