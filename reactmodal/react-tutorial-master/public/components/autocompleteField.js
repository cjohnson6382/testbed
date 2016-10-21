const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

const SERVER = "http://cjohnson.ignorelist.com/";

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      input: '',
      autocompletes: []
    };
  },
  componentDidMount: function () {
		this.setState({ input: this.props.data.value });
  },
	componentWillReceiveProps: function (newProps) {
		this.setState({ input: newProps.data.value });
	},
	checkEmpty: function (evt) {
		//	this function needs to modify the displayed autocompletes by the user's input if the input does not require a server hit
		//		can check whether the new input contains the old input; if so, no server hit is required
		//		the new input is a subset of the old input and a filter can return just the stuff that matches the new input

		evt.preventDefault();
		let curr = evt.nativeEvent.target.value;

		let prevl = this.state.input ? this.state.input.length : 0;
		let currl = curr.length || 0;

		//	don't setState directly for the input value; should be going up to the ticketbox and then propagating back down
    //	this.setState({ input: evt.nativeEvent.target.value });



		//	this might not work*****************************************
		let name = evt.currentTarget.attributes.name.value;
		let value = evt.currentTarget.value
		this.submit({ name: name, value: value });

		if (currl > prevl && curr !== '') {
			this.handleChange(evt)
		} else {
			this.setState({ autocompletes: [] });
		}
	},
  handleChange: function (evt) {
    const formData = new FormData;
		//	console.log(this.props.data, evt.nativeEvent.target.value);
		//	this function only fires if there is a change that requires hitting the server
		//		the autocomplete results displayed should chnage when the user changes the input field, regardless of whether there is a server request
    fetch(SERVER + "data/" + this.props.data.name + "/" + evt.nativeEvent.target.value)
      .then((resp) => {
				return resp.text()
			})
      .then((respArray) => {
		    const autocompletes = JSON.parse(respArray).map((option, index) => {
		      return ( <li key={ index } name={ this.props.data.name } onClick={ this.selectAutocomplete } value={ option }>{ option }</li> )
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  handle: function (evt) {
		if (evt.nativeEvent.keyCode == 13) {
			this.setState({ input: evt.currentTarget.value});

			let name = evt.currentTarget.attributes.name.value;
			let value = evt.currentTarget.value
			this.submit({ name: name, value: value });
		}
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		let name = evt.currentTarget.attributes.name.value;
		let value = evt.currentTarget.innerText;

		this.submit({ name: name, value: value });
	},
  submit: function (newProp) {
    this.setState({ input: newProp.value, autocompletes: [] });
		this.props.data.onChange(newProp);
  },
  render: function () {
    return (
			<FormGroup controlId={ this.props.data.name + "Autocomplete" }>
				<Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.data.placeholder}:</Col>
	      <Col sm={ 8 }><div>
	        <input
						name={ this.props.data.name }
						type="text"
						placeholder={ this.props.data.placeholder }
						onKeyPress={ this.handle }
						onChange={ this.checkEmpty }
						value={ this.state.input }
					/>
	        <ul style={{ listStyleType: "none" }} >
	          { this.state.autocompletes }
	        </ul>
	      </div></Col>
			</FormGroup>
    );
  }
});

window.AutocompleteField = AutocompleteField;
