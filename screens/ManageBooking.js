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
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import NoBookings from "../components/NoBookings";
import BookingsListItem from "../components/BookingsListItem";

function ManageBooking() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="Booking Requests" component={ManageBookingList} />
      <Stack.Screen name="Booking Details" component={ManageBookingDetails} />
    </Stack.Navigator>
  );
}
export default ManageBooking;

//Manage Booking List UI
const ManageBookingList = ({ navigation }) => {
  const [bookingArray, setBookingArray] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  //Get documents from Firebase
  const fetchDataFromDB = async () => {
    console.log(`Fetching...`);

    try {
      const bookingCollectionRef = collection(db, "bookings");

      // Fetch all documents from the collection
      const querySnapshot = await getDocs(bookingCollectionRef);
      const fetchedBookings = [];

      querySnapshot.forEach((doc) => {
        fetchedBookings.push({ id: doc.id, ...doc.data() });
      });

      // Update the state with the fetched bookings
      setBookingArray(fetchedBookings);
      setIsLoading(false);
      // console.log(`bookingArray: ${JSON.stringify(bookingArray)}`);
    } catch (err) {
      console.error(`Error fetching videos: ${err}`);
    }
  };

  //Navigate to Booking Details Handler
  const goToDetails = (
    id,
    vehicleMakeAndModel,
    bookingConfirmationCode,
    bookingStatus,
    bookingDate,
    renterPhoto,
    renterName,
    price,
    licensePlate,
    acceptBooking,
    declineBooking
  ) => {
    navigation.navigate("Booking Details", {
      id: id,
      vehicleMakeAndModel: vehicleMakeAndModel,
      bookingConfirmationCode: bookingConfirmationCode,
      bookingStatus: bookingStatus,
      bookingDate: bookingDate,
      renterPhoto: renterPhoto,
      renterName: renterName,
      price: price,
      licensePlate: licensePlate,
      acceptBooking: acceptBooking,
      declineBooking: declineBooking,
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
        collection(db, "bookings"), //Firebase Collection name
        id //Document ID
      );
      await updateDoc(documentRef, {
        bookingStatus: "Accepted",
        bookingConfirmationCode: `B${randomNum}`,
      });
      //setDoc(cityRef, { capital: true }, { merge: true });

      // Display success message
      console.log("Document written with ID: ", id);
      alert(`Booking Accepted`);
      fetchDataFromDB();
    } catch (err) {
      console.log(err);
    }
  };

  const declineBooking = async (id) => {
    // console.log(`Booking Declined ${JSON.stringify(id)}`);

    try {
      const documentRef = doc(
        collection(db, "bookings"), //Firebase Collection name
        id //Document ID
      );
      await updateDoc(documentRef, {
        bookingStatus: "Declined",
        bookingConfirmationCode: "",
      });

      // Display success message
      console.log("Document written with ID: ", id);
      alert(`Booking Declined`);
      fetchDataFromDB();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataFromDB();
  }, []);
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
                      item.vehicleMakeAndModel,
                      item.bookingConfirmationCode,
                      item.bookingStatus,
                      item.bookingDate,
                      item.renterPhoto,
                      item.renterName,
                      item.price,
                      item.licensePlate
                    );
                  }}
                  photo={item.renterPhoto}
                  price={item.price}
                  address={item.bookingStatus}
                  accept={() => acceptBooking(item.id)}
                  decline={() => declineBooking(item.id)}
                />
              );
            }}
          />
        )}
      </View>
      <TouchableOpacity
        style={{
          padding: 10,
          backgroundColor: "lightblue",
          borderRadius: 10,
          alignItems: "center",
          marginTop: 10,
        }}
        onPress={fetchDataFromDB}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold", }}>
          Refresh
        </Text>
      </TouchableOpacity>
    </View>
  );
};
