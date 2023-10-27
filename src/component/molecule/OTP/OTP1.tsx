import {
    otp4DigitHeight,
    otpActive,
    otpBorderRadius,
    otpDefault,
    otpError,
    otpTypeface,
  } from '@/style-dictionary-dist/momoStyle';
  import {fontFamily} from '@/style/theme';
  import {gpsh, gpsw} from '@/utils/parseTokenStyle';
  import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
  } from 'react';
  import {StyleSheet, Text} from 'react-native';
  import {
    CodeField,
    Cursor,
    useBlurOnFulfill,
    useClearByFocusCell,
  } from 'react-native-confirmation-code-field';
  
  const styles = StyleSheet.create({
    root: {flex: 1, padding: 20},
    //   codeFieldRoot: {marginTop: 20},
    cell: {
      width: gpsw(otp4DigitHeight),
      // width: gpsw(otp4DigitHeight),
      height: gpsw(otp4DigitHeight),
      // fontSize: gpsw(25),
      fontSize: gpsw(otpTypeface.fontSize),
      color: otpDefault.color,
      fontFamily: fontFamily('Medium'),
      // backgroundColor: 'red',
      lineHeight: gpsw(38),
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: gpsw(parseInt(otpBorderRadius)),
      borderWidth: parseInt(otpDefault.width),
      borderColor: otpDefault.color,
    },
    focusCell: {
      borderColor: otpActive.color,
      borderRadius: gpsw(parseInt(otpBorderRadius)),
      borderWidth: parseInt(otpActive.width),
    },
    error: {
      borderColor: otpError.color,
      borderWidth: parseInt(otpActive.width),
    },
  });
  
  // const CELL_COUNT = 4;
  function countToN(n: number) {
    let countedString = '';
    for (let i = 1; i <= n; i++) {
      countedString += i;
    }
    return countedString;
  }
  
  type OTPType = {
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
    CELL_COUNT?: number;
    validNumber?: string;
    onValid?: () => void;
  };
  export type OTPrefType = {
    setError: (errorMessage: string) => void;
  };
  
  const OTP = forwardRef<OTPrefType, OTPType>(
    (
      {value, setValue, CELL_COUNT = 4, validNumber = '1234', onValid},
      otpRef,
    ) => {
      const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
      // let countedString = '';
      // for (let i = 1; i <= CELL_COUNT; i++) countedString += i;
      const countedString = useMemo(() => countToN(CELL_COUNT), [CELL_COUNT]);
      const [error, setError] = useState('');
      const [props, getCellOnLayoutHandler] = useClearByFocusCell({
        value,
        setValue,
      });
  
      const resetOTP = () => {
        setValue('');
      };
      const onChange = async (value: string) => {
        console.log('value', value);
        if (value.length === 1) {
          setError('');
        }
        if (value.length === CELL_COUNT) {
          if (value !== validNumber) {
            // if (value !== '1234') {validNumber
            setTimeout(() => {
              setError('Incorrect OTP entered');
            }, 0);
            return;
          }
          setTimeout(() => {
            console.log('sjhsjhs');
  
            resetOTP();
            setError('');
            onValid && onValid();
          }, 0);
        }
      };
      useEffect(() => {
        onChange(value);
      }, [value]);
  
      useEffect(() => {
        error && resetOTP();
      }, [error]);
      useImperativeHandle(
        otpRef,
        () => ({
          setError: (e: string) => {
            setError(e);
          },
        }),
        [],
      );
  
      return (
        <>
          <CodeField
            ref={ref}
            {...props}
            // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't oTPear
            value={value}
            onChangeText={text => setValue(text)}
            cellCount={CELL_COUNT}
            //   rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            // @ts-ignore
            renderCell={({index, symbol, isFocused, focus}) => (
              <Text
                key={index}
                style={[
                  styles.cell,
                  focus && styles.focusCell,
                  error && styles.error,
                ]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol ||
                  (isFocused ? (
                    <Cursor
                      // @ts-ignore
                      cursorSymbol={
                        <Text
                          style={{
                            color: '#004F71',
                          }}>
                          |
                        </Text>
                      }
                    />
                  ) : null)}
              </Text>
            )}
          />
          {error && <Text style={{marginTop: 6, color: 'red'}}>{error}</Text>}
        </>
      );
    },
  );
  
  export default OTP;
  