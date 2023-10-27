import {Images} from '@/constants/images';
import {
  cardsQrCodeBg,
  cardsQrCodeBorder,
  cardsQrCodeBorderRadius,
  cardsQrCodeDynamicHeight,
  cardsQrCodeFont1,
  cardsQrCodeFont2,
  cardsQrCodeFont3,
  cardsQrCodeDynamicWidth,
  cardsQrCodeTopMaring,
  cardsQrCodeFontSize1,
  cardsQrCodeFontSize2,
} from '@/style-dictionary-dist/momoStyle';
import {
  fontFamily,
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';
import {gpsh, gpsw} from '@/utils/parseTokenStyle';
import {Icon} from '@atom';
import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import ViewShot from "react-native-view-shot";
import RNFS from 'react-native-fs';
type QrCodeDynamicType = {
  ussd: string;
  merchantId: string;
  merchantName: string;
  value: string;
  amount?:string;
  reference?:string;
};

const QrCodeDynamic = ({ussd, merchantId, merchantName, value, amount, reference}: QrCodeDynamicType) => {
  const viewShot = useRef(null);

  async function callback(dataURL: string) {
    console.log(dataURL);
    await Share.open({url: dataURL});
  }

  const onSave = () => {
    //@ts-ignore
    viewShot?.current?.capture().then((uri:string) => {
     Share.open({
       title: "QR Code",
       message: "Share the qr code",
       url: uri,
       subject: "Code" 
     });
    });
   }
   const downloadFile = () => {
    const url = 'https://www.africau.edu/images/default/sample.pdf';
    //const filePath = RNFS.DocumentDirectoryPath + '/example.pdf';
    const filePath = RNFS.DownloadDirectoryPath + '/momopay.pdf';

    RNFS.downloadFile({
      fromUrl: url,
      toFile: filePath,
      background: true, // Enable downloading in the background (iOS only)
      discretionary: true, // Allow the OS to control the timing and speed (iOS only)
      progress: (res) => {
        // Handle download progress updates if needed
        const progress = (res.bytesWritten / res.contentLength) * 100;
        console.log(`Progress: ${progress.toFixed(2)}%`);
      },
    })
      .promise.then((response) => {
        console.log('File downloaded!', response);
      })
      .catch((err) => {
        console.log('Download error:', err);
      });
  };
  useEffect(() => {
    //getFolders()
  },[])
  useEffect(() => {
    // Optional: Delete the file if it exists before downloading
    const filePath = RNFS.DownloadDirectoryPath + '/example.pdf';
    console.log(filePath)
    RNFS.unlink(filePath)
      .then(() => {
        console.log('Previous file deleted');
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  return (
    <View style={styles.qrcodecontainer}>
      <Text style={styles.headerText}>Scan QR Code</Text>
      <View
        style={{
          height: gsw(200),
          width: gsw(180),
          alignSelf: 'center',
          justifyContent: 'center',
        }}>
        <ViewShot ref={viewShot} options={{ width: 100, height: 100, format: "jpg", quality: 1.0 }}>
          <QRCode value={value} size={gsw(180)} />
        </ViewShot>
      </View>

      <Text style={styles.dialText}>or dial {`${ussd}`}</Text>
      <View>
        <Text style={styles.merchatText}>Merchant ID:</Text>
        <Text style={styles.merchantValueText}>{merchantId}</Text>
      </View>
      <View>
        <Text style={styles.merchatText}>Merchant Name:</Text>
        <Text style={styles.merchantValueText}>{merchantName}</Text>
      </View>
      {(amount && reference) &&
        <View>
          <View>
            <Text style={styles.merchatText}>Amount:</Text>
            <Text style={styles.merchantValueText}>{amount}</Text>
          </View>
          <View>
            <Text style={styles.merchatText}>Merchant Reference:</Text>
            <Text style={styles.merchantValueText}>{reference}</Text>
          </View>
            </View>
          }

          <View style={styles.footer}>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {onSave()}}>
              <Icon name={'Share1Icon'} size={24} />
              <Text style={styles.buttonText}>Share</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => {downloadFile()}}>
              <Icon name={'DownloadIcon'} size={24} />
              <Text style={styles.buttonText}>Download</Text>
            </TouchableOpacity>
      </View>
    </View>
  );
};

export default QrCodeDynamic;

const styles = StyleSheet.create({
  qrcodecontainer: {
    maxHeight: gpsh(cardsQrCodeDynamicHeight),
    width: gpsw(cardsQrCodeDynamicWidth),
    backgroundColor: cardsQrCodeBg,
    borderRadius: gpsw(cardsQrCodeBorderRadius),
    paddingVertical: gpsh(cardsQrCodeTopMaring),
    gap: gsh(12),
    paddingHorizontal: gsw(31),
    borderColor: cardsQrCodeBorder.color,
    borderWidth: parseInt(cardsQrCodeBorder.width),
    elevation:10
  },
  headerText: {
    fontFamily: fontFamily('Bold'),
    fontSize: gpsw(cardsQrCodeFontSize1),
    lineHeight: gsh(31.2),
    textAlign: 'center',
    color: cardsQrCodeFont1,
  },
  dialText: {
    textAlign: 'center',
    fontFamily: fontFamily('Bold'),
    fontSize: gpsw(cardsQrCodeFontSize2),
    lineHeight: gsh(26),
    color: cardsQrCodeFont1,
  },
  merchatText: {
    textAlign: 'center',
    fontFamily: fontFamily('Regular'),
    fontSize: gsw(14),
    lineHeight: gsh(18.2),
    color: cardsQrCodeFont3,
  },
  merchantValueText: {
    textAlign: 'center',
    fontFamily: fontFamily('Bold'),
    fontSize: gsw(22),
    lineHeight: gsh(28.6),
    color: cardsQrCodeFont2,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: gsw(12),
    alignItems: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: gsw(14),
    lineHeight: gsh(18.2),
    color: cardsQrCodeFont1,
    fontFamily: fontFamily('Medium'),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
