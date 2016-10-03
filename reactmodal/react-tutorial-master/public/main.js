const SERVER = "http://cjohnson.ignorelist.com/";

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
    this.setState({ ticket: evt.currentTarget.attributes.value.value });
		fetch(SERVER + "api/get/" + this.state.ticket)
			.then((data) => { return data.text() })
			.then((ticketdata) => {
				this.setState({ ticketdata: JSON.parse(ticketdata) });
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
			<div>
        <TicketList source={ this.props.source } onclick={ this.selectTicket } />
				<Button bsStyle="primary" onClick={ this.selectTicket } value="new">New Ticket</Button> 
        <Modal show={ this.state.showModal } >
          <Modal.Header>
            <Modal.Title>{ this.state.ticketData.id }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<Ticket data={ this.state.ticketData } />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={ this.closeModal }>Close</Button>
          </Modal.Footer>
        </Modal>
			</div>
  	);
  }
});

const TicketList = React.createClass({
  getInitialState: function () {
      return { tickets: [] };
  },

  componentDidMount: function () {
      this.getTickets();
  },

  getTickets: function () {
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

        this.setState({ tickets: ticketJst });
      });
  },
        
  render: function () {
    return (
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Vendor</th>
            <th>Date</th>
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
