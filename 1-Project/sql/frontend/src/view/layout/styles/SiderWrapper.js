import styled from 'styled-components';

const SiderWrapper = styled.div`
  .ant-layout-sider {
    min-height: 100vh;
    height: 100%;

    border-right-color: rgb(232, 232, 232);
    border-right-width: 1px;
    border-right-style: solid;
  }

  .ant-menu-inline {
    border: 0;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    text-align: center;
  }
`;

export default SiderWrapper;
