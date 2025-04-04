import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from 'react-native';
import {MouseButton} from 'react-native-gesture-handler';
import {Button, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {load_AddExpenseData,load_ExpCatData} from '../redux/action';
import {init_exp_cat} from './initData';
import Modal from 'react-native-modal';
import {Picker} from '@react-native-picker/picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import axios from 'axios';

let itemArray = [];

const ExpenseListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [loadEditData, setLoadEditData] = useState(init_exp_cat);
  const [search, setSearch] = useState('');
  const [expenses, setExpenses] = useState([]);
  const {load_add_expense_Data,load_expcategory_Data} = useSelector(state => state.reducer1);

  const [isModalVisible, setModalVisible] = useState(false);

   const [selectedDate, setSelectedDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    useEffect(() => {
      handleChange(selectedDate.toLocaleDateString(), 'expdate');
    }, [selectedDate]);
    const handleConfirm = date => {
      let expdatee = date.toLocaleDateString();
      handleChange(expdatee, 'expdate');
      setSelectedDate(date);
      hideDatePicker();
    };
    const handleChange = (value, name) => {
      setLoadEditData({...loadEditData, [name]: value});
    };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    dispatch(load_AddExpenseData());
    dispatch(load_ExpCatData());
  }, []);

  useEffect(() => {
    itemArray = [];
    Object.keys(load_add_expense_Data).map((key, index) =>
      itemArray.push({
        addexpenseid: load_add_expense_Data[key]?.addexpenseid,
        title: load_add_expense_Data[key]?.title,
        amount: load_add_expense_Data[key]?.amount,
        category: load_add_expense_Data[key]?.category,
        expdate: load_add_expense_Data[key]?.expdate,
        notes: load_add_expense_Data[key]?.notes,
      }),
    );
    setExpenses(itemArray);
  }, [load_add_expense_Data]);


  // const baseUrl = 'http://192.168.1.7:8036/api/products';
  // Handle expense deletion
  const handleDeleteExpense = expenseId => {
    // Show confirmation dialog
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this expense?",
      [
        {
          text: "Cancel", 
          onPress: () => console.log("Delete canceled"), 
          style: "cancel"
        },
        {
          text: "Yes", 
          onPress: () => {
            axios.delete(`https://backendtesting.saathiyaa.in/api/products/deleteaddexpenseData/${expenseId}`)
              .then((res) => {
                if (res.data) {
                  alert("Expense deleted successfully");
                  dispatch(load_AddExpenseData()); // Refresh data after deletion
                } else {
                  alert("Failed to delete the expense");
                }
              })
              .catch((error) => {
                console.error("Error deleting expense:", error);
                alert("There was an error while deleting the expense.");
              });
          }
        }
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    const result = itemArray.filter(item => {
      return (
        item.category.toLowerCase().match(search.toLocaleLowerCase()) ||
        item.expdate.toLowerCase().match(search.toLocaleLowerCase())
      );
    });
    setExpenses(result);
  }, [search]);

  // Filter expenses by search query, category, and date range

  const send = item => {
    navigation.navigate('ExpenseDetail', item);
  };

  const handleOpen = item => {
    (loadEditData.title = item[0]?.title),
      (loadEditData.amount = item[0]?.amount),
      (loadEditData.category = item[0]?.category),
      (loadEditData.expdate = item[0]?.expdate),
      (loadEditData.notes = item[0]?.notes),
      (loadEditData.addexpenseid = item[0]?.addexpenseid);
    setModalVisible(true);
  };
  // Render each expense item
  const renderExpenseItem = ({item}) => (
    <View>
      <TouchableOpacity
        onPress={() => send(item)}
        style={{
          width: '95%',
          height: 110,
          backgroundColor: '#fff',
          elevation: 7,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
          borderRadius: 6,
          margin: 10,
        }}>
        <View style={{flexDirection: 'row'}}>
          <Text style={{ width: '23%',textAlign: 'center',fontWeight:"bold",color:"#000",fontSize:15}}>
            {item.expdate}</Text>
          <Text style={{ width: '25%',textAlign:'center',color:"#000",fontSize:15}}>
          {item.category}</Text>
          <Text style={{ width: '32%',textAlign:'center',color:"#000",fontSize:15}}>
          {item.title}</Text>
          <Text style={{ width: '20%',textAlign:'center',color:"#000",fontSize:15}}>
          ₹{item.amount}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            width: '90%',
            marginTop:23,justifyContent:"flex-end",
            
          }}>
          <TouchableOpacity
            onPress={() => send(item)}
            style={styles.detailsButton}>
            <Text style={styles.detailsButtonText}>View</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.detailsButton}
            onPress={() => handleOpen([item])}>
            <Text style={styles.detailsButtonText}>Edit</Text>
          </TouchableOpacity>
          {/* Delete Button */}
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteExpense(item.addexpenseid)}>
            <Text style={styles.detailsButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );

  const handleUpdateData=(editData)=>{

    axios.patch("https://backendtesting.saathiyaa.in/api/products/editaddexpenseData/"+editData.addexpenseid,editData)
    .then((res)=>{
      
     if(res.data)
     {
         alert("Expense updated");
         dispatch(load_AddExpenseData());
        toggleModal();
     }
     else{
       alert("expense not updated");
     }
    })
}

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          alignSelf: 'center',
          color: '#008080',
          fontWeight: '700',
        }}>
        All Expense List
      </Text>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={search}
          onChangeText={text => {
            setSearch(text);
          }}
        />
        {/* <TouchableOpacity
          style={styles.filterButton}
          onPress={() => Alert.alert('Filter functionality coming soon')}>
          <Text style={styles.filterButtonText}>Filter</Text>
        </TouchableOpacity> */}
      </View>

      {/* Expense List */}
      <View style={styles.tableHeader}>
        <Text style={styles.tableHeaderText}>Date</Text>
        <Text style={styles.tableHeaderText}>Category</Text>
        <Text style={styles.tableHeaderText}>Title</Text>
        <Text style={styles.tableHeaderText}>Amount</Text>
      </View>

      <FlatList
        data={expenses}
        key={itemArray}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
      />

      <Button
        style={{
          marginBottom: '8%',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
          height: 40,
          backgroundColor: '#008080',
          alignSelf: 'center',
          padding: 0,
          borderRadius: 20,
        }}
        onPress={() => navigation.goBack()}>
        <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
          Back
        </Text>
      </Button>

      <Modal isVisible={isModalVisible }>
        <TouchableOpacity
          style={{ backgroundColor: '#fff',height:"auto",borderRadius:20,width:"100%"}}
          onPress={toggleModal}>
          <View style={styles.container1}>
            
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                alignSelf: 'center',
                color: '#008080',
                marginTop: 20,
                marginBottom: 20,
              }}>
              Edit Expense
            </Text>

            <Text style={styles.label}>📄 Title:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Title"
              value={loadEditData.title}
              onChangeText={text => handleChange(text, 'title')}
            />

            <Text style={styles.label}>💰 Amount:</Text>
            <TextInput
              style={styles.input}
              placeholder="₹ Enter Amount"
              value={loadEditData.amount}
              keyboardType="numeric"
              onChangeText={text => handleChange(text, 'amount')}
            />

            <Text style={styles.label}>📂 Category:</Text>
            <Picker
              selectedValue={loadEditData.category}
              style={styles.input}
              onValueChange={text => handleChange(text, 'category')}>
              <Picker.Item label="Select Category" value="Select Category" />

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
              <Text style={{fontSize: 14, fontWeight: 'bold', marginLeft: 17}}>
                {selectedDate
                  ? selectedDate.toLocaleDateString()
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
              value={loadEditData.notes}
              onChangeText={text => handleChange(text, 'notes')}
              multiline={true}
            />

            <View style={styles.buttons}>
              <TouchableOpacity style={styles.button}
               onPress={()=>handleUpdateData(loadEditData)}
               >
                <Text style={styles.buttonText}>💾 Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.goBack()}>
                <Text style={styles.buttonText}>❌ Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingTop: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#008080',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  filterButton: {
    backgroundColor: '#008080',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  filterButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  tableHeader: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#008080',
    padding: 7,
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    alignItems: 'center',
  },
  tableHeaderText: {
    fontWeight: 'bold',
    color: '#ffffff',
  },
  expenseRow: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 0.7,
    padding: 10,
    borderBottomColor: '#008080',
    alignItems: 'center',
    elevation: 1,
  },
  expenseCell: {
    width: '25%',
    textAlign: 'center',
  },
  detailsButton: {
    backgroundColor: '#008080',
    width: '13%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    marginLeft:3
  },
  detailsButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#ff0000',
    width: '13%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 20,
    marginLeft:3,
  },
  deleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  container1: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom:"auto"
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    color: '#008080',
    marginTop: 15,
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
    marginBottom:20
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


export default ExpenseListScreen;
