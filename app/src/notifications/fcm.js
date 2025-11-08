import messaging from '@react-native-firebase/messaging';
import notifee, { AndroidImportance } from '@notifee/react-native';
import { Platform, PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiRequest } from '../../utils/api';

export async function requestUserPermission() {
  try {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    console.log('🔐 Permission:', enabled ? 'Granted' : 'Denied', authStatus);

    if (Platform.OS === 'android' && Platform.Version >= 33) {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        {
          title: 'Travico Notifications',
          message: 'Travico needs permission to send you trip updates and alerts.',
          buttonPositive: 'Allow',
        }
      );
    }
  } catch (err) {
    console.log('❌ requestUserPermission error:', err);
  }
}

export async function createNotificationChannel() {
  if (Platform.OS === 'android') {
    await notifee.createChannel({
      id: 'travico_high',
      name: 'Travico Notifications',
      importance: AndroidImportance.HIGH,
      sound: 'default',
      vibration: true,
    });
    console.log('📡 Channel created.');
  }
}

export async function getFcmTokenAndSave() {
  try {
    const token = await messaging().getToken();
    console.log('🔥 FCM token:', token);

    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      await apiRequest('POST', '/users/fcm-token', {
        userId: parsed?._id,
        fcmToken: token,
      });
    }
    return token;
  } catch (err) {
    console.log('❌ getFcmTokenAndSave error:', err);
  }
}

// Auto-refresh
messaging().onTokenRefresh(async (token) => {
  console.log('🔄 Token refreshed:', token);
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsed = JSON.parse(user);
      await apiRequest('POST', '/users/fcm-token', {
        userId: parsed?._id,
        fcmToken: token,
      });
    }
  } catch (err) {
    console.log('❌ Token refresh error:', err);
  }
});
