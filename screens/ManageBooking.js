import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ManageBookingDetails from "../components/ManageBookingDetails";
import { db } from "../firebaseConfig";
import {
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
  where,
  onSnapshot
} from "firebase/firestore";
import { useEffect, useState } from "react";
import NoBookings from "../components/NoBookings";
import BookingsListItem from "../components/BookingsListItem";

function ManageBooking(p) {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Booking Requests">
        {(props) => <ManageBookingList user={p.user} {...props} />}
      </Stack.Screen>
      <Stack.Screen name="Booking Details" component={ManageBookingDetails} />
    </Stack.Navigator>
  );
}
export default ManageBooking;

//Manage Booking List UI
const ManageBookingList = ({ navigation, user }) => {
  const [bookingArray, setBookingArray] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  //Navigate to Booking Details Handler
  const goToDetails = (
    id,
    vehicleMakeAndModel,
    vehiclePhoto,
    bookingConfirmationCode,
    bookingStatus,
    bookingDate,
    renterPhoto,
    renterName,
    price,
    licensePlate,
    pickupLat,
    pickupLng
  ) => {
    navigation.navigate("Booking Details", {
      id: id,
      vehicleMakeAndModel: vehicleMakeAndModel,
      vehiclePhoto: vehiclePhoto,
      bookingConfirmationCode: bookingConfirmationCode,
      bookingStatus: bookingStatus,
      bookingDate: bookingDate,
      renterPhoto: renterPhoto,
      renterName: renterName,
      price: price,
      licensePlate: licensePlate,
      pickupLat: pickupLat,
      pickupLng: pickupLng,
    });
  };

  const acceptBooking = async (id) => {
    // console.log(`Booking Accepted ${JSON.stringify(id)}`);

    //generate a random number
    const randomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const randomNum = randomNumber(1, 100000000000); // Generate a random number between 1 and 100

    try {
      const documentRef = doc(
        collection(db, "book"), //Firebase Collection name
        id //Document ID
      );
      await updateDoc(documentRef, {
        status: "Accepted",
        confirmationCode: `B${randomNum}`,
      });
      //setDoc(cityRef, { capital: true }, { merge: true });

      // Display success message
      console.log("Document written with ID: ", id);
      alert(`Booking Accepted`);
      // fetchDataFromDB();
    } catch (err) {
      console.log(err);
    }
  };

  const declineBooking = async (id) => {
    // console.log(`Booking Declined ${JSON.stringify(id)}`);

    try {
      const documentRef = doc(
        collection(db, "book"), //Firebase Collection name
        id //Document ID
      );
      await updateDoc(documentRef, {
        status: "Declined",
        confirmationCode: "",
      });

      // Display success message
      console.log("Document written with ID: ", id);
      alert(`Booking Declined`);
      // fetchDataFromDB();
    } catch (err) {
      console.log(err);
    }
  };



useEffect(() => {
  const q = query(collection(db, "book"), where("ownerEmail", "==", user));
  const unsubscribeBookings = onSnapshot(q, (snapshot) => {
    const updated = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBookingArray(updated);
    setIsLoading(false);
  });
}, []);
  


  

  // useEffect(() => {
  //   fetchDataFromDB();
  // }, []);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        {isLoading ? (
          <ActivityIndicator color="blue" size="large" animating={true} />
        ) : bookingArray.length === 0 ? (
          <NoBookings />
        ) : (
          <FlatList
            style={{ width: "100%", height: "100%", paddingHorizontal: 50 }}
            data={bookingArray}
            renderItem={({ item }) => {
              return (
                <BookingsListItem
                  goToDetails={() => {
                    goToDetails(
                      item.id,
                      item.vehicleDetails.name,
                      item.vehicleDetails.image,
                      item.confirmationCode,
                      item.status,
                      item.bookingDate,
                      item.renterPhoto, //renterPhoto
                      item.userEmail,
                      item.price,
                      item.licensePlate,
                      item.pickupLocation.latitude,
                      item.pickupLocation.longitude
                    );
                  }}
                  bookingCode = {item.confirmationCode}
                  photo={item.vehicleDetails.image}
                  price={item.price}
                  address={item.status}
                  accept={() => acceptBooking(item.id)}
                  decline={() => declineBooking(item.id)}
                />
              );
            }}
          />
        )}
      </View>
      {/* <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "lightblue",
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={fetchDataFromDB}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          Refresh
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};
