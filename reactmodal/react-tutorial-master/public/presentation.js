const Button = ReactBootstrap.Button;
const Tabs = ReactBootstrap.Tabs;
const Tab = ReactBootstrap.Tab;
const MenuItem = ReactBootstrap.MenuItem;
const Checkbox = ReactBootstrap.Checkbox;
const FormGroup = ReactBootstrap.FormGroup;
const FormControl = ReactBootstrap.FormControl;
const ControlLabel = ReactBootstrap.ControlLabel;
const Form = ReactBootstrap.Form;
const Col = ReactBootstrap.Col;


const AutocompleteField = window.AutocompleteField;
const InputField = window.InputField;

const InputField = React.createClass({
	render: function () {
		<FormGroup controlId={ this.props.data.controlId }>
		  <Col componentClass="ControlLabel" sm={ 2 } >{ this.props.data.placeholder }:</Col>
		  <Col sm={ 8 } >
		    <FormControl
		      type={ this.props.data.type }
		      name={ this.props.data.name }
		      placeholder={ this.props.data.placeholder }
		      onChange={ this.props.data.onChnage }
		      value={ this.props.data.value }
		    />
		  </Col>
		</FormGroup>
	}
});

const Ticket = React.createClass({
	getInitialState: function () {
		return { data: {} };
	},
	componentDidMount: function () {
		this.setState({ data: this.props.data });
	},
	childValue: function (evt) {
		this.props.setProp(evt);
	},
	render: function () {
		return (
			<Form horizontal onSubmit={ this.submit } >
		 	  <FormGroup>
		 	    <Col componentClass={ ControlLabel } sm={ 1 } >Id:</Col>
		 	    <Col sm={ 8 } ><FormControl.Static type="text" placeholder="Id" name="id">{ this.state.data["id"] }</FormControl.Static></Col>
		 	  </FormGroup>
		 	  <FormGroup>
		 	    <Col componentClass="ControlLabel" sm={ 1 } >Date:</Col>
		 	    <Col sm={ 8 } ><FormControl.Static type="date" placeholder="Date" name="date">{ this.state.data["date"] }</FormControl.Static></Col>
		 	  </FormGroup>
	 	    <FormGroup controlId="typeSelect">
          <Col componentClass={ ControlLabel } sm={ 1 } >Type:</Col>
          <Col sm={ 8 } ><FormControl componentClass="select" placeholder="Type" name="type" onChange={ this.childValue } value={ this.state.data["type"] }>
            <option value="doacrossship">DOA - Cross Ship</option>
            <option value="doarepairreturn">DOA - Repair & Return</option>
            <option value="nonwarrantyrepairreturn">Non-Warranty - Repair & Return</option>
            <option value="otherseenotes">Other - See Notes</option>
            <option value="warrantycrossship">Warranty - Cross Ship</option>
          </FormControl></Col>
        </FormGroup>
       	<FormGroup>
		 	  	<Col componentClass="ControlLabel" sm={ 2 } >Customer:</Col>
		 	  	<Col sm={ 8 } ><AutocompleteField name="customer" input={ this.state.data["customer"] } data="customerdb" setvalue={ this.childValue } /></Col>	
				</FormGroup>
 		 	  <FormGroup>
		 	    <Col smOffset={ 1 } ><Checkbox name="dropship" value={ this.state.data["date"] } onChange={ this.childValue }>Drop Ship</Checkbox></Col>
		 	  </FormGroup>
			 	<Col sm={ 20 } ><Tabs defaultActiveKey={ 1 } id="tabs" >
			 	  <Tab eventKey={ 1 } title="Inventory">
						<br />
						<Col smOffset={ 1 } >
							<InputField data={ controlId: 'itemnumberText', type: 'text', name: 'itemnumber', placeholder: 'Item Number', onChange: this.childValue, value: this.state.data["itemnumber"]} />

   			 	  	<FormGroup controlId="itemnumberText">
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Item Number:</Col>
  			 	  	  <Col sm={ 8 } >
									<FormControl 
										type="text" 
										name="itemnumber" 
										placeholder="Item Number" 
										onChange={ this.childValue } 
										value={ this.state.data["itemnumber"] } 
									/>
								</Col>
  			 	  	</FormGroup>
							<FormGroup controlId="vendorAutocomplete">
							  <Col componentClass="ControlLabel" sm={ 2 } >Vendor:</Col>
			 	    		<Col sm={ 8 } >
									<AutocompleteField 
										name="Vendor" 
										input={ this.state.data["vendor"] } 
										data="vendordb" 
										setvalue={ this.childValue } 
									/>
								</Col>
  			 	  	</FormGroup>
   			 	  	<FormGroup controlId="serialnumberText">
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Serial Number:</Col>
  			 	  	  <Col sm={ 8 } >
									<FormControl 
										name="serial"
										type="text" 
										placeholder="Serial Number" 
										onChange={ this.childValue } 
										value={ this.state.data["serial"] } 
									/>
								</Col>
  			 	  	</FormGroup>
   			 	  	<FormGroup controlId="purchasedateDate">
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Purchase Date:</Col>
  			 	  	  <Col sm={ 8 } >
									<FormControl 
										type="date" 
										name="purchasedate"
										placeholder="Purchase Date" 
										onChange={ this.childValue } 
										value={ this.state.data["purchasedate"] } 
									/>
								</Col>
  			 	  	</FormGroup>
  	 	      	<FormGroup controlId="typeSelect">
            	  <Col componentClass="ControlLabel" sm={ 2 } >Type:</Col>
            	  <Col sm={ 8 } ><FormControl 
									componentClass="select" 
									placeholder="Type" 
									onChange={ this.childValue }
									value={ this.state.data["type"] }
								>
            	    <option value="doacrossship">DOA - Cross Ship</option>
            	    <option value="doarepairreturn">DOA - Repair & Return</option>
            	    <option value="nonwarrantyrepairreturn">Non-Warranty - Repair & Return</option>
            	    <option value="otherseenotes">Other - See Notes</option>
            	    <option value="warrantycrossship">Warranty - Cross Ship</option>
            	  </FormControl></Col>
            	</FormGroup>
   			 	  	<FormGroup controlId="invoiceText">
  			 	  	  <Col componentClass="ControlLabel" sm={ 2 } >Invoice:</Col>
  			 	  	  <Col sm={ 8 } >
									<FormControl 
										type="text" 
										name="invoice"
										placeholder="Invoice" 
										onChange={ this.childValue } 
										value={ this.state.data["invoice"] } 
									/>
								</Col>
  			 	  	</FormGroup>
		 	      	<FormGroup controlId="problemTextarea">
            	  <Col componentClass="ControlLabel" sm={ 2 } >Problem:</Col>
            	  <Col sm={ 8 } >
									<FormControl 
										name="problem"
										componentClass="textarea" 
										placeholder="Problem" 
										onChange={ this.childValue } 
										value={ this.state.data["problem"] } 
									/>
								</Col>
            	</FormGroup>
						</Col>
			 	  </Tab>
			 	  <Tab eventKey={ 2 } title="Customer">
			 	  </Tab>
			 	  <Tab eventKey={ 3 } title="Status">
						<br />
						<FormGroup controlId="itemnumberText">
							<Col componentClass="ControlLabel" sm={ 2 }>Item Number:</Col>
							<Col sm={ 8 } >
								<FormControl
									name="itemnumber"
									type="text"
									placeholder="Item Number" 
									onChange={ this.childValue } 
									value={ this.state.data["itemnumber"] } 
								/>
							</Col>
						</FormGroup>
		 		 	  <FormGroup>
				 	    <Col smOffset={ 1 } >
								<Checkbox 
									name="received" 
									value={ this.state.data["received"] } 
									onChange={ this.childValue }
								>
									Received
								</Checkbox>
							</Col>
				 	  </FormGroup> 
						<FormGroup controlId="trackingText">
							<Col componentClass="ControlLabel" sm={ 2 }>Tracking:</Col>
							<Col sm={ 8 } >
								<FormControl
									name="tracking"
									type="text"
									placeholder="Tracking" 
									onChange={ this.childValue } 
									value={ this.state.data["tracking"] } 
								/>
							</Col>
						</FormGroup>
		 		 	  <FormGroup>
				 	    <Col smOffset={ 1 } >
								<Checkbox 
									name="eval" 
									value={ this.state.data["eval"] } 
									onChange={ this.childValue }
								>
									Eval
								</Checkbox>
							</Col>
				 	  </FormGroup>
		 		 	  <FormGroup>
				 	    <Col smOffset={ 1 } >
								<Checkbox 
									name="stock" 
									value={ this.state.data["stock"] } 
									onChange={ this.childValue }
								>
									Stock
								</Checkbox>
							</Col>
				 	  </FormGroup>
		 		 	  <FormGroup>
				 	    <Col smOffset={ 1 } >
								<Checkbox 
									name="close" 
									value={ this.state.data["close"] } 
									onChange={ this.childValue }
								>
									Close
								</Checkbox>
							</Col>
				 	  </FormGroup>
			 	  </Tab>
			 	  <Tab eventKey={ 4 } title="Other">
						<FormGroup controlId="startedbyText">
							<Col componentClass="ControlLabel" sm={ 2 }>Started By:</Col>
							<Col sm={ 8 } >
								<FormControl
									name="startedby"
									type="text"
									placeholder="Started By" 
									onChange={ this.childValue } 
									value={ this.state.data["startedby"] } 
								/>
							</Col>
						</FormGroup>
						<FormGroup controlId="notesText">
							<Col componentClass="ControlLabel" sm={ 2 }>Notes:</Col>
							<Col sm={ 8 } >
								<FormControl
									name="notes"
									type="text"
									placeholder="Notes" 
									onChange={ this.childValue } 
									value={ this.state.data["notes"] } 
								/>
							</Col>
						</FormGroup>
						<div>
							<h3>Hold Status</h3>
							<FormGroup controlId="itemnumberText">
								<Col componentClass="ControlLabel" sm={ 2 }>Item Number:</Col>
								<Col sm={ 8 } >
									<FormControl
										name="itemnumber"
										type="text"
										placeholder="Item Number" 
										onChange={ this.childValue } 
										value={ this.state.data["itemnumber"] } 
									/>
								</Col>
							</FormGroup>
							<FormGroup controlId="repairholdText">
								<Col componentClass="ControlLabel" sm={ 2 }>Repair Hold:</Col>
								<Col sm={ 8 } >
									<FormControl
										name="repairhold"
										type="text"
										placeholder="Repair Hold" 
										onChange={ this.childValue } 
										value={ this.state.data["repairhold"] } 
									/>
								</Col>
							</FormGroup>
							<FormGroup controlId="holddateDate">
								<Col componentClass="ControlLabel" sm={ 2 }>Hold Date:</Col>
								<Col sm={ 8 } >
									<FormControl
										name="holddate"
										type="date"
										placeholder="Hold Date" 
										onChange={ this.childValue } 
										value={ this.state.data["holddate"] } 
									/>
								</Col>
							</FormGroup>
							<FormGroup controlId="vendorrmaText">
								<Col componentClass="ControlLabel" sm={ 2 }>Vendor RMA:</Col>
								<Col sm={ 8 } >
									<FormControl
										name="vendorrma"
										type="text"
										placeholder="Vendor RMA" 
										onChange={ this.childValue } 
										value={ this.state.data["vendorrma"] } 
									/>
								</Col>
							</FormGroup>
						</div>
			 	  </Tab>
			 	</Tabs></Col>
			</Form>
		);
	}
});

window.Ticket = Ticket;
