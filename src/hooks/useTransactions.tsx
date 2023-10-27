import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { TransactionFiltersType, setFilters } from '@/features/transactions/transactionSlice';
import { transactionType } from '@/typings/business';
import TabScene from '@/screens/Dashboard/Transactions/TabScene';
import useFetch from './useFetch';
import { getIsoFormat, getNoOfDate } from 'methods';
const itemList = [
    { maintitle: 'Last 7 Days', value: 7, id: 1, selected: true },
    { maintitle: 'Last 15 Days', value: 15, id: 2 },
    { maintitle: 'Last 30 Days', value: 30, id: 3 },
    { maintitle: 'Last 45 Days', value: 45, id: 4 },
    { maintitle: 'Last 60 Days', value: 60, id: 5 }
]
const useTransactions = () => {
    const dispatch = useDispatch();
    const { fetchData, isError, isLoading } = useFetch();

    const { transactions: transactionData, filters: filterData } = useSelector((state: RootState) => state.transactionReducer);
    const { currency }: { currency: string; } = useSelector((state: RootState) => state.transactionReducer);
    const filters: TransactionFiltersType[] = filterData;
    const [transactions, setTransactions] = useState<transactionType[]>([])
    const [selectedDuration, setSelectedDuration] = useState<number>(0);
    const datesData = filters?.find((item) => item.type === 'dates')?.value;
    const amountsData = filters?.find((item) => item.type === 'amounts')?.value;
    const transactionTypeData = filters?.find((item) => item.type === 'transactionType')?.value;

    console.log(filters, "transactions", transactions)

    const tabData = [
        {
            title: 'All',
            renderScene: () => <TabScene transactions={transactions} currency={currency} type='All' />,
        },
        {
            title: 'Money In',
            renderScene: () => <TabScene transactions={transactions} currency={currency} type='Money In' />,
        },
        {
            title: 'Money Out',
            renderScene: () => <TabScene transactions={transactions} currency={currency} type='Money Out' />,
        },
    ];

    const filterByDateRangeTransactions = (data: any, transactions: transactionType[]) => {
        const fromDateTimestamp = data.find((item: any) => item.btn === "From Date")?.timeStamp;
        const toDateTimestamp = data.find((item: any) => item.btn === "To Date")?.timeStamp;
        const fromDate = fromDateTimestamp ? new Date(fromDateTimestamp).getTime() : 0;
        const toDate = toDateTimestamp ? new Date(toDateTimestamp).getTime() : Date.now();
        const filteredTransactions = transactions?.filter((transaction) => {
            const transactionTime = new Date(transaction.startdate).getTime();
            return transactionTime >= fromDate && transactionTime <= toDate;
        });
        return filteredTransactions;
    };
    const filterByAmountTransactions = (data: any, transactions: transactionType[]) => {
        const fromAmount = data.find((item: any) => item.btn === "From")?.value;
        const toAmount = data.find((item: any) => item.btn === "To")?.value;
        const filteredTransactions = transactions?.filter((transaction) => {
            const transactionAmount = transaction.IsmoneyReceive ? transaction.toamount.amount : transaction.fromamount.amount;
            return transactionAmount >= fromAmount && transactionAmount <= toAmount;
        });
        return filteredTransactions;
    };

    const handleFilters = (transactions: transactionType[]) => {
        let transactionToFilter = transactions
        if (datesData) {
            transactionToFilter = filterByDateRangeTransactions(datesData, transactionToFilter);
        }
        if (amountsData) {
            transactionToFilter = filterByAmountTransactions(amountsData, transactionToFilter)
        }
        if (transactionTypeData) {
            let tempdata = transactionToFilter.find(item => item.type === transactionTypeData)
            transactionToFilter = tempdata != undefined ? transactionToFilter.filter(item => item.type === transactionTypeData) : transactionToFilter;
        }
        setTransactions(transactionToFilter)
    }
    const removeFilters = (filterType: 'dates' | 'transactionType' | 'amounts') => dispatch(setFilters(filters.map(item => item.type === filterType ? { ...item, value: false } : item)));
    useEffect(() => {
        if (selectedDuration !== 0) {
            handleFiltersData(selectedDuration);
        }
    }, [selectedDuration])

    const handleFiltersData = async (selectedDuration: any) => {
        const duration = selectedDuration * 86400000;
        const startTime = Date.now() - duration * 86400000;
        // console.log(startTime,duration,'duration-------')
        const transactionpayload = JSON.stringify({
            "gettransactionhistoryrequest": {
                "fri": "FRI:233596254713/MSISDN",
                "paginginfo": {
                    "maximumnumberofitems": 15,
                    "indexoffset": 0
                },
                "transactionstatus": "SUCCESSFUL",
                "transactiontypes": "",
                // "datefrom": "2023-05-10T00:00:00Z",
                // "dateto": "2023-08-30T23:00:00Z"
                "datefrom": getNoOfDate(selectedDuration),
                "dateto": getIsoFormat(new Date())
            }
        })
        const transactionResponse = await fetchData('dashboard/gettransactionhistory', 'POST', transactionpayload, true);
        const transactionhistoryentry = transactionResponse?.result.transactionhistoryentry || []
        // const filteredTransactions = transactions.filter((transaction) => transaction.startdate >= startTime);
        setTransactions(transactionhistoryentry);

    }

    useEffect(() => {
        if (filters.filter(item => item.value).length > 0) {
            handleFilters(transactionData);
        } else {
            setTransactions(transactionData);
        }
    }, [filters])
    return { selectedDuration, datesData, amountsData, transactionTypeData, filters, currency, tabData, removeFilters, setSelectedDuration, itemList, transactionData }
}

export default useTransactions