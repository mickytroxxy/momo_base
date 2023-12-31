import TouchableOpacity from '@/component/atom/TouchableOpacity';
import icon from '@/constants/icon';
//import Calendars from '@/screens/main/Transfer/Calendar';
import {
  getFontSizeByWindowHeight as gsh,
  getFontSizeByWindowWidth as gsw,
} from '@/style/theme';
import {Theme} from '@/typings/globalTheme';
import {Icon} from '@atom';
import {useTheme} from '@shopify/restyle';
import dayjs from 'dayjs';
import React, {
  ForwardedRef,
  Fragment,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Animated,
  Keyboard,
  Platform,
  StyleSheet,
  TextInput,
  Text as Txt,
} from 'react-native';
import {useClickOutside} from 'react-native-click-outside';
import {ScrollView} from 'react-native-gesture-handler';
import Box from '../../atom/Box';
import Text from '../../atom/Text';

interface DropdownItemType {
  label: string;
  value: string;
}

interface Props<T> {
  // type Props<T = string> = {
  placeHolder?: string;
  displayKey?: any;
  hasError?: any;
  data?: Array<DropdownItemType>;
  // onSelect?: (item: {label: string; value: string}) => void;
  onSelect?: (value: T) => void;
  renderItem?: any;
  INPUT_HEIGHT?: number;
  search?: boolean;
  loading?: boolean;
  testId?: string;
  value: T;
  location?: boolean;
  calendar?: boolean;
  required?: boolean;
  label?: string;
  clearError?: any;
}
export type selectRenderItemType = {
  item: any;
  onItemPress: (item: any) => void;
  selected: string;
};
export type DropdownRef = {
  close: () => void;
};
export default forwardRef(function <T extends string>(
  {
    placeHolder = 'Select your option *',
    displayKey = 'label',
    hasError,
    data = [],
    onSelect,
    renderItem,
    INPUT_HEIGHT = gsh(56),
    search,
    loading,
    testId,
    value,
    location,
    calendar,
    label,
    required,
    clearError,
  }: Props<T>,
  ref: ForwardedRef<DropdownRef>,
) {
  const [visible, setVisible] = useState(false);
  Platform.OS;
  const inputRef = useRef<TextInput>(null);
  const {colors} = useTheme<Theme>();
  const dropdownButton = useRef<any>(null);
  const [searchText, setSearchText] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filteredData, setfilteredData] = useState<any[]>(data);
  const [selected, setSelected] = useState<any>(value);
  // const refs = useClickOutside<Txt>(() => console.log('sjj'));
  const refs = useClickOutside<Txt>(() => setVisible(false));
  const {SearchIcon, DropIcon, LocationIcon, CalendarIcon} = icon;
  const [scrollViewWholeHeight, setScrollViewWholeHeight] = React.useState(1);
  const [scrollViewVisibleHeight, setScrollViewVisibleHeight] =
    React.useState(0);
  // console.log('selected', selected);

  const indicator = new Animated.Value(0);

  const handleSearchText = (searchTerm: any) => {
    // if(search)
    if (hasError) {
      clearError();
    }
    if (selected && selected.label !== searchText) {
      setSelected(null);
      //@ts-ignore
      onSelect && onSelect(null);
    }
    setSearchText(searchTerm);
    const filteredOptions = data.filter(option =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setfilteredData(filteredOptions);
  };

  const openDropdown = async (): Promise<void> => {
    setVisible(true);
  };

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown();
  };

  const onItemPress = (item: any): void => {
    console.log('item', item);

    if (search || location) {
      Keyboard.dismiss();
    }
    if (calendar) {
      setSelected(item);
      onSelect && onSelect(item);
      setVisible(false);
      return;
    }
    // This is for the managing the state in this component
    setSelected(item.value);
    // setSelected(item[displayKey]);
    setSearchText(`${item.label} ${location ? `, ${item?.value}` : ''}`);
    // This is for the managing the state in the custom or outside the Component
    onSelect && onSelect(item.value);
    setVisible(false);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const renderDropdown = () => {
    const indicatorSize =
      scrollViewWholeHeight > scrollViewVisibleHeight
        ? (scrollViewVisibleHeight * scrollViewVisibleHeight) /
          scrollViewWholeHeight
        : scrollViewVisibleHeight;

    const difference =
      scrollViewVisibleHeight > indicatorSize
        ? scrollViewVisibleHeight - indicatorSize
        : 1;
    return (
      <Box
        width="101.2%"
        style={[
          styles.dropdown,
          {top: gsw(27), right: -1, left: -2},
          calendar && {
            alignItems: 'center',
          },
        ]}>
        <Box
          bg={'red100'}
          width="100%"
          alignSelf="center"
          backgroundColor="white"
          borderTopLeftRadius={0}
          borderTopRightRadius={0}
          borderWidth={2}
          borderTopWidth={0}
          borderColor={hasError ? 'red100' : visible ? 'momoBlue' : 'black'}
          paddingBottom={'vs'}
          borderRadius={15}
          style={[!calendar && {maxHeight: gsw(200)}]}
          pt={'vl'}>
          {!loading ? (
            calendar ? (
              <Box px={'hsm'}>
                {/* <Calendars
                  ref={refs}
                  selected={selected}
                  onItemPress={onItemPress}
                /> */}
              </Box>
            ) : (
              <>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEventThrottle={16}
                  keyboardShouldPersistTaps="handled"
                  onContentSizeChange={(width, height) => {
                    setScrollViewWholeHeight(height);
                  }}
                  onLayout={({
                    nativeEvent: {
                      layout: {x, y, width, height},
                    },
                  }) => {
                    setScrollViewVisibleHeight(height);
                  }}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: indicator}}}],
                    {useNativeDriver: false},
                  )}>
                  {(search ? filteredData : data || []).map((item, index) => {
                    return (
                      <Fragment key={`${index}-key`}>
                        {renderItem({
                          item,
                          onItemPress,
                          // selected: selected?.[displayKey],
                          selected,
                        })}
                      </Fragment>
                    );
                  })}
                  {(search ? filteredData : data).length === 0 && (
                    <Box pl={'hs'}>
                      <Text color={'lightGrey'}>Nothing to show</Text>
                    </Box>
                  )}
                </ScrollView>
                {/* Custom Scrollbar */}
                {filteredData.length > 5 && (
                  <Box
                    style={{
                      width: 5,
                      height: '100%',
                      position: 'absolute',
                      top: '7%',
                      bottom: 0,
                      right: gsw(5),
                    }}>
                    <Animated.View
                      style={{
                        width: 5,
                        borderRadius: 5,
                        height: indicatorSize,
                        backgroundColor: colors.momoBlue,
                        transform: [
                          {
                            translateY: Animated.multiply(
                              indicator,
                              scrollViewVisibleHeight / scrollViewWholeHeight,
                            ).interpolate({
                              inputRange: [0, difference],
                              outputRange: [0, difference],
                              extrapolate: 'clamp',
                            }),
                          },
                        ],
                      }}
                    />
                  </Box>
                )}
              </>
            )
          ) : (
            <Box>
              <ActivityIndicator />
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  useImperativeHandle(
    ref,
    () => ({
      close: () => {
        setVisible(false);
      },
      focus: () => {
        inputRef.current?.focus();
      },
      blur: () => {
        inputRef.current?.blur();
      },
    }),
    [visible],
  );

  return (
    <>
      <Box
        flexDirection="row"
        backgroundColor="transparent"
        alignItems="center"
        borderWidth={1}
        borderColor={hasError ? 'red100' : visible ? 'momoBlue' : 'black'}
        borderRadius={15}
        // ref={refs}
        ref={calendar ? dropdownButton : refs}
        // ref={dropdownButton}
        collapsable={false}
        height={INPUT_HEIGHT}>
        <Box
          flexDirection={'row'}
          borderWidth={1}
          flex={1}
          // ref={refs}
          borderColor={
            !visible && !isFocused
              ? 'transparent'
              : hasError
              ? 'red100'
              : 'momoBlue'
          }
          borderRadius={14}
          borderBottomLeftRadius={searchText.length > 0 ? 0 : 14}
          borderBottomRightRadius={searchText.length > 0 ? 0 : 14}
          height={'100%'}>
          {!visible && (selected || (calendar && selected)) && (
            <Box
              style={{
                position: 'absolute',
                top: -13,
                left: 13,
                paddingVertical: 2,
                paddingHorizontal: 4,
                backgroundColor: 'white',
              }}>
              <Box bg={'mainBackground'} />
              <Text
                fontFamily="MTNBrighterSans-Regular"
                fontSize={gsw(12)}
                color={'black'}>
                {label} {required && ' *'}
              </Text>
            </Box>
          )}
          {/* {!search ? visible : visible && true ? renderDropdown() : null} */}
          {visible && !search && renderDropdown()}
          {search &&
            (visible || isFocused) &&
            searchText.length >= 0 &&
            renderDropdown()}
          {/* {data ? renderDropdown() : <Box />} */}
          <TouchableOpacity
            testID={testId}
            onPress={toggleDropdown}
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: gsw(15),
              borderRadius: 15,
              height: '100%',
            }}>
            {selected?.icon ? (
              <selected.icon />
            ) : search || location ? (
              <Box flexDirection={'row'} alignItems={'center'}>
                <TextInput
                  onChangeText={handleSearchText}
                  ref={inputRef}
                  // onBlur={() => setIsFocus(false)}
                  onBlur={() => {
                    setVisible(false);
                    handleBlur();
                    inputRef.current?.blur();
                  }}
                  placeholderTextColor={hasError ? colors.red100 : colors.black}
                  selectionColor={colors.momoBlue}
                  placeholder={label || 'Search Here'}
                  numberOfLines={1}
                  value={searchText || selected?.[displayKey]}
                  underlineColorAndroid="transparent"
                  autoCorrect={false}
                  onSubmitEditing={Keyboard.dismiss}
                  onFocus={() => {
                    handleFocus();
                    openDropdown();
                  }}
                  style={{
                    flex: 1,
                    height: '100%',
                    fontSize: gsw(16),
                    fontFamily: 'MTNBrighterSans-Regular',
                    color: hasError ? colors.red100 : colors.black,
                    borderWidth: 0,
                    width: '100%',
                  }}
                />
                {location ? (
                  <LocationIcon
                    width={gsw(24)}
                    height={gsw(24)}
                    onPress={() => inputRef?.current?.focus()}
                    color={hasError ? 'red' : visible ? '#004F71' : 'black'}
                  />
                ) : (
                  <SearchIcon
                    width={gsw(24)}
                    height={gsw(24)}
                    onPress={() => inputRef?.current?.focus()}
                    color={hasError ? 'red' : visible ? '#004F71' : 'black'}
                  />
                )}
              </Box>
            ) : calendar ? (
              <>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Text
                    fontFamily="MTNBrighterSans-Regular"
                    fontSize={gsw(16)}
                    color={hasError ? 'red100' : 'black'}>
                    {selected ? dayjs(selected).format(`YYYY/MM/DD`) : label}
                  </Text>
                </Box>
                <CalendarIcon
                  width={gsw(24)}
                  height={gsw(24)}
                  color={hasError ? 'red' : visible ? '#004F71' : 'black'}
                />
              </>
            ) : (
              <>
                <Box flexDirection={'row'} alignItems={'center'}>
                  <Text
                    fontSize={gsw(16)}
                    color={hasError ? 'red100' : 'black'}
                    fontFamily="MTNBrighterSans-Regular">
                    {selected || placeHolder}
                    {/* {selected?.[displayKey] || placeHolder} */}
                  </Text>
                </Box>
                <Icon
                  name="DropIcon"
                  size={24}
                  color={hasError ? 'red' : visible ? '#004F71' : 'black'}
                />
              </>
            )}
          </TouchableOpacity>
        </Box>
      </Box>
      {hasError && (
        <Text
          px={'hm'}
          // @ts-ignore
          zIndex={-2}
          color={'red100'}
          style={{
            alignSelf: 'flex-start',
            fontFamily: 'MTNBrighterSans-Regular',
            fontSize: gsw(12),
          }}
          textAlign={'left'}>
          Select an option from the list
        </Text>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    shadowColor: '#000000',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});

// export default Dropdown;
