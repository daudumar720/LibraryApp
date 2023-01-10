import {ActivityIndicator} from 'react-native-paper';

import {Portal, Dialog} from 'react-native-paper';

export function LoadingDialog({text, visible}) {
  return (
    <Portal>
      <Dialog visible={visible} dismissable={false}>
        <Dialog.Title>{text}</Dialog.Title>
        <Dialog.Content>
          <ActivityIndicator size="large" />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
}
