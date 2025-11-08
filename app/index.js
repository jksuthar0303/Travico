import { AppRegistry } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import App from './App';
import { name as appName } from './app.json';

let initialized = false;
if (!initialized) {
  initialized = true;
  console.log('🔥 FCM initialized globally');

  messaging().setBackgroundMessageHandler(async (remoteMessage) => {
    console.log('🌙 Background message:', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.data?.title,
      body: remoteMessage.data?.body,
      android: {
        channelId: 'travico_high',
        smallIcon: 'ic_launcher',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  });
  

  messaging().onMessage(async (remoteMessage) => {
    console.log('💬 Global foreground message:', remoteMessage);
    await notifee.displayNotification({
      title: remoteMessage.data?.title ?? 'Notification',
      body: remoteMessage.data?.body ?? '',
      android: {
        channelId: 'travico_high',
        smallIcon: 'ic_launcher',
        sound: 'default',
        importance: AndroidImportance.HIGH,
      },
    });
  });
}

AppRegistry.registerComponent(appName, () => App);
