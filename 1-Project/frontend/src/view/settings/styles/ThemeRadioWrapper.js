import styled from 'styled-components';

const ThemesRadioWrapper = styled.div`
  .color-box {
    float: left;
    width: 20px;
    height: 20px;
    margin: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    background: ${(props) => props.color};
  }

  .ant-radio-wrapper-checked .color-box::after {
    border: solid #fff;
    background: #fff;
    top: 50%;
    left: 12%;
    margin-left: -3px;
    margin-top: -3px;
    height: 6px;
    width: 6px;
    border-radius: 100% !important;
    position: absolute;
    content: '';
  }

  .ant-radio-wrapper-checked .color-text {
    color: ${(props) => props.color};
  }

  .ant-radio {
    display: none;
  }
`;

export default ThemesRadioWrapper;
