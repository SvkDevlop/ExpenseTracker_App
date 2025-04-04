import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {load_AddExpenseData} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';
import {PieChart} from 'react-native-chart-kit'; // Import PieChart from react-native-chart-kit
import {Dimensions} from 'react-native';
import {Picker} from '@react-native-picker/picker';


// Get screen width
const screenWidth = Dimensions.get('window').width;

const ReportScreen = ({navigation}) => {
  const [totalExpense, setTotalExpense] = useState(0); // Total expenses for all time
  const [currentMonthExpense, setCurrentMonthExpense] = useState(0); // Total expense for current month
  const [selectedDateRange, setSelectedDateRange] = useState('thisMonth'); // Selected date range
  const [categoryData, setCategoryData] = useState([]); // Category data for the chart
  const {load_add_expense_Data} = useSelector(state => state.reducer1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(load_AddExpenseData());
  }, []);

  // Get current month (format: YYYY-MM)
  const currentMonth = new Date().toISOString().slice(0, 7); // "YYYY-MM"

  // Function to calculate total expenses and categorize data
  const calculateExpenses = dateRange => {
    let totalExpenseForAll = 0;
    let totalCurrentMonth = 0;
    const categoryWiseData = {};

    // Get the date range to filter data
    const startDate = getStartDateForRange(dateRange);

    Object.keys(load_add_expense_Data).forEach(key => {
      const expense = load_add_expense_Data[key];
      const expenseDate = new Date(expense.expdate);
      const expenseMonth = expenseDate.toISOString().slice(0, 7); // Get the month part (YYYY-MM)

      if (expenseDate >= startDate) {
        totalExpenseForAll += parseInt(expense.amount);

        // Calculate total for the current month
        if (expenseMonth === currentMonth) {
          totalCurrentMonth += parseInt(expense.amount);
        }

        // Categorize the expense data
        if (categoryWiseData[expense.category]) {
          categoryWiseData[expense.category] += parseInt(expense.amount);
        } else {
          categoryWiseData[expense.category] = parseInt(expense.amount);
        }
      }
    });

    // Prepare category data for pie chart or bar graph
    const chartData = Object.keys(categoryWiseData).map(category => ({
      name: category,
      population: categoryWiseData[category],
      color: getCategoryColor(category),
      legendFontColor: '#000',
      legendFontSize: 15,
     
    }));

    setCategoryData(chartData);
    setTotalExpense(totalExpenseForAll);
    setCurrentMonthExpense(totalCurrentMonth);
  };

  // Function to get start date for selected date range
  const getStartDateForRange = range => {
    const today = new Date();
    switch (range) {
      case 'last7Days':
        today.setDate(today.getDate() - 7);
        break;
      case 'thisMonth':
        today.setDate(1);
        break;
      case 'lastMonth':
        today.setMonth(today.getMonth() - 1);
        today.setDate(1);
        break;
      
        break;
    }
    return today;
  };

  // Function to assign a random color to each category (or can use fixed colors)
  const getCategoryColor = category => {
    const colors = {
      food: '#66CDAA',
      Travel: '#93FFE8',
      Shopping: '#008B8B',
      Bills: '#22CE83',
      Miscellaneous: '#728C00',
      other: '#808000',
    };
    return colors[category] || '#ff1493'; // Default color if category not found
  };

  // Handle date range change
  const handleDateRangeChange = value => {
    setSelectedDateRange(value);
    calculateExpenses(value);
  };

  useEffect(() => {
    calculateExpenses(selectedDateRange);
  }, [load_add_expense_Data, selectedDateRange]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Statistics & Report</Text>

      {/* Date Range Picker */}
      <Picker
        selectedValue={selectedDateRange}
        onValueChange={itemValue => handleDateRangeChange(itemValue)}
        style={styles.picker}>
        <Picker.Item label="This Month" value="thisMonth" />
        <Picker.Item label="Last 7 Days" value="last7Days" />
        <Picker.Item label="Last Month" value="lastMonth" />
      </Picker>

      {/* Total Expenses */}
      

      {/* Pie Chart for Category-Wise Spending */}
      <View style={styles.chartContainer}>
        <PieChart
          data={categoryData}
          width={screenWidth -80} // Adjust width to fit the screen
          height={230}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#008080',
            backgroundGradientTo: '#008080',
            decimalPlaces:2, // Optional
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {borderRadius: 16},
          }}
          accessor="population"
          backgroundColor="transparent"
        />
      </View>

      <View style={styles.expenseSummary}>
        <Text style={styles.totalExpense}>Total Expense: ₹{totalExpense}</Text>
        <Text style={styles.currentMonthExpense}>Current Month Expense: ₹{currentMonthExpense}</Text>
      </View>



      <Button
              style={{
                marginBottom: '8%',
                alignItems: 'center',
                justifyContent: 'center',
                width: '60%',
                height: 35,
                backgroundColor: '#008080',
                alignSelf: 'center',
                padding: 0,
                borderRadius: 20,
                marginTop:30
              }}
              onPress={() => navigation.goBack()}>
              <Text style={{color: '#ffffff', fontSize: 20, fontWeight: 'bold'}}>
                Back to Home
              </Text>
            </Button>
      {/* Recent Transactions */}
       

      {/* Action Buttons */}
       
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    marginTop: "15%",
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#008080',
  },
  picker: {
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
  expenseSummary: {
    alignItems:"center",
    marginTop:30

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
  chartContainer: {
    width:"95%",
    alignSelf:"center",
    alignItems: 'center',
    justifyContent:"center",
    marginTop:30
  },

});

export default ReportScreen;
