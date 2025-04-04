import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {load_AddExpenseData} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';

// Sample data for recent transactions
const HomeScreen = ({navigation}) => {
  const [totalExpense, setTotalExpense] = useState(0); // Total expenses for all time
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0); // Total expense for current month
  const {load_add_expense_Data} = useSelector(state => state.reducer1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_AddExpenseData());
  }, []);

  // Get current month (format: YYYY-MM)
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  // Calculate the total expenses for all time and for the current month
  useEffect(() => {
    let totalExpenseForAll = 0;
    let totalCurrentMonth = 0;

    // Iterate over each expense data to calculate total expenses
    Object.keys(load_add_expense_Data).forEach(key => {
      const expense = load_add_expense_Data[key];
      const expenseMonth = expense.expdate.slice(0, 7); // Get the month part (YYYY-MM)

      // Calculate total for all time
      totalExpenseForAll += parseInt(expense.amount);

      // Calculate total for current month
      if (expenseMonth === currentMonth) {
        totalCurrentMonth += parseInt(expense.amount);
      }
    });

    // Update states with totals
    setTotalExpense(totalExpenseForAll);
    setCurrentMonthExpense(totalCurrentMonth);
  }, [load_add_expense_Data]);

  // To display the last five transactions
  const numberOfItemsToShow = 5;
  const lastItems = Object.values(load_add_expense_Data).slice(
    -numberOfItemsToShow,
  );

  return (
    <View style={styles.container}>
      {/* Title */}

      <Text style={styles.header}>Expense Tracker</Text>

      {/* Total Expenses */}
      <View style={styles.expenseSummary}>
        <Text style={styles.totalExpense}>Total Expense: ₹{totalExpense}</Text>
        <Text style={styles.currentMonthExpense}>
          Current Month Expense: ₹{currentMonthExpense}
        </Text>
      </View>

      {/* Recent Transactions */}
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.recentTitle}>Recent Transactions:</Text>
      </View>

      <FlatList
        data={lastItems}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Card style={styles.transactionCard}>
              <View style={styles.transactionDetails}>
                <Text style={styles.transactionText}>{item.title}</Text>
                <Text style={styles.transactionAmount}>{item.category}</Text>
                <Text style={styles.transactionAmount}>₹{item.amount}</Text>
              </View>
              <Text style={styles.transactionDate}>{item.expdate}</Text>
            </Card>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        style={styles.transactionList}
      />

      <View>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('AddExpense')}
            style={styles.addButton}>
            Add Expense
          </Button>
          <Button
            mode="contained"
            onPress={() => navigation.navigate('ExpenseListScreen')}
            style={styles.viewAllButton}>
            View All Expenses
          </Button>
        </View>
        <Button
            mode="contained"
            onPress={() => navigation.navigate('ReportScreen')}
            style={styles.reportButton}>
            Statistics & Report
          </Button>
      </View>
      {/* Action Buttons */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: 30,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#008080',
  },
  outheader: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#008080',
  },
  expenseSummary: {
    marginBottom: 30,
    alignItems: 'center',
  },
  totalExpense: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ff0000',
  },
  currentMonthExpense: {
    fontSize: 18,
    fontWeight: '500',
    color: '#008080',
    marginTop: 10,
  },
  recentTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    color: '#008080',
  },
  transactionCard: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
  },
  transactionDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  transactionText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionDate: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  transactionList: {
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    bottom:40
    
  },
  addButton: {
    width: '45%',
    backgroundColor: '#008080',
  },
  viewAllButton: {
    width: '45%',
    backgroundColor: '#008080',
  },
  reportButton: {
    width: '100%',
    backgroundColor: '#008080',
    bottom:30
  },
});

export default HomeScreen;

// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
// import { Button, Card } from 'react-native-paper';
// import { load_AddExpenseData } from '../redux/action';
// import { useDispatch, useSelector } from 'react-redux';
// import { PieChart } from 'react-native-chart-kit'; // Import PieChart from react-native-chart-kit
// import { Dimensions } from 'react-native';
// import {Picker} from '@react-native-picker/picker';

// // Get screen width
// const screenWidth = Dimensions.get('window').width;

// const HomeScreen = ({ navigation }) => {
//   const [totalExpense, setTotalExpense] = useState(0); // Total expenses for all time
//   const [currentMonthExpense, setCurrentMonthExpense] = useState(0); // Total expense for current month
//   const [selectedDateRange, setSelectedDateRange] = useState('thisMonth'); // Selected date range
//   const [categoryData, setCategoryData] = useState([]); // Category data for the chart
//   const { load_add_expense_Data } = useSelector((state) => state.reducer1);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(load_AddExpenseData());
//   }, []);

//   // Get current month (format: YYYY-MM)
//   const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

//   // Function to calculate total expenses and categorize data
//   const calculateExpenses = (dateRange) => {
//     let totalExpenseForAll = 0;
//     let totalCurrentMonth = 0;
//     const categoryWiseData = {};

//     // Get the date range to filter data
//     const startDate = getStartDateForRange(dateRange);

//     Object.keys(load_add_expense_Data).forEach((key) => {
//       const expense = load_add_expense_Data[key];
//       const expenseDate = new Date(expense.expdate);
//       const expenseMonth = expenseDate.toISOString().slice(0, 7); // Get the month part (YYYY-MM)

//       if (expenseDate >= startDate) {
//         totalExpenseForAll += parseInt(expense.amount);

