const DropdownButton = ReactBootstrap.DropdownButton;
const MenuItem = ReactBootstrap.MenuItem;
const FormControl = ReactBootstrap.FormControl;

const SERVER = "http://cjohnson.ignorelist.com/";

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      results: [],
      input: this.props.input,
      autocompletes: []
    };
  },
  componentDidMount: function () {
    fetch(SERVER + this.props.data + '.json')
      .then((resp) => { return resp.text() })
      .then((text) => { this.setState({ results: JSON.parse(text) }) });
  },
	updateValue: function () {
		this.props.setvalue(this.props.name, this.state.input);
	},
	checkEmpty: function (evt) {
		//	let prev = this.state.input.length || 0;
		let curr = evt.nativeEvent.target.value;

		let prevl = this.state.input ? this.state.input.length : 0;
		let currl = curr.length || 0;

    this.setState({ input: evt.nativeEvent.target.value });
		
		if (currl > prevl && evt.nativeEvent.target.value !== '') {
			this.handleChange(evt)
		} else {
			this.setState({ autocompletes: [] });
		}
	},
  handleChange: function (evt) {
    const formData = new FormData;
    //  server doesn't do anything about this search value yet; need to filter the db results with it
    //	formData.set('search', this.state.input);
    //	fetch(SERVER + this.props.data + '.json', { method: 'POST', body: formData })
    fetch(SERVER + this.props.data + '.json')
      .then((resp) => { return resp.text() })
      .then((respArray) => {
		    const autocompletes = JSON.parse(respArray).map((option, index) => {
		      return ( <li key={ index } onClick={ this.submit } >{ option }</li> )
		    });
        this.setState({ autocompletes: autocompletes });
      });
  },
  handle: function (evt) {
    if (evt.nativeEvent.keyCode == 13) this.submit(evt);
  },
  submit: function (evt) {
    evt.preventDefault();
    this.setState({ input: evt.nativeEvent.target.attributes.value.value, autocompletes: [] });
		this.updateValue();
  },
  render: function () {
    return (
      <div>
        <input type="text" placeholder={ this.props.name } onChange={ this.checkEmpty } onKeyPress={ this.handle } value={ this.state.input } />
        <ul style={{ listStyleType: "none" }} >
          { this.state.autocompletes }
        </ul>
      </div>
    );
  }
});

window.AutocompleteField = AutocompleteField;
