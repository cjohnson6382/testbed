const SERVER = "http://cjohnson.ignorelist.com/";

const Panel = ReactBootstrap.Panel;
const Table = ReactBootstrap.Table;
const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;

const Ticket = window.Ticket;

const TicketBox = React.createClass({
  getInitialState: function () {
      return { data: [], ticketData: '', showModal: false };
  },
	selectTicket: function (evt) {
		evt.preventDefault();
		let ticketid = evt.currentTarget.attributes.value.value;
    this.setState({ ticket: ticketid });
		fetch(SERVER + "api/get/" + ticketid)
			.then((data) => { return data.text() })
			.then((ticketdata) => {
				this.setState({ ticketdata: JSON.parse(ticketdata)[0] });
				this.openModal();
			});
	},
	openModal: function () {
		this.setState({ showModal: true });
	},
	closeModal: function () {
		this.setState({ showModal: false });
	},
  render: function () { 
    return (
			<Panel height="65%" width="80%">
        <TicketList source={ this.props.source } onclick={ this.selectTicket } />
				<Button bsStyle="primary" onClick={ this.selectTicket } value="new">New Ticket</Button> 
        <Modal bsSize="large" show={ this.state.showModal } >
          <Modal.Header>
            <Modal.Title>Ticket Properties</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<Ticket data={ this.state.ticketdata } />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.closeModal }>Cancel</Button>
          </Modal.Footer>
        </Modal>
			</Panel>
  	);
  }
});

const TicketList = React.createClass({
  getInitialState: function () {
      return { tickets: [] };
  },

  componentDidMount: function () {
    fetch(this.props.source)
      .then((tickets) => { return tickets.text() })
      .then((text) => {
        const ticketJst = JSON.parse(text).map((ticket) => {
          return (
            <tr onClickCapture={ this.props.onclick } key={ ticket.id } value={ ticket.id } >
              <td>{ ticket.id }</td>
              <td>{ ticket.vendor }</td>
              <td>{ ticket.date }</td>
            </tr>
          );
        });

        if (this.isMounted()) this.setState({ tickets: ticketJst });
      });
  },
        
  render: function () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th width="15%">Id</th>
            <th width="45%">Vendor</th>
            <th width="40%">Date</th>
          </tr>
        </thead>
        <tbody>
          { this.state.tickets }
        </tbody>
      </Table>
    );
  }
});

ReactDOM.render(
    <TicketBox source="http://cjohnson.ignorelist.com/tickets.json" />,
    document.getElementById('content')
);
