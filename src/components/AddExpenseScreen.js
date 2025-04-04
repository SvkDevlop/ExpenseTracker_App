import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useDispatch, useSelector} from 'react-redux';
import {load_ExpCatData,load_AddExpenseData} from '../redux/action';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
import axios from 'axios';
import { init_exp_cat } from './initData';


const baseUrl = 'https://backendtesting.saathiyaa.in/api/products/addexpense_data';
const AddExpenseScreen = ({navigation}) => {
  const [addExp, setAddExp] = useState(init_exp_cat);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  useEffect(() => {
    handleChange(selectedDate.toISOString().slice(0,10), 'expdate');
  }, [selectedDate]);
  const handleConfirm = date => {
    let expdatee = date.toISOString().slice(0,10);
    handleChange(expdatee, 'expdate');
    setSelectedDate(date);
    hideDatePicker();
  };
  const handleChange = (value, name) => {
    setAddExp({...addExp, [name]: value});
  };
  const dispatch = useDispatch();

  const {load_expcategory_Data} = useSelector(state => state.reducer1);

  

  useEffect(() => {
    dispatch(load_ExpCatData());
  }, []);

  const submit = e => {
    e.preventDefault();
    addExp.addexpenseid = shortid.generate();
    axios.post(baseUrl, addExp).then(res => {
      if (res.data) {
        dispatch(load_AddExpenseData());
        setAddExp(init_exp_cat);
        alert('Expense Added Successfully Done');
      
      
        navigation.goBack();
      } else {
        alert('Error');
      }
    });
  };

  const {title, amount, category, expdate, notes} = addExp;
  return (
    <View style={styles.container}>
      <View style={{marginTop: 60}}>
        <Image
          style={{
            width: 130,
            height: 130,
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 120,
          }}
          source={require('../images/logo.jpg')}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          alignSelf: 'center',
          color: '#008080',
          marginTop: 10,
          marginBottom: 20,
        }}>
        Add Expense
      </Text>

      <Text style={styles.label}>📄 Title:</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Title"
        placeholderTextColor={"#000"}
        value={title}
        onChangeText={text => handleChange(text, 'title')}
      />

      <Text style={styles.label}>💰 Amount:</Text>
      <TextInput
        style={styles.input}
        placeholder="₹ Enter Amount"
        placeholderTextColor={"#000"}
        value={amount}
        keyboardType="numeric"
        onChangeText={text => handleChange(text, 'amount')}
      />

      <Text style={styles.label}>📂 Category:</Text>
      <Picker
        selectedValue={category}
        style={styles.input}
        onValueChange={text => handleChange(text, 'category')}>
        <Picker.Item label="Select Category" sty value="Select Category" />

        {Object.keys(load_expcategory_Data).map((key, index) => (
          <Picker.Item
            label={load_expcategory_Data[key]?.categoryname}
            value={load_expcategory_Data[key]?.categoryname}
          />
        ))}
      </Picker>

      <Text style={styles.label}>📅 Date:</Text>

      <TouchableOpacity
        onPress={showDatePicker}
        style={{
          height: 40,
          marginVertical: 5,
          backgroundColor: '#fff',
          borderRadius: 8,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 17,color:"#000"}}>
          {selectedDate
            ? selectedDate.toISOString().slice(0,10)
            : 'No date selected'}
        </Text>

        <DateTimePickerModal
          // date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </TouchableOpacity>

      <Text style={styles.label}>📝 Notes (Optional):</Text>
      <TextInput
        style={styles.textArea}
        placeholder="A short note for reference"
        placeholderTextColor={"#000"}

        value={notes}
        onChangeText={text => handleChange(text, 'notes')}
        multiline={true}
      />

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>💾 Save</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>❌ Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    marginBottom:"auto"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#008080',
    marginTop: 8,
  },
  input: {
    height: 40,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    fontSize: 15,
    fontWeight: '600',
  },
  textArea: {
    height: 60,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    marginBottom: 15,
    marginTop: 15,
    textAlignVertical: 'top',
    fontSize: 15,
    fontWeight: '600',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    width: '40%',
    height: 40,
    backgroundColor: '#008080',
    borderRadius: 20,
    borderColor: '#00000',
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default AddExpenseScreen;
