import React from 'react'
import TextField from '@material-ui/core/TextField'

const FormTextField = props => (
  <TextField
    required
    fullWidth
    onChange={props.handleChangeFunction}
    value={props.setValue}
    label={props.setLabel}
    name={props.setID}
    type={props.setID === 'passwordConfirmation' ||
      props.setID === 'newPassword' ||
      props.setID === 'oldPassword' ? 'password' : props.setID}
    id={props.setID}
    variant="outlined"
    margin="normal"
  />
)

export default FormTextField
