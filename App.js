import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Alert,
  Button,
  Platform,
  View,
  Image,
} from 'react-native';

import IAP from 'react-native-iap';

const items = Platform.select({
  ios: [],
  android: ['rniapt_669_1m'],
});

export default function App() {
  const [purchased, setPurchased] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    IAP.initConnection()
      .catch(() => {
        console.log('error connecting to the server');
      })
      .then(() => {
        IAP.getSubscriptions(items)
          .catch(() => {
            console.log('error finding items');
          })
          .then(res => {
            setProducts(res);
          });
      });
  }, []);

  return (
    <View style={styles.container}>
      {products.map(p => (
        <Button
          key={p['productId']}
          title={p['title']}
          onPress={() => {
            IAP.requestSubscription(p['productId']);
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
