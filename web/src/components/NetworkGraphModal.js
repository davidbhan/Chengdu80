import React from "react";
import { Modal, Button } from "antd";
import { NetworkGraph } from "./NetworkGraph";

export class NetworkGraphModal extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleOk = e => {
    this.setState({
      visible: false
    });
  };

  handleCancel = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    const { authorData, loading } = this.props;
    return (
      <div>
        <Button
          type="primary"
          icon="global"
          onClick={this.showModal}
          loading={loading}
        >
          Collaboration Network
        </Button>
        <Modal
          centered
          title="Collaboration Network"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={"80%"}
        >
          {authorData && authorData.papers && (
            <NetworkGraph authorData={authorData} />
          )}
        </Modal>
      </div>
    );
  }
}
