import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

const App = () => {

  const [toggle, setToggle] = useState(false);

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  ///Função para ligar flash do celular
  useEffect(() => {
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * Quando o celular for chacoalhado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });

    // Essa função vai ser chamada quando o componente for ser desmontado
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container}>
      <TouchableOpacity onPress={handleChangeToggle}>
      <Image style={toggle? style.lightingOn : style.lightingOff} 
        source={toggle
        ? require('./assets/icons/light-on.png') 
        : require('./assets/icons/light-off.png')}/>
      <Image style={style.dioLogo} 
        source={toggle
        ? require('./assets/icons/logo-dio.png') 
        : require('./assets/icons/logo-dio-white.png')}/>
      </TouchableOpacity> 
    </View>
  );
};

export default App;

const style = StyleSheet.create({
  
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',

  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',

  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 300,
    height: 300,

  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 300,
    height: 300,

  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,

  },

});