// import {Theme} from '@/typings/globalTheme';
// import {useTheme} from '@shopify/restyle';
// import React from 'react';
// import {TouchableOpacity,View} from 'react-native';
// import {Box, Icon, Text} from '@/component/atom';
// import icon from '@/constants/icon';

// import { useDispatch } from 'react-redux';
// import { setTransactions } from '@/features/transactions/transactionSlice';
// import HorizontalCardSeparator from '@/component/molecule/Card/HorizontalCardSeparator';
// import Card from '@/component/molecule/Card/Card';
// import { transactionType } from '@/typings/business';
// import { formatTime } from 'methods';
// import { gpsh } from '@/utils/parseTokenStyle';

// type PropsType = {
//     accountType:string;
//     currency:string;
//     balance:number;
//     transactions:transactionType[]
//     navigation?:any;
//     accountId:any;
// }
// const {CircleRightIcon,MoneyInIcon,MoneyOutIcon,NoTransactionIcon} = icon;
// export const BusinessAccountsHistory = (props:PropsType) => {
//     const {colors} = useTheme<Theme>();
//     const {accountType,currency,balance,transactions,accountId,navigation} = props;
//     const dispatch = useDispatch();
//     return (
//         <View style={{flex:1}}>
//             <Card style={{borderRadius:gpsh('20'),marginBottom:gpsh('12')}} variant={'shadow'}>
//                 <Box>
//                     <Box style={{flexDirection:'row',marginTop:12}}>
//                         <Box>
//                             <Box style={{backgroundColor:'#E8E8E8',borderTopRightRadius:14,borderBottomRightRadius:14,padding:8,width:200,borderTopLeftRadius: gpsh('5'),paddingLeft:20}}><Text color={'momoBlue'} variant={'medium12'}>{accountType}</Text></Box>
//                             <Box style={{flexDirection:'row',paddingLeft:20,width:200}}>
//                             <Text color={'momoBlue'} fontSize={14} fontFamily={'MTNBrighterSans-Bold'} lineHeight={14.2} style={{marginTop:10}}>{currency} </Text>
//                             <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} lineHeight={31.2} style={{fontSize:24}}> {balance.toFixed(2)}</Text>
//                             </Box>
//                         </Box>
//                         <Box style={{flex:1,justifyContent:'center',alignItems:'flex-end'}}>
//                             <TouchableOpacity onPress={() => {
//                                 dispatch(setTransactions(transactions))
//                                 navigation.navigate("Transactions",{accountType,accountId})
//                             }}><Icon name="CircleRightIcon" size={24} style={{marginRight:24}} /></TouchableOpacity>
//                         </Box>
//                     </Box>
//                     <Box style={{padding:20,paddingTop:5}}>
//                     <HorizontalCardSeparator w={1}/>
//                     {transactions?.length > 0 ? transactions?.slice(0,2).map((transactionItem,i) => {
//                         return(
//                         <Box key={i} style={{flexDirection:'row',marginTop:10}}>
//                             <Box style={{justifyContent:'center'}}>{transactionItem.transfertype === 'TRANSFER' ? <MoneyInIcon width={14} height={14}/> : <MoneyOutIcon width={14} height={14}/>}</Box>
//                             <Box style={{justifyContent:'center',flex:1,marginLeft:10}}>
//                                 <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{letterSpacing:-0.5}}>{transactionItem.fromUser}</Text>
//                                 <Text style={{color:'#A5A5A5'}} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{formatTime(transactionItem.time)} {transactionItem.transfertype === 'TRANSFER' ? '• Money In' : ''}</Text>
//                             </Box>
//                             <Box style={{justifyContent:'center'}}>
//                                 <Text lineHeight={28} color={ transactionItem.transfertype === 'TRANSFER' ? 'green80' : 'red80'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>{transactionItem.transfertype === 'TRANSFER' ? '+' : '-'}GHc {transactionItem.amount.toFixed(2)}</Text>
//                             </Box>
//                         </Box>
//                         )
//                     }) : (
//                         <View style={{flexDirection:'row',marginTop:5}}>
//                             <NoTransactionIcon fill={colors.grey} style={{marginRight:24}} width={14} height={14}/>
//                             <View style={{justifyContent:'center'}}><Text variant={'medium12'} style={{color:'#A5A5A5'}} fontSize={10} fontFamily={'MTNBrighterSans-Regular'}>No payments received yet</Text></View>
//                         </View>
//                     )}

//                     </Box>
//                 </Box>
//             </Card>
//         </View>
//     );
// };

