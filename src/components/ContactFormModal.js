import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import { editContact } from '../actions/contactActions';
//import { editContact } from '../actions/contactActions';

class ContactFormModal extends Component {
  state = {
    firstName: '',
    lastName: '',
    company: '',
    jobTitle: '',
    email: '',
    phoneNumber: '',
    notes: ''
  };

  /**
   * Set each state property to the ones passed in props (if available)
   */
  componentDidMount() {
    Object.keys(this.state).forEach(key => {
      this.setState({ [key]: this.props[key] });
    });
  }

  render() {
    return (
      <Dialog
        open={true}
        aria-labelledby="contact-form-title"
        className="contact_form_modal"
        onClose={this.props.handleClose}
      >

        <DialogTitle id="contact-form-title" className="contact_form_title">
          {this.props.new ? 'Create contact' : 'Edit contact'}
        </DialogTitle>

        <DialogContent className="contact_form_content">
          <form className="contact_form" noValidate autoComplete="off">
            <Grid container spacing={24}>

              <Grid item xs={2}>
                <Avatar
                  alt={`${this.props.firstName} ${this.props.lastName}`}
                  src="https://goo.gl/DYPhHo"
                  className="contact_form_avatar"
                />
              </Grid>

              <Grid item xs={5}>
                {this.contactFormTextField('First Name')}
              </Grid>

              <Grid item xs={5}>
                {this.contactFormTextField('Last Name')}
              </Grid>

              <Grid item xs={2}>
                <Icon className="contact_form_company_icon">
                  business
                </Icon>
              </Grid>

              <Grid item xs={5}>
                {this.contactFormTextField('Company')}
              </Grid>

              <Grid item xs={5}>
                {this.contactFormTextField('Job Title')}
              </Grid>

              <Grid item xs={2}>
                <Icon className="contact_form_email_icon">
                  email
                </Icon>
              </Grid>

              <Grid item xs={10}>
                {this.contactFormTextField('Email')}
              </Grid>

              <Grid item xs={2}>
                <Icon className="contact_form_phone_icon">
                  phone
                </Icon>
              </Grid>

              <Grid item xs={10}>
                {this.contactFormTextField('Phone Number')}
              </Grid>

              <Grid item xs={2}>
                <Icon className="contact_form_notes_icon">
                  speaker_notes
                </Icon>
              </Grid>

              <Grid item xs={10}>
                {this.contactFormTextField('Notes')}
              </Grid>

            </Grid>
          </form>
        </DialogContent>

        <DialogActions className="contact_form_actions">
          <Button
            onClick={this.props.handleClose}
            color="primary"
            className="contact_form_cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={this.handleContactSave}
            color="primary"
            className="contact_form_save_button"
          >
            Save
          </Button>
        </DialogActions>

      </Dialog >
    );
  }

  /**
   * Create a Material UI text field given just the label
   * Since most of the data is repetitive for all the fields
   * 
   * @param {String} label - The text field label
   */
  contactFormTextField = (label) => {
    const labelSnakeCase = label.toLowerCase().replace(/ /g, '_');
    const labelCamelCase = label.split(' ')
      .map((word, index) => {
        return (index > 0) ?
          `${word[0].toUpperCase()}${word.slice(1).toLowerCase()}` :
          word.toLowerCase();
      }).join('');

    return (
      <TextField
        fullWidth
        id={`contact_${labelSnakeCase}`}
        label={label}
        className={`contact_form_${labelSnakeCase}`}
        value={this.state[labelCamelCase]}
        onChange={this.handleTextFieldChange(labelCamelCase)}
        margin="dense"
      />
    );
  }

  /**
   * @param {String} name
   */
  handleTextFieldChange = (name) => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  /**
   * Update the contact or create a new one in the state
   */
  handleContactSave = () => {
    this.props.dispatch(editContact(this.props.id, this.state));
    this.props.handleClose();
  };
}

ContactFormModal.propTypes = {
  new: PropTypes.bool.isRequired,
  id: PropTypes.number,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string,
  company: PropTypes.string,
  jobTitle: PropTypes.string,
  notes: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ContactFormModal);