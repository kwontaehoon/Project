import React, {useState, useEffect, useContext} from 'react'
import { View, Text, Button, LogBox } from 'react-native'
import Main_Page from './main/Main_Page'
import * as SQLite from "expo-sqlite";
import * as FileSystem  from 'expo-file-system'
import { Asset } from 'expo-asset'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MyPage from './mypage/MyPage_Page'
import UserContext from './context'
import Like from './like/Like_Page'
import Location from './location/Location_Page'
import Weather from './weather/Weather_Page'
import Icon from 'react-native-vector-icons/FontAwesome'
import Login from './mypage/Login'
import SignUp from './mypage/SignUp'
import City_Search from './weather/City_Search'
import Post from './mypage/Post'
import axios from 'axios'
import openDatabase from './db'
import { DatabaseConnection } from './db2'

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();



const App = () => {

  const [info, setInfo] = useState([]);
  console.log('info: ', info);

  // const db = SQLite.openDatabase('test.db');
  const db2 = DatabaseConnection.getConnection();
  // database._db.close();
  

  // async function openDatabase(){
  //   if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
  //     await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  //   }
  //   await FileSystem.downloadAsync(
  //     Asset.fromModule(require('./assets/test.db')).uri,
  //     FileSystem.documentDirectory + 'SQLite/test.db'
  //   );
  //   return SQLite.openDatabase('test.db');
  // }

  // const dt = new Date();
  // const CurrentTime = (dt.getHours())+":"+dt.getMinutes()+":"+dt.getSeconds()
  // const year = dt.getFullYear();
  // const month = ('0' + (dt.getMonth() + 1)).slice(-2);
  // const day = ('0' + dt.getDate()).slice(-2);
  // const dateString = year + month + day;
  // const serviceKey = 'Y4VLrNy6hcMz2TnhyK3%2BtCKiWrFOwWhhxg1R%2FgBtd9B1ty%2Fe%2FQz2z89s2e4IYd1p8hfkGw3lViB%2FGddDujE2vA%3D%3D'



  useEffect(() => {
     db2.transaction((tx) => {
       tx.executeSql("SELECT * FROM member", [], (tx, results)=>{
        setInfo(results.rows._array);
        console.log(results.rows._array);
         }, error => {console.log('error');});

        tx.executeSql("select * from tt", [], (tx, results)=>{
          console.log(results.rows._array);
        });
        })
     
   }, []);

  //  const HomeScreen = ({navigation}) => {
  //   return(
  //     <View>
  //       <Text>Home Screen</Text>
  //       <Button title='Detail 페이지로 이동' onPress={()=> navigation.push('Detail')}></Button>
  //     </View>
  //   )
  // }

  // const DetailScreen = ({navigation}) => {
  //   return(
  //     <View>
  //       <Text>Detail Screen</Text>
  //       <Button title='Detail 페이지로 다시 이동' onPress={()=> navigation.push('Details')}></Button>
  //       <Button title='Home 으로 이동' onPress={()=> navigation.push('Hone')}></Button>
  //       <Button title='Go Back' onPress={()=>navigation.goBack()}></Button>
  //       <Button title='Go First Screen' onPress={()=> navigation.popToTop()}></Button>
  //     </View>
  //   )
  // }


  return (
    <UserContext.Provider value={{name: 'taehoon'}}>
    <NavigationContainer>

      <Tab.Navigator screenOptions={{ headerShown: false,
        tabBarStyle:{ height: 60, position: 'absolute', paddingBottom: 7 },
        tabBarLabelStyle: { fontSize: 13 }}}>

        <Tab.Screen name="메인" component={Main_Page} 
        options={{tabBarIcon: () => (<Icon name='home' size={23} />)}} />
        
        
        <Tab.Screen name="위치" component={Location}
       options={{tabBarIcon: () => (<Icon name='location-arrow' size={23} />)}} />
    
    <Tab.Screen name="날씨" options={{tabBarIcon: () => (<Icon name='cloud' size={23} />)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="날씨"
                        component={Weather}/>
                    <Stack.Screen
                        name="도시검색"
                        component={City_Search} />
               </Stack.Navigator>   
              )}
        </Tab.Screen>

        <Tab.Screen name="찜" component={Like}
        options={{tabBarIcon: () => (<Icon name='thumbs-up' size={23} />)}} />
        
        <Tab.Screen name="마이페이지" options={{tabBarIcon: () => (<Icon name='user' size={23} />)}}>
        {()=>(
               <Stack.Navigator>
                    <Stack.Screen 
                        name="Login"
                        component={MyPage}/>
                    <Stack.Screen
                        name="마이페이지"
                        component={Login} />
                    <Stack.Screen
                        name="SignUp"
                        component={SignUp} />
                    <Stack.Screen
                        name="Post"
                        component={Post} />
               </Stack.Navigator>   
              )}
        </Tab.Screen>

      </Tab.Navigator>
    </NavigationContainer>
    </UserContext.Provider>
  )
}

export default App