import { Theme } from '@/typings/globalTheme';
import { useTheme } from '@shopify/restyle';
import React from 'react';
import { TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { Box, Icon, Text } from '@/component/atom';
import icon from '@/constants/icon';

import { useDispatch, useSelector } from 'react-redux';
import { setTransactions } from '@/features/transactions/transactionSlice';
import HorizontalCardSeparator from '@/component/molecule/Card/HorizontalCardSeparator';
import Card from '@/component/molecule/Card/Card';
import { transactionType } from '@/typings/business';
import { formatTime, getIsoFormat, getNoOfDate, getTransactionList } from 'methods';
import { gpsh } from '@/utils/parseTokenStyle';
import { RootState } from '@/store/store';
import useFetch from '@/hooks/useFetch';
import { setAccounts } from '@/features/transactions/accountSlice';
import CommonLoadingScreen from '@/component/molecule/Confirm/CommonLoadingScreen';
import { TouchableHighlight } from 'react-native-gesture-handler';

type PropsType = {
    accountType: string;
    currency: string;
    balance: any;
    transactions: transactionType[]
    navigation?: any;
    accountId: any;
    fri: any;
    index?:number;
}
const { CircleRightIcon, MoneyInIcon, MoneyOutIcon, NoTransactionIcon } = icon;
export const BusinessAccountsHistory = (props: PropsType) => {
    const { colors } = useTheme<Theme>();
    const { accountType, currency, balance, transactions, accountId, navigation, index } = props;
    const dispatch = useDispatch();
    const {
        amount: balance_amount = 0,
        currency: balance_currency = ""
    } = balance && Object.keys(balance).length ? balance : {}
    const { userDetails } = useSelector((state: RootState) => state.auth);
    const { fetchData, isError, isLoading } = useFetch();
    // console.log(transactions, 'isLoading------')
    if (isLoading) {
        return (
            <CommonLoadingScreen />
        );
    }
    const navigateTotransactions = async () => {
        const transactionpayload = {
            "gettransactionhistoryrequest": {
                "fri": accountId,
                "paginginfo": {
                    "maximumnumberofitems": 3,
                    "indexoffset": 0
                },
                "transactionstatus": "SUCCESSFUL",
                "transactiontypes": "",
                "datefrom": getNoOfDate(6),
                "dateto": getIsoFormat(new Date())
            }
        }
        const transactionResponse = await fetchData('dashboard/gettransactionhistory', 'POST', transactionpayload, true);
        let transactionhistoryentry = transactionResponse?.result || []
        transactionhistoryentry = getTransactionList(transactionhistoryentry, userDetails.mobileNumber);
        dispatch(setTransactions(transactionhistoryentry.length > 0 ? transactionhistoryentry : transactions))
        dispatch(setAccounts({ accountType, accountId }))
        navigation.navigate("Transactions", { accountType, accountId })
    }
    return (
        <TouchableNativeFeedback onPress={navigateTotransactions} style={{ flex: 1 }}>
            <Card style={{ borderRadius: gpsh('20'), marginBottom: gpsh('12') }} variant={'shadow'}>
                <Box>
                    <Box style={{ flexDirection: 'row', marginTop: 12 }}>
                        <Box>
                            <Box style={{ backgroundColor: '#E8E8E8', borderTopRightRadius: 14, borderBottomRightRadius: 14, padding: 8, width: 200, borderTopLeftRadius: gpsh('90'), paddingLeft: 20 }}><Text color={'momoBlue'} variant={'medium12'} numberOfLines={1} >{accountType}</Text></Box>
                            <Box style={{ flexDirection: 'row', paddingLeft: 20, width: 200 }}>
                                <Text color={'momoBlue'} fontSize={14} fontFamily={'MTNBrighterSans-Bold'} lineHeight={14.2} style={{ marginTop: 10 }}>{balance_currency} </Text>
                                <Text color={'momoBlue'} fontFamily={'MTNBrighterSans-Bold'} lineHeight={31.2} style={{ fontSize: 24 }}> {parseInt(balance_amount).toFixed(2)}</Text>
                            </Box>
                        </Box>
                        <Box style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                            <Icon name="CircleRightIcon" size={24} style={{ marginRight: 24 }} />
                        </Box>
                    </Box>
                    <Box style={{ padding: 20, paddingTop: 5 }}>
                        <HorizontalCardSeparator w={1} />
                        {transactions?.length > 0 ? transactions?.slice(0, index === 0 ? 2 : 1).map((transactionItem, i) => {
                            return (
                                <Box key={i} style={{ flexDirection: 'row', marginTop: 10 }}>
                                    <Box style={{ justifyContent: 'center' }}>{transactionItem.IsmoneyReceive ? <MoneyInIcon width={14} height={14} /> : <MoneyOutIcon width={14} height={14} />}</Box>
                                    <Box style={{ justifyContent: 'center', flex: 1, marginLeft: 10 }}>
                                        <Text variant={'medium12'} color={'black'} fontFamily={'MTNBrighterSans-Medium'} style={{ letterSpacing: -0.5 }}>{transactionItem.fromUser}</Text>
                                        <Text style={{ color: '#A5A5A5' }} lineHeight={13} fontSize={12} fontFamily={'MTNBrighterSans-Regular'}>{formatTime(transactionItem.datetime)} {transactionItem.IsmoneyReceive ? '• Money In' : '• Money Out'}</Text>
                                    </Box>
                                    <Box style={{ justifyContent: 'center' }}>
                                        <Text lineHeight={28} color={transactionItem.IsmoneyReceive ? 'green80' : 'red80'} fontFamily={'MTNBrighterSans-Bold'} fontSize={12}>{transactionItem.IsmoneyReceive ? '+' : '-'}{transactionItem.IsmoneyReceive ? transactionItem?.fromamount?.currency : transactionItem?.toamount?.currency} {transactionItem.IsmoneyReceive ? parseInt(transactionItem?.toamount?.amount).toFixed(2) : parseInt(transactionItem?.fromamount?.amount).toFixed(2)}</Text>
                                    </Box>
                                </Box>
                            )
                        }) : (
                            <View style={{ flexDirection: 'row', marginTop: 5 }}>
                                <NoTransactionIcon fill={colors.grey} style={{ marginRight: 24 }} width={14} height={14} />
                                <View style={{ justifyContent: 'center' }}><Text variant={'medium12'} style={{ color: '#A5A5A5' }} fontSize={10} fontFamily={'MTNBrighterSans-Regular'}>No payments received yet</Text></View>
                            </View>
                        )}

                    </Box>
                </Box>
            </Card>
        </TouchableNativeFeedback>
    );
};