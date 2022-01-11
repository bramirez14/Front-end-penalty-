import { Drawer, Button, Radio, Space } from 'antd';
import React from 'react'

export class Demo extends React.Component {
  state = { visible: false, placement: 'left' };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  onChange = e => {
    this.setState({
      placement: e.target.value,
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Space>
        
          <Button type="primary" onClick={this.showDrawer}>
            Open
          </Button>
        </Space>
        <Drawer
          title="Basic Drawer"
          placement='right'
          closable={false}
          onClose={this.onClose}
          visible={visible}
          key='right'
          mask={false}
          destroyOnClose={true}
        >
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Drawer>
      </>
    );
  }
}
