import { Icon, Layout, Menu, Dropdown, Avatar } from 'antd';
import authActions from 'modules/auth/authActions';
import authSelectors from 'modules/auth/authSelectors';
import layoutActions from 'modules/layout/layoutActions';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderWrapper from 'view/layout/styles/HeaderWrapper';
import layoutSelectors from 'modules/layout/layoutSelectors';
import { i18n } from 'i18n';
import I18nSelect from 'view/layout/I18nSelect';
import { getHistory } from 'modules/store';

const { Header: AntHeader } = Layout;

class Header extends Component {
  doSignout = () => {
    const { dispatch } = this.props;
    dispatch(authActions.doSignout());
  };

  doNavigateToProfile = () => {
    getHistory().push('/profile');
  };

  doToggleMenu = () => {
    const { dispatch } = this.props;
    dispatch(layoutActions.doToggleMenu());
  };

  userMenu = (
    <Menu selectedKeys={[]}>
      <Menu.Item
        onClick={this.doNavigateToProfile}
        key="userCenter"
      >
        <Icon type="user" />
        {i18n('auth.profile.title')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item onClick={this.doSignout} key="logout">
        <Icon type="logout" />
        {i18n('auth.signout')}
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <HeaderWrapper>
        <AntHeader>
          <Icon
            className="trigger"
            type={
              this.props.menuVisible
                ? 'menu-fold'
                : 'menu-unfold'
            }
            onClick={this.doToggleMenu}
          />
          <div>
            <span className="i18n-select">
              <I18nSelect />
            </span>

            <Dropdown
              className="user-dropdown"
              overlay={this.userMenu}
              trigger={['click']}
            >
              <span>
                <Avatar
                  className="user-dropdown-avatar"
                  size="small"
                  src={
                    this.props.userDropdownAvatar ||
                    undefined
                  }
                  alt="avatar"
                />
                <span className="user-dropdown-text">
                  {this.props.userDropdownText}
                </span>
              </span>
            </Dropdown>
          </div>
        </AntHeader>
      </HeaderWrapper>
    );
  }
}

const select = (state) => ({
  menuVisible: layoutSelectors.selectMenuVisible(state),
  userDropdownText: authSelectors.selectCurrentUserNameOrEmailPrefix(
    state,
  ),
  userDropdownAvatar: authSelectors.selectCurrentUserAvatar(
    state,
  ),
});

export default connect(select)(Header);
