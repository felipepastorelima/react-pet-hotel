import { Button, Form } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/auth/authActions';
import model from 'modules/auth/userModel';
import selectors from 'modules/auth/authSelectors';
import { i18n } from 'i18n';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Content from 'view/auth/styles/Content';
import ForgotPasswordPageWrapper from 'view/auth/styles/ForgotPasswordPageWrapper';
import Logo from 'view/auth/styles/Logo';
import OtherActions from 'view/auth/styles/OtherActions';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';

const { fields } = model;

class ForgotPasswordPage extends Component {
  schema = new FormSchema(null, [fields.email]);

  initialValues = () => {
    return this.schema.initialValues();
  };

  doSubmit = ({ email }) => {
    const { dispatch } = this.props;
    dispatch(actions.doSendPasswordResetEmail(email));
  };

  render() {
    return (
      <ForgotPasswordPageWrapper>
        <Content>
          <Logo>
            <h1>{i18n('app.title')}</h1>
          </Logo>

          <Formik
            initialValues={this.initialValues()}
            validationSchema={this.schema.schema}
            onSubmit={this.doSubmit}
            render={(form) => (
              <Form onSubmit={form.handleSubmit}>
                <InputFormItem
                  name={fields.email.name}
                  size="large"
                  placeholder={fields.email.label}
                  autoFocus
                  autoComplete={fields.email.name}
                  layout={null}
                />

                <Button
                  type="primary"
                  size="large"
                  block
                  htmlType="submit"
                  loading={this.props.loading}
                >
                  {i18n('auth.passwordReset.message')}
                </Button>

                <OtherActions>
                  <Link to="/auth/signin">
                    {i18n('common.cancel')}
                  </Link>
                </OtherActions>
              </Form>
            )}
          />
        </Content>
      </ForgotPasswordPageWrapper>
    );
  }
}

const select = (state) => ({
  loading: selectors.selectLoadingPasswordReset(state),
});

export default connect(select)(ForgotPasswordPage);
