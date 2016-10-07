const DropdownButton = ReactBootstrap.DropdownButton;
const Button = ReactBootstrap.Button;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const MenuItem = ReactBootstrap.MenuItem;
const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Form = ReactBootstrap.Form;
const Col = ReactBootstrap.Col

const SERVER = "http://cjohnson.ignorelist.com/";



const CheckboxField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value };
  },
  onChange: function (evt) {
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Checkbox" }>
        <Col smOffset={ 1 } >
          <Checkbox name={ this.props.data.name } value={ this.state.value } onChange={ this.props.data.onChange }>{ this.props.data.placeholder }</Checkbox>
        </Col>
      </FormGroup>
    );
  }
});

const SelectField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value }
  },
  onChange: function (evt) {
    //  console.log(evt.currentTarget, evt.nativeEvent);
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    let options = this.props.data.options.map((option, index) => {
      return ( <option key={ index } name={ this.props.data.name }>{ option }</option> )
    });

    return (
      <FormGroup controlId={ this.props.data.controlId }>
        <Col componentClass={ ControlLabel } sm={ 1 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl
            componentClass="select"
            placeholder={ this.props.data.placeholder}
            name={ this.props.data.name }
            onChange={ this.onChange }
            value={ this.state.value }
          > 
            { options }
          </FormControl>
        </Col>
      </FormGroup>
    );
  }
});

const StaticInputField = React.createClass({
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Static" } >
        <Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 }>
          <FormControl.Static type={ this.props.data.type } placeholder={ this.props.data.placeholder }>{ this.props.data.value }</FormControl.Static>
        </Col>
			</FormGroup>
    );
  }
});

const TextboxInputField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value }
  },
  onChange: function (evt) {
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.name + "Textbox" } >
        <Col componentClass="ControlLabel" sm={ 2 }>{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl name={ this.props.data.name } componentClass="textarea" placeholder={ this.props.data.placeholder } onChange={ this.onChange } value={ this.state.value } />
        </Col>
      </FormGroup>
    );
  }
});

const InputField = React.createClass({
  getInitialState: function () {
    return { value: this.props.data.value }
  },
  onChange: function (evt) {
    //  console.log(evt.currentTarget, evt.nativeEvent);
    let name = evt.currentTarget.attributes.name.value;
    let value = evt.currentTarget.value;

    this.props.data.onChange({ name: name, value: value});
  },
  render: function () {
    return (
      <FormGroup controlId={ this.props.data.controlId }>
        <Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder }:</Col>
        <Col sm={ 8 } >
          <FormControl
            type={ this.props.data.type }
            name={ this.props.data.name }
            placeholder={ this.props.data.placeholder }
            onChange={ this.onChange }
            value={ this.state.value }
          />
        </Col>
      </FormGroup>
    );
  }
});

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      input: '',
      autocompletes: []
    };
  },
  componentDidMount: function () {
    fetch(SERVER + this.props.data.name + 'db.json')
      .then((resp) => { return resp.text() })
      .then((text) => { this.setState({ input: this.props.data.value, results: JSON.parse(text) }) });
  },
	checkEmpty: function (evt) {
		evt.preventDefault();
		let curr = evt.nativeEvent.target.value;

		let prevl = this.state.input ? this.state.input.length : 0;
		let currl = curr.length || 0;

    this.setState({ input: evt.nativeEvent.target.value });

		if (currl > prevl && curr !== '') {
			this.handleChange(evt)
		} else {
			this.setState({ autocompletes: [] });
		}
	},
  handleChange: function (evt) {
    const formData = new FormData;
    //  server doesn't do anything about this search value yet; need to filter the db results with it
    //	formData.set('search', this.state.input);
    //	fetch(SERVER + this.props.data.db + '.json', { method: 'POST', body: formData })
    fetch(SERVER + this.props.data.name + 'db.json')
      .then((resp) => { return resp.text() })
      .then((respArray) => {
		    const autocompletes = JSON.parse(respArray).map((option, index) => {
		      return ( <li key={ index } name={ this.props.data.name } onClick={ this.selectAutocomplete } value={ option }>{ option }</li> )
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  handle: function (evt) {
		if (evt.nativeEvent.keyCode == 13) {
			let name = evt.currentTarget.attributes.name.value;
			let value = evt.currentTarget.value
			this.submit({ name: name, value: value });
		}
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		let name = evt.currentTarget.attributes.name.value;
		let value = evt.currentTarget.innerText;

		this.setState({ input: evt.currentTarget.innerText, autocompletes: [] });

		this.submit({ name: name, value: value });
	},
  submit: function (newProp) {
    this.setState({ input: newProp.value, autocompletes: [] });
		this.props.data.onChange(newProp);
  },
  render: function () {
    return (
			<FormGroup controlId={ this.props.data.name + "Autocomplete" }>
				<Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder}:</Col>	
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
window.InputField  = InputField;
window.StaticInputField = StaticInputField;
window.TextboxInputField = TextboxInputField;
window.SelectField = SelectField;
window.CheckboxField = CheckboxField;

