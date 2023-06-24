import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
//CLASS COMPONENT
class FormDialog extends Component {
    constructor(props) { 
        super(props);
        this.state = {
            movieData: this.props.initialFormState,
        };
    }
    
    componentWillReceiveProps(props) { //AFTER RECEIVING PROPS FROM THE PARENT COMPONENT (APP JS) SET THR INITAL STATE
      this.setState({ movieData: props.initialFormState });
  }

    inputChange = (event) => {
        const { name, value } = event.target;  //GETTING THE NAME(KEY) AND VALUE FOR THE FIELD THAT WAS EDITED
        this.setState({ movieData: { ...this.state.movieData, [name]: value } });
    };

    //FORM SUBMIT ON CLICK
    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.movieData.title || !this.state.movieData.year || !this.state.movieData.duration || !this.state.movieData.storyline) return;

        let self = this;
        this.setState({ ...this.state.movieData, title: [this.state.movieData.title] }, () => {
          if(this.state.movieData.id){ //IF CONDITION IS FOR UPDATE AND ELSE PART IS FOR ADD THE MOVIE TO SEND TO THE PARENT COMPONENT(APP JS)
            self.props.updateUser(self.state.movieData);
          }else{
            self.props.addMovie(self.state.movieData);
           }
            
        });
    };

    render() {
        return (
            <div>
                <Dialog open={this.props.openDailog} onClose={this.props.handleClose} aria-labelledby='form-dialog-title'>
                    <DialogTitle id='form-dialog-title'>New Movie</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField type='text' name='title' margin='dense' autoFocus value={this.state.movieData.title} label='Title' onChange={this.inputChange} fullWidth />

                            <TextField type='text' name='year' margin='dense' value={this.state.movieData.year} label='Year' onChange={this.inputChange} fullWidth />

                            <TextField type='text' name='duration' margin='dense' value={this.state.movieData.duration} label='Duration' onChange={this.inputChange} fullWidth />

                            <TextField type='text' name='storyline' margin='dense' value={this.state.movieData.storyline} label='Storyline' onChange={this.inputChange} fullWidth />

                            <center>
                                <Button type='submit' color='secondary'>
                                    Submit
                                </Button>

                                <Button onClick={this.props.handleClose} color='primary'>
                                    Cancel
                                </Button>
                            </center>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

export default FormDialog;