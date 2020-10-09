/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import React from 'react';
import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { fieldToTextField } from 'formik-material-ui';
import { makeStyles } from '@material-ui/core/styles';
import { MapPin } from 'react-feather';

const useStyles = makeStyles({
  option: {
    border: 'none',
    outline: 'none',
    fontSize: 17,
    fontFamily: 'Kufam, sans-serif',
    backgroundColor: '#1a1a1a',
    color: '#8064f7',
    '& > span': {
      marginRight: 2,
      fontSize: 14,
    },
  },
});

const AutoSelect = ({ textFieldProps, ...props }) => {
  const { form: { setTouched, setFieldValue } } = props;
  const {
    placeholder, id, label, error, helperText, ...field
  } = fieldToTextField(props);
  const { name } = field;
  const classes = useStyles();

  return (
    <Autocomplete
      {...props}
      onChange={(_, value) => setFieldValue(name, value)}
      autoSelect
      autoHighlight={false}
      autoComplete
      classes={{
        option: classes.option,
      }}
      renderOption={(option) => (
        <>
          <span><MapPin size={12} color="#8064f7" /></span>
          {option}
        </>
      )}
      onBlur={() => setTouched({ [name]: true })}
      renderInput={(props) => (
        <TextField
          {...props}
          {...textFieldProps}
          variant="outlined"
          helperText={helperText}
          error={error}
          label={label}
          id={id}
          placeholder={placeholder}
          InputProps={{
            ...props.InputProps,
            style: {
              color: '#707386',
              height: '45px',
              border: '1px',
              borderStyle: 'solid',
              borderRadius: '5px',
              borderColor: '#707386',
              fontFamily: 'Kufam, sans-serif',
              '&::placeholder': {
                color: 'yallow',
              },

            },

          }}

        />
      )}
    />
  );
};
export default AutoSelect;
