import { Layout as AntLayout } from 'antd';
import React, { Component } from 'react';
import Header from 'view/layout/Header';
import LayoutWrapper from 'view/layout/styles/LayoutWrapper';
import Menu from 'view/layout/Menu';
const { Content } = AntLayout;

const Layout = (WrappedComponent) =>
  class extends Component {
    render() {
      return (
        <LayoutWrapper>
          <Menu url={this.props.match.url} />

          <AntLayout>
            <Header />

            <Content>
              <WrappedComponent {...this.props} />
            </Content>
          </AntLayout>
        </LayoutWrapper>
      );
    }
  };

export default Layout;
