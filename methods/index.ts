export const formatTime = (timestamp: any) => {
    const date = new Date(timestamp);
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
export const formatDate = (timestamp: any) => {
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
};

export const getIsoFormat = (date: any) => {
    const DateVal = new Date(date);
    return DateVal.toISOString();
}

export const getNoOfDate = (num: any) => {
    let date = new Date();
    date.setDate(date.getDate() - num);
    formatDate(date)
    return getIsoFormat(date);

}

export const getTransactionList = (data: any, mobileNumber: any) => {
    data = handleSortData(data)
    data = data.map((item: any) => {
        let splitElement = item ? item.from?.split(':') : []
        console.log(splitElement,'splitElement--')
        splitElement = splitElement && splitElement.length > 0 ? splitElement[1].split('/') : [""];
        console.log(item.transactionstatus, splitElement[0])
        const IsmoneyReceive = splitElement[0] == mobileNumber && item.transactionstatus == "SUCCESS" && item.fromamount ? false : item.transactionstatus == "SUCCESS" && item.toamount ? true : ''
        const fromUser = "+" + splitElement[0] || ''
        return ({ ...item, IsmoneyReceive, fromUser })
    })
    return data;
}

export const handleSortData = (data: any) => {

    data.sort((a: any, b: any) => {
        return new Date(a.datetime).getTime() -
            new Date(b.datetime).getTime()
    }).reverse();
    return data
}
export const phoneNoValidation = (phone: string, countryCode: string): string | false => {
  // Remove spaces from the phone number
  let phoneNumber = phone.replace(/ /g, '');

  // Remove leading zeros from the phone number and country code
  phoneNumber = phoneNumber.replace(/^0+/, '');
  countryCode = countryCode.replace(/^0+/, '');

  // Check if the phone number and country code are valid
  if (phoneNumber.length >= 8 && phoneNumber.length <= 15 && countryCode.length >= 1) {
    return countryCode + phoneNumber;
  } else {
    return false;
  }
};