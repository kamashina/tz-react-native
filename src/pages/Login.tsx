import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {authApi} from '../store/api/authApi';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Home', 'MyStack'>;

const Login = ({navigation}: Props) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [
    PostLoginUserMutation,
    {
      data: user,
      error: userError,
      isLoading: userLoading,
      isSuccess: userSuccess,
    },
  ] = authApi.usePostLoginUserMutation();

  const userAuth = async () => {
    PostLoginUserMutation({email, password});
    if (userSuccess) {
      await AsyncStorage.setItem('@token', user.token);
      navigation.navigate('Home');
    }
  };

  return userLoading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" />
    </View>
  ) : (
    <View>
      <TextInput value={email} placeholder="email" onChangeText={setEmail} />
      <TextInput
        value={password}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <TouchableOpacity onPress={userAuth}>
        <Text>Вход</Text>
      </TouchableOpacity>
      {userError ? <Text>Неверный логин или пароль</Text> : null}
    </View>
  );
};

export default Login;
