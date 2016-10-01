const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;

const CreateTemplate = window.CreateTemplate;

const TicketBox = React.createClass({
  getInitialState: function () {
      return { data: [], ticket: '' };
  },
	selectTicket: function (evt) {
		//	evt.stopPropogation();
		evt.preventDefault();
    this.setState({ ticket: evt.currentTarget.attributes.value.value });
		this.openModal();
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
          <Modal.Header closeButton>
            <Modal.Title>{ this.state.ticket }</Modal.Title>
          </Modal.Header>
          <Modal.Body>
						<CreateTemplate source={ this.state.ticket } />
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
      return { showModal: false, tickets: this.props.data, ticket: {}, modalSource: '' };
  },

  componentDidMount: function () {
      this.getTickets();
  },

  getTickets: function () {
    fetch(this.props.source) 
			.then((tickets) => {
				return tickets.text();
			})
			.then((text) => {
        const ticketJst = JSON.parse(text).map((ticket) => {
          return (
            <div onClickCapture={ this.props.onclick } key={ ticket.id } value={ ticket.id } >
              <span>{ ticket.vendor } </span>
              <span>{ ticket.date } </span>
              <span>{ ticket.id }</span>
            </div>
          );
        });

        this.setState({ tickets: ticketJst });
			});
  },
    
  render: function () {   
    return (
      <div className="container">
        <div className="ticketList">
          { this.state.tickets } 
        </div>
      </div>
    );
  }
});

ReactDOM.render(
    <TicketBox source="http://cjohnson.ignorelist.com/tickets.json" />,
    document.getElementById('content')
);
