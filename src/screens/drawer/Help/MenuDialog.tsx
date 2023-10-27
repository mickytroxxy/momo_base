import { HEIGHT } from '@/component/molecule/Dropdown/SearchModal';
import { globalMoMoBlue } from '@/style-dictionary-dist/momoStyle';
import { gpsh } from '@/utils/parseTokenStyle';
import { Text, TouchableOpacity } from '@atom';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View,  Button, Modal, StyleSheet } from 'react-native';

const MenuDialog = ({ MenuList, visible, handleToggle }: any) => {
  const {navigate} = useNavigation();
    
    return (
        <Modal transparent={true} visible={visible} onRequestClose={() => {
            handleToggle();
        }} >
            <TouchableOpacity 
            activeOpacity={1} 
            onPressOut={() => {handleToggle()}}
          >
            <View style={styles.dialogContainer}>
                <View style={styles.dialogBox}>
                    {MenuList.map(({ title, screenName,isDownloadScreen }: any, index: number) => {
                        return (
                            <TouchableOpacity key={index} style={{ paddingVertical: 5, paddingHorizontal: 16, width: '100%', }} onPress={() => {
                                navigate(screenName,{isDownloadScreen});
                                handleToggle();
                            }}>
                                <Text  fontFamily={'MTNBrighterSans-Regular'} lineHeight={31.2} style={{ fontSize: gpsh('16'),color:'#000' }}> {title} </Text>

                               
                            </TouchableOpacity>
                        )
                    })}
                    {/* <View style={styles.buttonContainer}>
            <Button title="Allow" onPress={onRequestAllow} />
            <Button title="Deny" onPress={onRequestDeny} />
          </View> */}
                </View>
            </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    dialogContainer: {
        // flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: HEIGHT * .075
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    dialogBox: {
        width: "90%",
        borderColor: globalMoMoBlue,
        borderWidth: 2,
        paddingVertical: 16,
        backgroundColor: 'white',
        borderRadius: 15,
        textAlign: 'left'
        // alignItems: 'center',
    },
    dialogText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
});

export default MenuDialog;
