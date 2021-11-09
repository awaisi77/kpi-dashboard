
export const showAlertWithTimeOut = (type,message) => {

    return (dispatch)=>{
        dispatch(showAlert(type,message));
        var timerOutVar;
        clearTimeout(timerOutVar)
        timerOutVar = setTimeout(()=>{

            dispatch(clearAlert());
        },3000);
    }
};

export const clearAlert = () => {
  
    return {
      type:"CLEAR_ALERT"
    }
  };

export const showAlert = (type,message) => {

    return {
        type:"SHOW_ALERT",
        alert:{type,message}
    }
};


