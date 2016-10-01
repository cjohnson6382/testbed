return (
	<Ticket>
	  <div name="rmaProperties">
	    <InputField name="id" type="text" value={ this.state.data["id"] } />
	    <InputField name="date" type="date" value={ this.state.data["date"] } />
	    <DropdownField name="type" value={ this.state.data["type"] } data={ [
	      "doa - cross ship",
	      "doa - repair & return",
	      "non-warranty - repair & return",
	      "other - see notes",
	      "return - credit",
	      "warranty - cross ship"
	    ] } />
	    <AutocompleteField name="customer" value={ this.state.data["customer"] } data="customerdb" />
	    <InputField type="checkbox" name="dropship" value={} />
	  </div>
	  <Tabs defaultActiveKey={ 1 } id="tabs" >
	    <Tab eventKey={ 1 } title="inventory">
	      <InputField name="itemnumber" type="text" value={ this.state.data["itenumber"] } />
	      <AutocompleteField name="vendor" value={ this.state.data["vendor"] } data="vendordb" />
	      <InputField name="serial" type="text" value={ this.state.data["serial"] } />
	      <InputField name="purchasedate" type="text" value={ this.state.data["purchasedata"] } />
	      <DropdownField name="type" value={ this.state.data["type"] } data={ [
	        "doa - cross ship",
	        "doa - repair & return",
	        "non-warranty - repair & return",
	        "other - see notes",
	        "return - credit",
	        "warranty - cross ship"
	      ] } />
	      <InputField name="invoice" type="text" value={ this.state.data["invoice"] } />
	      <InputField name="problem" type="text" value={ this.state.data["problem"] } />
	    </Tab>
	    <Tab eventKey={ 2 } title="customer">
	    </Tab>
	    <Tab eventKey={ 3 } title="status">
	      <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } />
	      <InputField name="received" type="checkbox" value={ this.state.data["received"] } />
	      <InputField name="tracking" type="text" value={ this.state.data["tracking"] } />
	      <InputField name="eval" type="checkbox" value={ this.state.data["eval"] } />
	      <InputField name="stock" type="checkbox" value={ this.state.data["stock"] } />
	      <InputField name="close" type="checkbox" value={ this.state.data["close"] } />
	    </Tab>
	    <Tab eventKey={ 4 } title="other">
	      <InputField name="startedby" type="text" value={ this.state.data["startedby"] } />
	      <InputField name="notes" type="text" value={ this.state.data["notes"] } />
	      <div name="holdstatus">
	        <h2>Hold Status</h2>
	        <InputField name="itemnumber" type="text" value={ this.state.data["itemnumber"] } />
	        <InputField name="repairhold" type="text" value={ this.state.data["repairhold"] } />
	        <InputField name="holddate" type="date" value={ this.state.data["holddate"] } />
	        <InputField name="vendorrma" type="text" value={ this.state.data["vendorrma"] } />
	      <div/>
	    </Tab>
	  </Tabs>
	</Ticket>
);
