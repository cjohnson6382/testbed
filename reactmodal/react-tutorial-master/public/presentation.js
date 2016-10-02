const Button = ReactBootstrap.Button;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const MenuItem = ReactBootstrap.MenuItem;

const AutocompleteField = window.AutocompleteField;
const DropdownField = window.DropdownField;
const InputField = window.InputField;

const Ticket = React.createClass({
	getInitialState: function () {
		return { data: {} };
	},
	componentDidLoad: function () {
		this.setState({ data: this.props.data });
	},
	submit: function () {
		this.props.submit(this.state.data);
	},
	childValue: function (name, value) {
		let data = this.state.data;
		data[name] = value;
		this.setState({ data: data });
	},
	render: function () {
		return (
			<form onSubmit={ this.props.submit } >
			 	<div name="rmaProperties">
					<h2>RMA Properties</h2>
			 	  <InputField name="id" type="text" value={ this.state.data["id"] } setvalue={ this.childValue } />
			 	  <InputField name="date" type="date" value={ this.state.data["date"] } setvalue={ this.childValue } />
			 	  <DropdownField name="type" value={ this.state.data["type"] } data={ [
			 	    "doa - cross ship",
			 	    "doa - repair & return",
			 	    "non-warranty - repair & return",
			 	    "other - see notes",
			 	    "return - credit",
			 	    "warranty - cross ship"
			 	  ] } setvalue={ this.childValue } />
			 	  <AutocompleteField name="customer" value={ this.state.data["customer"] } data="customerdb" setvalue={ this.childValue } />
			 	  <InputField type="checkbox" name="dropship" value={ this.state.data["dropship"] } setvalue={ this.childValue } />
			 	</div>
			 	<Tabs defaultActiveKey={ 1 } id="tabs" >
			 	  <Tab eventKey={ 1 } title="inventory">
			 	    <InputField name="itemnumber" type="text" value={ this.state.data["itenumber"] } setvalue={ this.childValue } />
			 	    <AutocompleteField name="vendor" value={ this.state.data["vendor"] } data="vendordb" setvalue={ this.childValue } />
			 	    <InputField name="serial" type="text" value={ this.state.data["serial"] } setvalue={ this.childValue } />
			 	    <InputField name="purchasedate" type="text" value={ this.state.data["purchasedata"] } setvalue={ this.childValue } />
			 	    <DropdownField name="type" value={ this.state.data["type"] } data={ [
			 	      "doa - cross ship",
			 	      "doa - repair & return",
			 	      "non-warranty - repair & return",
			 	      "other - see notes",
			 	      "return - credit",
			 	      "warranty - cross ship"
			 	    ] } setvalue={ this.childValue } />
			 	    <InputField name="invoice" type="text" value={ this.state.data["invoice"] } setvalue={ this.childValue } />
			 	    <InputField name="problem" type="text" value={ this.state.data["problem"] } setvalue={ this.childValue } />
			 	  </Tab>
			 	  <Tab eventKey={ 2 } title="customer">
			 	  </Tab>
			 	  <Tab eventKey={ 3 } title="status">
			 	    <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } setvalue={ this.childValue } />
			 	    <InputField name="received" type="checkbox" value={ this.state.data["received"] } setvalue={ this.childValue } />
			 	    <InputField name="tracking" type="text" value={ this.state.data["tracking"] } setvalue={ this.childValue } />
			 	    <InputField name="eval" type="checkbox" value={ this.state.data["eval"] } setvalue={ this.childValue } />
			 	    <InputField name="stock" type="checkbox" value={ this.state.data["stock"] } setvalue={ this.childValue } />
			 	    <InputField name="close" type="checkbox" value={ this.state.data["close"] } setvalue={ this.childValue } />
			 	  </Tab>
			 	  <Tab eventKey={ 4 } title="other">
			 	    <InputField name="startedby" type="text" value={ this.state.data["startedby"] } setvalue={ this.childValue } />
			 	    <InputField name="notes" type="text" value={ this.state.data["notes"] } setvalue={ this.childValue } />
			 	    <div name="holdstatus">
			 	      <h2>Hold Status</h2>
			 	      <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } setvalue={ this.childValue } />
			 	      <InputField name="repairhold" type="text" value={ this.state.data["repairhold"] } setvalue={ this.childValue } />
			 	      <InputField name="holddate" type="date" value={ this.state.data["holddate"] } setvalue={ this.childValue } />
			 	      <InputField name="vendorrma" type="text" value={ this.state.data["vendorrma"] } setvalue={ this.childValue } />
			 	    </div>
			 	  </Tab>
			 	</Tabs>
				<Button bsStyle="primary" click={ this.submit }>Done</Button>
			</form>
		);
	}
});

window.Ticket = Ticket;
