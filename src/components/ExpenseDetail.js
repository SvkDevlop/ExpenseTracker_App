import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const ExpenseDetail = ({route}) => {
  const navigation = useNavigation(item);
  const item = route.params;

  return (
    <SafeAreaView
      style={{justifyContent: 'center', width: '97%', alignSelf: 'center'}}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/logo.jpg')}
          style={{
            width: 160,
            height: 160,
            justifyContent: 'center',
            borderRadius: 700,
            resizeMode: 'contain',
            alignSelf: 'center',
            marginTop: '10%',
          }}
        />
      </View>
      <Text
        style={{
          color: '#008080',
          fontSize: 22,
          fontWeight: '600',
          textShadowColor: '#FFFFFF',
          textShadowOffset: {width: 0.5, height: 0.5},
          textShadowRadius: 1,
          alignSelf: 'center',
        }}>
        Expense Details
      </Text>
      <View style={styles.buttonView}>
        <View style={styles.elementunderline}>
          <Text style={styles.heading}> 📄 Expense Title</Text>
          <Text style={styles.headingtext}>{item.title}</Text>
        </View>

        <View style={styles.elementunderline}>
          <Text style={styles.heading}>💰 Amount</Text>
          <Text style={styles.headingtext}>₹ {item.amount}</Text>
        </View>

        <View style={styles.elementunderline}>
          <Text style={styles.heading}>📂 Category</Text>
          <Text style={styles.headingtext}>{item.category}</Text>
        </View>

        <View style={styles.elementunderline}>
          <Text style={styles.heading}>📅 Date</Text>
          <Text style={styles.headingtext}>{item.expdate}</Text>
        </View>

        <View style={styles.elementunderline}>
          <Text style={styles.heading}>📝 Notes</Text>
          <Text style={styles.headingtext}>{item.notes}</Text>
        </View>

        {/* --------------------------------------Button Container-------------------------------- */}

        <TouchableOpacity
          style={{
            width: '39%',
            height: 38,
            backgroundColor: '#008080',
            borderRadius: 20,
            borderColor: '#00000',
            borderWidth: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 20,
            alignSelf: 'center',
          }}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 15,
    color: '#008080',
    left: '5%',
    fontWeight: '600',
  },
  headingtext: {
    fontSize: 17,
    color: '#000',
    fontWeight: '600',
    left: '5%',
    marginTop: 6,
  },

  buttonView: {
    width: '96%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderRadius: 12,

    borderWidth: 0.9,
    borderColor: '#008080',
  },
  imageContainer: {
    justifyContent: 'center',
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  buttoncontainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 50,
    width: '90%',
    alignSelf: 'center',
    marginBottom: '4%',
    marginTop: '4%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
    textShadowColor: '#000000',
    textShadowOffset: {width: 0.5, height: 0.5},
    textShadowRadius: 1,
  },
  elementunderline: {
    marginTop: 15,
    borderBottomWidth: 0.3,
    borderBottomColor: '#008080',
    width: '94%',
    alignSelf: 'center',
  },
});

export default ExpenseDetail;
