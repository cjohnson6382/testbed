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
            
            console.log('loadCommentsFromServer: ', comments);
            
        }.bind(this));
    },
    
    getInitialState: function () {
        return { data: [] };
    },
    
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    
    render: function () {
        console.log('state in CommentBox: ', this.state);
        
        return (
            <CommentList data={ this.state.data } />
        );
    }
});

const CommentList = React.createClass({
    getInitialState: function () {
        return { showModal: false, modalbody: '' };
    },

    openModal: function () {
        this.setState({ showModal: true });
    },
    
    closeModal: function () {
        this.setState({  showModal: false });    
    },

    getModalContent: function () {
        $.get('http://cjohnson.ignorelist.com/public/modal.html', function (modalbody) {
            this.setState({ modalbody: modalbody });
        }.bind(this));
    },

    onClick: function (evt) {
        evt.preventDefault();
        this.setState({ modalText: evt.target.value });
        getModalContent();
        openModal();
    },
    
    render: function () {
        
        
        console.log('props: ', this.props);
        console.log('state: ', this.state);
        
        
        const comments = this.props.data.map(function (comment) {
            return (
                //  this might not work //
                <div onClick={openModal} value={comment.text} >
                    <span>comment.author</span>
                    <span>comment.id</span>
                    <span>comment.text</span>
                </div>
            );
        });
        
        return (
            <div className="container">
                <div className="commentList">
                    { comments } 
                </div>
                <Modal show={ this.state.showModal } name={ this.state.modalText } onHide={ this.closeModal }>
                    { this.state.modalbody }
                </Modal>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox source="http://cjohnson.ignorelist.com/api/comments" />,
    document.getElementById('content')
);