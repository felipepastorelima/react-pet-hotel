import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb as AntBreadcrumb } from 'antd';

class Breadcrumb extends Component {
  isLink = (item) => {
    return item.length > 1;
  };

  render() {
    return (
      <AntBreadcrumb>
        {this.props.items.map((item) => (
          <AntBreadcrumb.Item key={item[0]}>
            {this.isLink(item) ? (
              <Link to={item[1]}>{item[0]}</Link>
            ) : (
              item[0]
            )}
          </AntBreadcrumb.Item>
        ))}
      </AntBreadcrumb>
    );
  }
}

export default Breadcrumb;
