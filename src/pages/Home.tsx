import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {driversApi} from '../store/api/getDriversApi';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'MyStack'>;

interface IAllDrivers {
  givenName: string;
  familyName: string;
  driverId: string;
}
interface IArrAllDrivers {
  item: IAllDrivers;
}

const Home = ({navigation}: Props) => {
  const [page, setPage] = useState<number>(1);
  const {
    data: drivers,
    isLoading,
    refetch,
  } = driversApi.useGetAllDriversQuery(page);

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const renderItem = ({item}: IArrAllDrivers) => (
    <Item
      givenName={item.givenName}
      familyName={item.familyName}
      driverId={item.driverId}
    />
  );

  const Item = ({givenName, familyName, driverId}: IAllDrivers) => (
    <TouchableOpacity
      style={[styles.item]}
      onPress={() => {
        navigation.navigate('Driver', {
          driverId,
          driverName: `${familyName} ${givenName}`,
        });
      }}>
      <Text style={[styles.title]}>
        {familyName} {givenName}
      </Text>
    </TouchableOpacity>
  );

  return isLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <TouchableOpacity disabled={page === 1} onPress={() => setPage(page - 1)}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <Text>{page}</Text>
      <TouchableOpacity
        disabled={page === Math.ceil(854 / 30)}
        onPress={() => setPage(page + 1)}>
        <Text>{'>'}</Text>
      </TouchableOpacity>
      <FlatList
        data={drivers?.MRData.DriverTable.Drivers}
        keyExtractor={item => item.driverId}
        renderItem={renderItem}
      />
    </View>
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
export default Home;
