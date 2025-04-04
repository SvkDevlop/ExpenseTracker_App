import axios from 'axios';
import {Alert} from 'react-native';
import {AsyncStorage} from "react-native";
//load state data  load_coverpagedata
const baseUrl = 'https://backendtesting.saathiyaa.in/api/products/categorydataload/';
export const load_ExpCatData = () => {
  return async dispatch => {
  try{
    axios.post(baseUrl)
        .then(res => {
          if (res.data) {
            dispatch({
              type: 'categorydataaction',
              payload: res.data,
            });
          } else {
            console.log('categorydataaction data not received');
          }
        }); 
    } catch (error) {
      console.log('error in state data loading',error);
    }
  };
};


export const load_AddExpenseData = () => {
  return async dispatch => {
  try{
    axios.post("https://backendtesting.saathiyaa.in/api/products/addexpensedataload")
        .then(res => {
          if (res.data) {
            dispatch({
              type: 'addexpensedataaction',
              payload: res.data,
            });
          } else {
            console.log('addexpensedataaction data not received');
          }
        }); 
    } catch (error) {
      console.log('error in addexpensedataaction data loading',error);
    }
  };
};


