var Form = React.createClass({

    getInitialState: function() {
        return { value: '' };
    },
    handleChange: function(event) {
        this.setState({ value: event.target.value });
        console.log(event.target.value)
    },



    myFn(e) {
        e.preventDefault();
        console.log(this.state.value);
        $.ajax({
            url: 'http://localhost:8080/deploy',
            context: this,
            dataType: 'json',
            type: 'POST',
            data: {
                    "gitURL":this.state.value
                  }
        }).done(function(data) {
            console.log("successful");
        });

    },

    render: function() {
        return ( < form onSubmit = { this.myFn } >
            < input type = "text"
            value = { this.state.value }
            onChange = { this.handleChange }
            name = "gitURL" / > < button type = "submit" > Deploy < /button>  < /form >
        );
    }

})





var App = React.createClass({
    render: function() {
        return <Form / >
    }
});

ReactDOM.render( < App / > , document.body);
