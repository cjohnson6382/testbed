const CommentBox = React.createClass({
    loadCommentsFromServer: function () {
        $.get(this.props.url, function (comments) {
            this.setState({ data: comments }.bind(this));
        });
    },
    
    getInitialState: function () {
        return { data: [] };
    },
    
    componentDidMount: function () {
        this.loadCommentsFromServer();
    },
    
    render: function () {
        <CommentList data={ this.state.data } />
    }
});

const CommentList = React.createClass({
    getInitialState: function () {
        setState({ showModal: false, modalbody: '' });
    },

    openModal: function () {
        this.setState({ showModal: true });
    },
    
    closeModal: function () {
        this.setState({  showModal: false });    
    },

    getModalContent: function () {
        $.get('http://cjohnson.ignorelist.com/public/modal.html', function (modalbody) {
            setState({ modalbody: modalbody });
        });
    },

    onClick: function (evt) {
        evt.preventDefault();
        setState({ modalText: evt.target.value });
        getModalContent();
        openModal();
    },
    
    render: function () {
        const comments = this.props.data.map(function (comment) {
            return (
                <div onClick={this.openModal} value={comment.text} >
                    <span>comment.author</span>
                    <span>comment.id</span>
                    <span>comment.text</span>
                </div>
            );
        });

/*                  
                <Modal show={ this.state.showModal } name={ this.state.modalText } onHide={ this.closeModal }>
                    { this.state.modalbody }
                </Modal>
*/
        
        return (
            <div className="container">
                <div className="commentList">
                    { comments } 
                </div>
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox source="http://cjohnson.ignorelist.com/api/comments" />,
    document.getElementById('content')
);