//         // Calculate total for the current month
//         if (expenseMonth === currentMonth) {
//           totalCurrentMonth += parseInt(expense.amount);
//         }

//         // Categorize the expense data
//         if (categoryWiseData[expense.category]) {
//           categoryWiseData[expense.category] += parseInt(expense.amount);
//         } else {
//           categoryWiseData[expense.category] = parseInt(expense.amount);
//         }
//       }
//     });

//     // Prepare category data for pie chart or bar graph
//     const chartData = Object.keys(categoryWiseData).map((category) => ({
//       name: category,
//       population: categoryWiseData[category],
//       color: getCategoryColor(category),
//       legendFontColor: '#7F7F7F',
//       legendFontSize: 15,
//     }));

//     setCategoryData(chartData);
//     setTotalExpense(totalExpenseForAll);
//     setCurrentMonthExpense(totalCurrentMonth);
//   };

//   // Function to get start date for selected date range
//   const getStartDateForRange = (range) => {
//     const today = new Date();
//     switch (range) {
//       case 'last7Days':
//         today.setDate(today.getDate() - 7);
//         break;
//       case 'thisMonth':
//         today.setDate(1);
//         break;
//       case 'lastMonth':
//         today.setMonth(today.getMonth() - 1);
//         today.setDate(1);
//         break;
//       case 'custom':
//         // Handle custom range if needed
//         break;
//       default:
//         break;
//     }
//     return today;
//   };

//   // Function to assign a random color to each category (or can use fixed colors)
//   const getCategoryColor = (category) => {
//     const colors = {
//       food: '#66CDAA',
//       Travel: '#93FFE8',
//       Shopping: '#008B8B',
//       Bills: '#22CE83',
//       Miscellaneous: '#728C00',
//       other:'#808000'
//     };
//     return colors[category] || '#ff1493'; // Default color if category not found
//   };

//   // Handle date range change
//   const handleDateRangeChange = (value) => {
//     setSelectedDateRange(value);
//     calculateExpenses(value);
//   };

//   useEffect(() => {
//     calculateExpenses(selectedDateRange);
//   }, [load_add_expense_Data, selectedDateRange]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Statistics & Report</Text>

//       {/* Date Range Picker */}
//       <Picker
//         selectedValue={selectedDateRange}
//         onValueChange={(itemValue) => handleDateRangeChange(itemValue)}
//         style={styles.picker}
//       >
//         <Picker.Item label="This Month" value="thisMonth" />
//         <Picker.Item label="Last 7 Days" value="last7Days" />
//         <Picker.Item label="Last Month" value="lastMonth" />
//         <Picker.Item label="Custom Range" value="custom" />
//       </Picker>

//       {/* Total Expenses */}
//       <View style={styles.expenseSummary}>
//         <Text style={styles.totalExpense}>Total Expense: ₹{totalExpense}</Text>
//         <Text style={styles.currentMonthExpense}>
//           Current Month Expense: ₹{currentMonthExpense}
//         </Text>
//       </View>

//       {/* Pie Chart for Category-Wise Spending */}
//       <View style={styles.chartContainer}>
//         <PieChart
//           data={categoryData}
//           width={screenWidth - 40} // Adjust width to fit the screen
//           height={220}
//           chartConfig={{
//             backgroundColor: '#1cc910',
//             backgroundGradientFrom: '#fff',
//             backgroundGradientTo: '#fff',
//             decimalPlaces: 2, // Optional
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//             style: { borderRadius: 16 },
//           }}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="15"
//         />
//       </View>

//       {/* Recent Transactions */}
//       <FlatList
//         data={Object.values(load_add_expense_Data).slice(-5)}
//         renderItem={({ item }) => (
//           <TouchableOpacity>
//             <Card style={styles.transactionCard}>
//               <View style={styles.transactionDetails}>
//                 <Text style={styles.transactionText}>{item.title}</Text>
//                 <Text style={styles.transactionAmount}>{item.category}</Text>
//                 <Text style={styles.transactionAmount}>₹{item.amount}</Text>
//               </View>
//               <Text style={styles.transactionDate}>{item.expdate}</Text>
//             </Card>
//           </TouchableOpacity>
//         )}
//         keyExtractor={(item) => item.id}
//         style={styles.transactionList}
//       />

//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         <Button mode="contained" onPress={() => navigation.navigate('AddExpense')} style={styles.addButton}>
//           Add Expense
//         </Button>
//         <Button mode="contained" onPress={() => navigation.navigate('ExpenseListScreen')} style={styles.viewAllButton}>
//           View All Expenses
//         </Button>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//     marginTop: 30,
//   },
//   header: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#008080',
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//     marginBottom: 20,
//   },
//   expenseSummary: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   totalExpense: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#ff0000',
//   },
//   currentMonthExpense: {
//     fontSize: 18,
//     fontWeight: '500',
//     color: '#008080',
//     marginTop: 10,
//   },
//   chartContainer: {
//     marginBottom: 30,
//     alignItems: 'center',
//   },
//   transactionCard: {
//     padding: 10,
//     marginVertical: 5,
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   transactionDetails: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   transactionText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#000',
//   },
//   transactionAmount: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   transactionDate: {
//     fontSize: 12,
//     color: '#888',
//     textAlign: 'right',
//   },
//   transactionList: {
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     bottom: 40,
//   },
//   addButton: {
//     width: '45%',
//     backgroundColor: '#008080',
//   },
//   viewAllButton: {
//     width: '45%',
//     backgroundColor: '#008080',
//   },
// });

// export default HomeScreen;
