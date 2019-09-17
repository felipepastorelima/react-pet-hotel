import { Button, Form } from 'antd';
import { Formik } from 'formik';
import { i18n } from 'i18n';
import actions from 'modules/iam/form/iamFormActions';
import selectors from 'modules/iam/form/iamFormSelectors';
import model from 'modules/auth/userModel';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagesFormItem from 'view/shared/form/items/ImagesFormItem';
import SelectFormItem from 'view/shared/form/items/SelectFormItem';
import TagsFormItem from 'view/shared/form/items/TagsFormItem';
import InputFormItem from 'view/shared/form/items/InputFormItem';
import FormSchema from 'view/shared/form/formSchema';
import FormWrapper, {
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';

const { fields } = model;

class IamNewForm extends Component {
  schema = new FormSchema(fields.id, [
    fields.emails,
    fields.firstName,
    fields.lastName,
    fields.phoneNumber,
    fields.avatarsIam,
    fields.rolesRequired,
  ]);

  componentDidMount = () => {
    const { dispatch } = this.props;
    dispatch(actions.doNew());
  };

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    dispatch(actions.doAdd(values));
  };

  isUniqueEmail(form) {
    return (
      !form.values ||
      !form.values.emails ||
      form.values.emails.length <= 1
    );
  }

  render() {
    const { saveLoading } = this.props;

    return (
      <FormWrapper>
        <Formik
          initialValues={this.schema.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <TagsFormItem
                  name={fields.emails.name}
                  label={fields.emails.label}
                  notFoundContent={i18n(
                    'iam.new.emailsHint',
                  )}
                  required={fields.emails.required}
                  autoFocus
                />

                {this.isUniqueEmail(form) && (
                  <React.Fragment>
                    <InputFormItem
                      name={fields.firstName.name}
                      label={fields.firstName.label}
                    />

                    <InputFormItem
                      name={fields.lastName.name}
                      label={fields.lastName.label}
                    />

                    <InputFormItem
                      name={fields.phoneNumber.name}
                      label={fields.phoneNumber.label}
                      prefix={'+'}
                    />

                    <ImagesFormItem
                      name={fields.avatarsIam.name}
                      label={fields.avatarsIam.label}
                      path={fields.avatarsIam.path}
                      schema={{
                        size: fields.avatarsIam.size,
                      }}
                      max={fields.avatarsIam.max}
                    />
                  </React.Fragment>
                )}

                <SelectFormItem
                  name={fields.rolesRequired.name}
                  label={fields.rolesRequired.label}
                  required={fields.rolesRequired.required}
                  options={fields.roles.options}
                  mode="multiple"
                />

                <Form.Item
                  className="form-buttons"
                  {...tailFormItemLayout}
                >
                  <Button
                    loading={saveLoading}
                    type="primary"
                    htmlType="submit"
                    icon="save"
                  >
                    {i18n('common.save')}
                  </Button>

                  <Button
                    disabled={saveLoading}
                    onClick={form.handleReset}
                    icon="undo"
                  >
                    {i18n('common.reset')}
                  </Button>
                </Form.Item>
              </Form>
            );
          }}
        />
      </FormWrapper>
    );
  }
}

function select(state) {
  return {
    saveLoading: selectors.selectSaveLoading(state),
  };
}

export default connect(select)(IamNewForm);
