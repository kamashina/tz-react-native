/* eslint-disable react-native/no-inline-styles */
import {
  ActivityIndicator,
  FlatList,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {driversApi} from '../store/api/getDriversApi';
import {IArrDriverRaces, IDriverRaces} from '../types/DriverTypes';

type Props = NativeStackScreenProps<RootStackParamList, 'Driver', 'MyStack'>;

const Driver = ({route}: Props) => {
  const {driverId} = route.params;
  const {data: driverRaces, isLoading} =
    driversApi.useGetDriverRaceQuery(driverId);
  const {data: driverInfo} = driversApi.useGetOneDriverInfoQuery(driverId);

  const renderItem = ({item}: IArrDriverRaces) => (
    <Item season={item.season} date={item.date} raceName={item.raceName} />
  );

  const Item = ({season, date, raceName}: IDriverRaces) => (
    <View>
      <Text style={[styles.title]}>
        {season} {raceName} {date}
      </Text>
    </View>
  );

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <ScrollView>
      <View>
        <Text>Learn more</Text>
        <TouchableOpacity onPress={() => Linking.openURL(driverInfo!.url)}>
          <Text style={{color: 'blue'}}>'Click'</Text>
        </TouchableOpacity>
        <Text>Givenname: {driverInfo!.givenName}</Text>
        <Text>Familyname: {driverInfo!.familyName}</Text>
        <Text>Date of birth: {driverInfo!.dateOfBirth}</Text>
        <Text>Nationality: {driverInfo!.nationality}</Text>
      </View>
      <FlatList
        data={driverRaces?.MRData.RaceTable.Races}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 26,
  },
});
export default Driver;
