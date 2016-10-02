const DropdownButton = ReactBootstrap.DropdownButton;
const MenuItem = ReactBootstrap.MenuItem;

const SERVER = "http://cjohnson.ignorelist.com/";

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      value: this.props.value,
      autocompletes: []
    };
  },
  componentDidMount: function () {
    fetch(SERVER + this.props.data + '.json')
      .then((resp) => { return resp.text() })
      .then((text) => {
        this.setState({
          results: JSON.parse(text),
          value: this.props.value
        });
      });
  },
	updateValue: function () {
		this.props.setvalue(this.props.name, this.state.value);
	},
  handleChange: function (evt) {
    this.setState({
      value: evt.target.value
    });
    
    const formData = new FormData;
    //  server doesn't do anything about this search value yet; need to filter the db results with it
    formData.set('search', this.state.value);
    
    fetch(SERVER + this.props.field.options.rules.data + '.json', { method: 'POST', body: formData })
      .then(resp.text())
      .then((respArray) => {
		    const autocompletes = respArray.map((option) => {
		      return ( <li onClick={ this.submit } value={ option } >{ option }</li> );
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  handle: function (evt) {
    if (evt.keyCode === 13) this.submit(evt)
  },
  submit: function (evt) {
    evt.preventDefault();
    this.setState({ value: evt.target.value, results: [] });
		this.updateValue();
  },
  render: function () {
    return (
      <div>
        <span>{ this.props.name }: </span>
        <input type="text" placeholder={ this.props.name } onChange={ this.handleChange } value={ this.state.value } onKeyPress={ this.handle } />
        <ul style={{ listStyleType: "none" }} >
          { this.state.autocompletes }
        </ul>
      </div>
    );
  }
});

const DropdownField = React.createClass({
  getInitialState: () => {
    return { value: '' }
  },
  componentDidLoad: function () {
    this.setState({ value: this.props.value });
  },
	updateValue: function () {
		this.props.setvalue(this.props.name, this.state.value);
	},
  select: function (evt) {
    this.setState({ value: evt.target.value });
		this.updateValue();
  },
  render: function () {
    const menuitems = this.props.data.map((item, index) => {
      return ( <MenuItem eventKey={ item } key={ index } id={ item } onSelect={ this.select } >{ item }</MenuItem> );
    });
  
    return (
      <div>
        <span>{ this.props.name }: </span>
        <span><DropdownButton title={ this.props.name } >{ menuitems }</DropdownButton></span>
        <span><input type={ this.props.type } placeholder={ this.props.name } value={ this.state.value } /></span>
      </div>
    );
  }
});

const InputField = React.createClass({
  getInitialState: () => {
    return { value: '' };
  },
  componentDidMount: function () {
    this.setState({ value: this.props.value });
  },
	updateValue: function () {
		this.props.setvalue(this.props.name, this.state.value);
	},
  render: function () {
    return (
      <div>
        <span>{ this.props.name }: </span>
        <input type={ this.props.type } value={ this.state.value } placeholder={ this.props.name } onChange={ this.updateValue } />
      </div>
    );
  }
});

window.AutocompleteField = AutocompleteField;
window.DropdownField = DropdownField;
window.InputField = InputField;
