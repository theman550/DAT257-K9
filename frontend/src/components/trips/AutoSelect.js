import React from 'react';
import { TextField} from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { fieldToTextField } from 'formik-material-ui';
import { makeStyles } from "@material-ui/core/styles";

const AutoSelect = ({ textFieldProps, ...props }) => {
  const { form: { setTouched, setFieldValue } } = props;
  const { label,error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;
  

const useStyles = makeStyles(theme => ({
  inputRoot: {
    color: "purple",
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "green"
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "red"
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "purple"
    }
  }
}));

const classes = useStyles();

  return (
    <Autocomplete
      {...props}
      {...field}
      onChange={ (_, value) => setFieldValue(name, value) }
      autoSelect={true}
      autoHighlight={true}
      autoComplete={true}
      classes={classes}
      onBlur={ () => setTouched({ [name]: true }) }
      renderInput={ props => (
        <TextField {...props} {...textFieldProps} 
         helperText={helperText} error={error} 
        label={label}
        InputProps={{
            ...props.InputProps,
            style: {
                color: "#707386",
                height:"30px"
                
               
            },
           
          }}
        />
      )}
    />
  );
}

export default AutoSelect;