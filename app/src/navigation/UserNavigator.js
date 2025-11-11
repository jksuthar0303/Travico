import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppNavigator from './AppNavigator';
import Settings from '../screens/Settings';
import { Text, View } from 'react-native';
import History from '../screens/History';
import Contact from '../screens/Contact';
import Notifications from '../screens/Notifications';
import CreateTrip from '../screens/CreateTrip';
import TravelersScreen from '../screens/Travelers';
import OptionsScreen from '../screens/Options';
import SummaryScreen from '../screens/Summary';
import SubmitScreen from '../screens/SubmitScreen';
import LiveTripScreen from '../screens/LiveTripScreen';
import PlaceDetailsScreen from '../screens/PlaceDetailScreen';
import PlacesScreen from '../screens/PlacesScreen';
import PersonalInfo from '../screens/PersonalInfo';
import ChangePassword from '../screens/ChangePassword';
import PrivacyPolicy from '../screens/PrivacyPolicy';
import TermsOfService from '../screens/TermsOfService';
import HotelDetailScreen from '../screens/HotelDetail';
import GuideDetailScreen from '../screens/GuideDetail';
import VehicleDetailScreen from '../screens/VehicleDetail';
import CompletedTripDetail from '../screens/CompletedTrip';
import TripGallery from '../screens/TripGallery';
import Reviews from '../screens/Reviews';


const Stack = createNativeStackNavigator();

export default function UserNavigator() {
    return (
        <Stack.Navigator>
            {/* Bottom Tabs */}
            <Stack.Screen
                name="Tabs"
                component={AppNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                    headerTitle: () => (
                        <View>
                            <Text className="text-xl font-bold">
                                Settings
                            </Text>
                            <Text className="text-sm text-gray-400">
                                Manage your account
                            </Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Notifications"
                component={Notifications}
                options={{
                    headerTitle: "Notifications"
                }}
            />
            <Stack.Screen
                name="Create-Trip"
                component={CreateTrip}
                options={{
                    headerTitle: "Create New Trip"
                }}
            />

            <Stack.Screen name="Travelers" component={TravelersScreen} options={{ title: 'Traveler Details' }} />
            <Stack.Screen name="Options" component={OptionsScreen} options={{ title: 'Select Places' }} />
            <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: "Trip Summary" }} />
            <Stack.Screen name="Submit" component={SubmitScreen} options={{ title: 'Confirm & Send' }} />
            <Stack.Screen name="Places" component={PlacesScreen} options={{ title: 'Places' }} />
            <Stack.Screen name="OnGoingTrip" component={LiveTripScreen} options={{
                title: "OnGoing Trip",
                headerRight: () => (
                    <View className="bg-green-500 px-3 py-1 rounded-full">
                        <Text className="text-white text-sm font-medium">Live</Text>
                    </View>

                ),
            }} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetailsScreen} options={{ title: 'Place Detail' }} />
            <Stack.Screen name="Personal-Info" component={PersonalInfo} options={{ title: "Personal Information" }} />
            <Stack.Screen name="Change-Password" component={ChangePassword} options={{ title: "Change Password" }} />
            <Stack.Screen name="Privacy-Policy" component={PrivacyPolicy} options={{ title: "Privacy Policy" }} />
            <Stack.Screen name="Terms" component={TermsOfService} options={{ title: "Terms of Service" }} />
            <Stack.Screen name="Hotel-Detail" component={HotelDetailScreen} options={{ title: "Hotel Detail" }} />
            <Stack.Screen name="Guide-Detail" component={GuideDetailScreen} options={{ title: "Guide Detail" }} />
            <Stack.Screen name="Vehicle-Detail" component={VehicleDetailScreen} options={{ title: "Vehicle Detail" }} />
            <Stack.Screen name="CompletedTrip" component={CompletedTripDetail} options={{ title: "Trip Detail" }} />
            <Stack.Screen name="TripGallery" component={TripGallery} options={{ title: "Trip Gallery" }} />
            <Stack.Screen name="Reviews" component={Reviews} options={{ title: "Reviews" }} />


            <Stack.Screen
                name="History"
                component={History}
                options={{
                    headerTitle: () => (
                        <View>
                            <Text className="text-xl font-bold">
                                Travel History
                            </Text>
                            <Text className="text-sm text-gray-400">
                                Your journey through time
                            </Text>
                        </View>
                    ),
                }}
            />
            <Stack.Screen
                name="Contact"
                component={Contact}
                options={{
                    headerTitle: () => (
                        <View>
                            <Text className="text-xl font-bold">
                                Contact Us
                            </Text>
                            <Text className="text-sm text-gray-400">
                                We're here to help you travel better
                            </Text>
                        </View>
                    ),
                }}
            />

        </Stack.Navigator>
    );
}
