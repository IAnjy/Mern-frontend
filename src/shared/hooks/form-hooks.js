import {useCallback, useReducer} from 'react';

const formReducer = (state, action) => {
  switch (action.type) {
      case 'INPUT_CHANGE':
        let fromIsValid = true;
        for(const inputId in state.inputs){
          if(!state.inputs[inputId]){
            continue;
          }
          if(inputId === action.inputId){
              fromIsValid = fromIsValid && action.isValid;
          }else {
              fromIsValid = fromIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
              ...state.inputs,
              [action.inputId] : {value: action.value, isValid:action.isValid}
          },
          isValid: fromIsValid
        };
      case 'SET_DATA':
        return {
          inputs: action.inputs,
          isValid: action.fromIsValid
        };
      default:
          return state;
  }
}; 

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs:initialInputs,
    isValid: initialFormValidity
});

  const InputHandler = useCallback((id, value, isValid) => {
    dispatch({
        type:'INPUT_CHANGE', 
        value: value, 
        isValid: isValid, 
        inputId: id })
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: 'SET_DATA',
      inputs : inputData,
      fromIsValid: formValidity
    });
  }, []); 

  return [formState, InputHandler, setFormData];
};