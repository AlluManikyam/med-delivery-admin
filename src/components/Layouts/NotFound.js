import React, { Component } from 'react';
import { withRouter } from 'react-router';

class PageNotFound extends Component {
    componentWillMount() {
        this.props.history.push("/")
    }
    render() {
        return (
            <div></div>
        )
    }
}
export default withRouter(PageNotFound);