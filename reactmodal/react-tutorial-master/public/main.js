/*
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';
*/

/*
const Button = require('react-bootstrap/lib/Button');
const Modal = require('react-bootstrap/lib/Modal');
*/

const Button = ReactBootstrap.Button;
const Modal = ReactBootstrap.Modal;


const CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.get(this.props.source, function (comments) {
            this.setState({ data: comments });
        }.bind(this));
    },
    
    getInitialState: function () {
        return { data: [] };
    },
    
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    
    render: function () {        
        return (
            <CommentList data={ this.state.data } />
        );
    }
});

const CommentList = React.createClass({
    getInitialState: function () {
        return { showModal: false, modalbody: '', comment: {} };
    },

    openModal: function () {
        this.setState({ showModal: true });
    },
    
    closeModal: function () {
        this.setState({ showModal: false });    
    },

    /*
    componentDidMount: function () {
        this.getModalContent();
    },
    
    getModalContent: function () {
        $.get('http://cjohnson.ignorelist.com/modal.html', function (modalbody) {
            this.setState({ modalbody: modalbody });
        }.bind(this));
    },
    */
    
    onClick: function (evt) {
				evt.stopPropagation();
				evt.preventDefault();

        this.setState({ comment: evt.currentTarget.attributes.value.value });
        this.openModal();
    },
    
    render: function () {   
        let that = this;
        
        const comments = this.props.data.map(function (comment) {
            return (
                <div onClickCapture={ that.onClick } key={ comment.id } value={ comment.text } >
                    <span>{ comment.author } </span>
                    <span>{ comment.id } </span>
                    <span>{ comment.text }</span>
                </div>
            );
        });
        
        return (
            <div className="container">
                <div className="commentList">
                    { comments } 
                </div>
                <Modal show={ this.state.showModal } >
                    <Modal.Header closeButton>
                        <Modal.Title>{ this.state.comment }</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        <div>This is the text of the comment you clicked:</div>
                        <br />
												{ this.state.comment }
												<br />
                        { this.state.comment }
                    </Modal.Body>
                    
                    <Modal.Footer>
                        <Button onClick={ this.closeModal }>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox source="http://cjohnson.ignorelist.com/api/comments" />,
    document.getElementById('content')
);
