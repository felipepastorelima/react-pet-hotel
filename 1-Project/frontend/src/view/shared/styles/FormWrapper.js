import styled from 'styled-components';

const FormWrapper = styled.div`
  padding: 24px;
  padding-top: 0;
  padding-bottom: 0;

  .ant-form-item-with-help {
    margin-bottom: 24px;
  }

  .form-buttons {
    .ant-btn {
      margin-right: 8px;
    }
  }
`;

export const formItemLayout = {
  labelCol: {
    md: { span: 6 },
    lg: { span: 4 },
  },
  wrapperCol: {
    md: { span: 18 },
    lg: { span: 12 },
  },
};

export const tailFormItemLayout = {
  wrapperCol: {
    md: {
      span: 18,
      offset: 6,
    },
    lg: {
      span: 12,
      offset: 4,
    },
  },
};

export default FormWrapper;
