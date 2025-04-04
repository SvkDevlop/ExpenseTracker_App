import {init_state} from './reducer_init';
//declare variable in reducer_init

export const reducer1 = (state = init_state, action) => {
  switch (action.type) {
    case 'categorydataaction':
      return {...state, load_expcategory_Data: action.payload};

    case 'addexpensedataaction':
      return {...state, load_add_expense_Data: action.payload};

    default:
      return state;
  }
};
