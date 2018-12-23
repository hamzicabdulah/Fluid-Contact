import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import ContactActionButtons from './ContactActionButtons';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

class ContactInfoModal extends Component {
  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="contact-info-title"
        className="contact_info_modal"
        onClose={this.props.handleClose}
        fullWidth={true}
      >

        <DialogTitle id="contact-info-title" className="contact_info_title">
          <Grid container spacing={24}>

            <Grid item xs={2}>
              <Avatar
                alt={this.props.firstName[0].toUpperCase()}
                src={this.getRandomAvatar()}
                className="contact_info_avatar"
              />
            </Grid>

            <Grid item xs={5}>
              {this.props.firstName} {this.props.lastName}
            </Grid>

            <Grid item xs={5}>
              <ContactActionButtons {...this.props} additionalButtons={[this.closeButton()]} />
            </Grid>

          </Grid>
        </DialogTitle>

        <DialogContent className="contact_info_content">
          <DialogContentText className="contact_info_details_title">
            Contact details
          </DialogContentText>

          <Grid container spacing={24}>
            {
              !!this.props.company &&
              <Grid item xs={2}>
                <DialogContentText className="contact_info_icon">
                  <Icon className="contact_info_company_icon">
                    business
                  </Icon>
                </DialogContentText>
              </Grid>
            }
            {
              !!this.props.company &&
              <Grid item xs={10}>
                <DialogContentText className="contact_info_company">
                  {this.props.jobTitle ? `${this.props.jobTitle}, ` : ''}
                  {this.props.company}
                </DialogContentText>
              </Grid>
            }

            {
              !!this.props.email &&
              <Grid item xs={2}>
                <DialogContentText className="contact_info_icon">
                  <Icon className="contact_info_email_icon">
                    email
                  </Icon>
                </DialogContentText>
              </Grid>
            }
            {
              !!this.props.email &&
              <Grid item xs={10}>
                <DialogContentText className="contact_info_email">
                  {this.props.email}
                </DialogContentText>
              </Grid>
            }

            <Grid item xs={2}>
              <DialogContentText className="contact_info_icon">
                <Icon className="contact_info_phone_icon">
                  phone
                </Icon>
              </DialogContentText>
            </Grid>

            <Grid item xs={10}>
              <DialogContentText className="contact_info_phone">
                {this.props.phoneNumber}
              </DialogContentText>
            </Grid>
          </Grid>
        </DialogContent>

      </Dialog >
    );
  }

  /**
* @returns {String} - Avatar image URL
            */
  getRandomAvatar = () => {
    return `https://robohash.org/${this.props.id}.png`;
  }

  closeButton = () => {
    return (
      <IconButton
        aria-label="Close"
        className="contact_info_close_button"
        onClick={this.props.handleClose}
        key={1}
      >
        <Icon>close</Icon>
      </IconButton>
    );
  }
}

ContactInfoModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string,
  email: PropTypes.string,
  phoneNumber: PropTypes.string.isRequired,
  company: PropTypes.string,
  jobTitle: PropTypes.string,
  notes: PropTypes.string,
  starred: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

export default connect()(ContactInfoModal);