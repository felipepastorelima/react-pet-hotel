import {
  Layout as AntLayout,
  Menu as AntMenu,
  Icon,
} from 'antd';
import React, { Component } from 'react';
import SiderWrapper from 'view/layout/styles/SiderWrapper';
import { Link } from 'react-router-dom';
import authSelectors from 'modules/auth/authSelectors';
import { connect } from 'react-redux';
import PermissionChecker from 'modules/auth/permissionChecker';
import actions from 'modules/layout/layoutActions';
import layoutSelectors from 'modules/layout/layoutSelectors';
import routes from 'view/routes';
import { i18n } from 'i18n';
const { Sider } = AntLayout;

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0 };
  }

  componentDidMount() {
    this.toggleMenuOnResize();
    window.addEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  componentWillUnmount() {
    window.removeEventListener(
      'resize',
      this.toggleMenuOnResize,
    );
  }

  toggleMenuOnResize = () => {
    window.innerWidth < 576
      ? this.hideMenu()
      : this.showMenu();
  };

  get selectedKeys() {
    const url = this.props.url;

    const match = routes.privateRoutes.find((option) => {
      if (option.menu.exact) {
        return url === option.path;
      }

      return url.startsWith(option.path);
    });

    if (match) {
      return [match.path];
    }

    return null;
  }

  hideMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doHideMenu());
  };

  showMenu = () => {
    const { dispatch } = this.props;
    dispatch(actions.doShowMenu());
  };

  match = (permission) => {
    const permissionChecker = new PermissionChecker(
      this.props.currentUser,
    );

    return permissionChecker.match(permission);
  };

  render() {
    return (
      <SiderWrapper
        style={{
          display: this.props.menuVisible
            ? 'block'
            : 'none',
        }}
      >
        <Sider theme="light" trigger={null}>
          <div className="logo">
            <h2>{i18n('app.title')}</h2>
          </div>

          <AntMenu
            theme="light"
            mode="inline"
            selectedKeys={this.selectedKeys}
          >
            {routes.privateRoutes
              .filter((privateRoute) => !!privateRoute.menu)
              .filter((privateRoutes) =>
                this.match(
                  privateRoutes.permissionRequired,
                ),
              )
              .map((privateRoute) => (
                <AntMenu.Item key={privateRoute.path}>
                  <Link to={privateRoute.path}>
                    <Icon type={privateRoute.icon} />
                    <span>{privateRoute.label}</span>
                  </Link>
                </AntMenu.Item>
              ))}
          </AntMenu>
        </Sider>
      </SiderWrapper>
    );
  }
}

const select = (state) => ({
  currentUser: authSelectors.selectCurrentUser(state),
  menuVisible: layoutSelectors.selectMenuVisible(state),
});

export default connect(select)(Menu);
