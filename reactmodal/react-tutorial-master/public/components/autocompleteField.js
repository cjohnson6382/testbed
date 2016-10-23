const Popover = ReactBootstrap.Popover;
const Overlay = ReactBootstrap.Overlay;
//	const OverlayTrigger = ReactBootstrap.OverlayTrigger;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Col = ReactBootstrap.Col;

const SERVER = "http://cjohnson.ignorelist.com/";


const CustomPopover = React.createClass({
	componentDidMount: function () {
		console.log(this.props);

		console.log(ReactDOM.findDOMNode(this.refs.autocomplete));
	},
	render: function () {
		let autocompletes = this.props.items.map((option, index) => {
  		return ( <div key={ index } name={ this.props.name } onClick={ this.props.selectAutocomplete } >{ option }</div> )
  	});

		return (
			<Popover 
				{ ...this.props }
				id="autocomplete-popover"
				style={{ position: 'relative', arrowOffsetTop: 0  }}
			>
				</br>
				{ autocompletes }
			</Popover>
		)
	}
});

const AutocompleteField = React.createClass({
  getInitialState: function () {
    return {
      input: '',
      autocompletes: [],
			popover: {},
			popoverVisible: "display: none"
    };
  },
  componentDidMount: function () {
		this.setState({ input: this.props.data.value });
  },
	componentWillReceiveProps: function (newProps) {
		this.setState({ input: newProps.data.value });
	},
	hover: function () {
		//	cancel the popover interval
		clearInterval(this.state.popover);
	},
	unhover: function () {
		//	start the popover interval
		let popover = setTimeout(() => { 
				this.show(false);
			}, 
			1500
		);
		this.setState({ popover: popover });
	},
	show: function (bool) {
		if (bool) { 
			this.setState({ show: true  });
		} else {
			this.setState({ show: false });	
		};
	},	
	update: function (evt) {
		evt.preventDefault();

		if (evt.target.value !== '') {
			this.show(true);
			clearInterval(this.state.popover);
			let popover = setTimeout(() => { 
					this.show(false);
				}, 
				15000
			);
			this.setState({ popover: popover });
		};

    //  update the autocompletes; possibly from the server
    if (evt.target.value === '') {
			this.setState({ autocompletes: [] });
		} else if (this.state.input !== '' && evt.target.value.includes(this.state.input)) {
      //  no actual update, just filter existing results
      let newAutocompletes = this.state.autocompletes.filter((item) => {
        return item.includes(evt.target.value);
      });
      
      //  filtering returned too few results, and there might be other results in the DB
      if (this.state.autocompletes.length > 14 && newAutocompletes.length < 5) {
        this.fetch(evt.target.value);
      } else {
        //  set the filtered results
        this.setState({ autocompletes: newAutocompletes });
      }
		} else if (this.state.input.includes(evt.target.value)) {
      //  new input is the same as previous, but shorter; no autocompletes at all
      this.setState({ autocompletes: [] });
    } else {
      //  input is neither a shorter version of previous, nor a longer version; just get new results
      this.fetch(evt.target.value);
    }

    //  set the input on the master ticket object, which propagates down
		this.submit({ name: evt.target.attributes.name.value, value: evt.target.value});
	},
  fetch: function (value) {
		console.log('fetching', value);
		console.log(SERVER + "data/" + this.props.data.name + "/" + value);

    fetch(SERVER + "data/" + this.props.data.name + "/" + value)
      .then((resp) => { return resp.text() })
      .then((respArray) => { 
				this.setState({ autocompletes: JSON.parse(respArray) }) 
				console.log(respArray);
			});

  },
  onKeyPress: function (evt) {
		if (evt.charCode == 13) {
			this.setState({ autocompletes: [] });
			this.show(false);
		}
  },
	selectAutocomplete: function (evt) {
		evt.preventDefault();
		this.show(false);
		this.setState({ autocompletes: [] });

		this.submit({ name: evt.target.attributes.name.value, value: evt.target.innerText });
	},
  submit: function (input) {
    //  input is { name: [name], value: [value] }
		this.props.data.onChange(input);
  },
  render: function () {
    return (
			<FormGroup controlId={ this.props.data.name + "Autocomplete" }>
				<Col componentClass={ ControlLabel } sm={ 2 } >{ this.props.data.placeholder}:</Col>
	      <Col sm={ 3 }>
	    	  <input
						ref="target"
						name={ this.props.data.name }
						type="text"
						placeholder={ this.props.data.placeholder }
						onKeyPress={ this.onKeyPress }
						onChange={ this.update }
						value={ this.state.input }
					/>
					<Overlay
						show={ this.state.show }
						onHide={ () => { this.show(false) }}
						container={ this }
						placement="right"
						target={ () => ReactDOM.findDOMNode(this.refs.target) }
					>
						<CustomPopover name={ this.props.data.name } items={ this.state.autocompletes } selectAutocomplete={ this.selectAutocomplete } hover={ this.hover } unhover={ this.unhover }/>
					</Overlay>
				</Col>
			</FormGroup>
    );
  }
});
//	<CustomPopover name={ this.props.data.name } items={ this.state.autocompletes } selectAutocomplete={ this.selectAutocomplete } hover={ this.hover } unhover={ this.unhover }/>

window.AutocompleteField = AutocompleteField;
