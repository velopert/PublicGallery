import React from 'react';
import {StyleSheet, Modal, View, Pressable, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ActionSheetModal({visible, onClose, actions}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}>
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          {actions.map(action => (
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                action.onPress();
                onClose();
              }}
              key={action.text}>
              <Icon
                name={action.icon}
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.actionText}>{action.text}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default ActionSheetModal;
