import BottomSheet from '@gorhom/bottom-sheet';
import React, {useCallback, useMemo, useRef} from 'react';
import {StyleSheet, Text, View, ViewStyle} from 'react-native';
import {BottomSheetModal, BottomSheetModalProvider} from '@gorhom/bottom-sheet';

type PullTrayModalType = {
  trayRef: any;
  children: any;
  handleSheetChanges: any;
  handlePresentPullTrayModal?: any;
  //   customStyle: ViewStyle;
  //   iconColor?: string;
  closeOnDragDown?: boolean;
  // otherProps
};
const PullTrayModal = ({
  trayRef,
  children,
  handleSheetChanges,
  handlePresentPullTrayModal,
}: PullTrayModalType) => {
//   const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['50%', '100%'], []);

  // callbacks
  //   const handleSheetChanges = useCallback((index: number) => {
  //     console.log('handleSheetChanges', index);
  //   }, []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheetModal
        ref={trayRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}>
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
        {children}
      </BottomSheetModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default PullTrayModal;
