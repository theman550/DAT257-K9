import React, { useState, useEffect } from 'react'
import { Formik, Field, Form, useField, FieldProps } from 'formik'
import { TextField, Select, MenuItem, FormControl } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab';
import { fieldToTextField } from 'formik-material-ui';
import { LogIn, Map, MapPin } from 'react-feather';
import { InputAdornment } from '@material-ui/core';
const AutoSelect = ({ textFieldProps, ...props }) => {
    const styles = theme => ({
        textField: {
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',            
            paddingBottom: 0,
            marginTop: 0,
            fontWeight: 500
        },
        input: {
            color: 'white'
        }
    });

  const { form: { setTouched, setFieldValue } } = props;
  const { label,error, helperText, ...field } = fieldToTextField(props);
  const { name } = field;

  return (
    <Autocomplete
      {...props}
      {...field}
      onChange={ (_, value) => setFieldValue(name, value) }
      autoSelect={true}
      autoHighlight={true}
      autoComplete={true}
      onBlur={ () => setTouched({ [name]: true }) }
      renderInput={ props => (
        <TextField {...props} {...textFieldProps} 
         helperText={helperText} error={error} 
        label={label}
        InputProps={{
            ...props.InputProps,
            style: {
                color: "#707386",
                '&:hover': {
                    borderColor: '#FFFFFF',
                    borderWidth: 2
                }
            

            },
           
          }}
        />
      )}
    />
  );
}

export default AutoSelect;