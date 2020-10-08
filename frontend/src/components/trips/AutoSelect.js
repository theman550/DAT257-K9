import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, useField, FieldProps } from 'formik'
import { TextField, Select, MenuItem, FormControl } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { fieldToTextField } from 'formik-material-ui';
import { LogIn, Map, MapPin } from 'react-feather';
import { InputAdornment } from '@material-ui/core';
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

const bashar = useStyles();

  return (
    <Autocomplete
      {...props}
      {...field}
      onChange={ (_, value) => setFieldValue(name, value) }
      autoSelect={true}
      autoHighlight={true}
      autoComplete={true}
      classes={bashar}
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