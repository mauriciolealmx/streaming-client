import React from 'react';
import { connect } from 'react-redux';

import StreamForm from './StreamForm';
import { fetchStream, editStream } from '../../actions';

class StreamEdit extends React.Component {
  componentDidMount() {
    const { fetchStream, match } = this.props;
    const { id } = match.params;
    fetchStream(id);
  }

  onSubmit = formValues => {
    const { editStream, match } = this.props;
    const { id } = match.params;
    editStream(id, formValues);
  };

  render() {
    const { stream } = this.props;
    if (!stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = stream;
    return (
      <div>
        <h3>Edit a Stream</h3>
        <StreamForm initialValues={{ title, description }} onSubmit={this.onSubmit} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  return {
    stream: state.streams[id],
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, editStream }
)(StreamEdit);
