import { Button, Form, Radio } from 'antd';
import { Formik } from 'formik';
import actions from 'modules/settings/settingsActions';
import model from 'modules/settings/settingsModel';
import selectors from 'modules/settings/settingsSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { i18n } from 'i18n';
import FormWrapper, {
  formItemLayout,
  tailFormItemLayout,
} from 'view/shared/styles/FormWrapper';
import Spinner from 'view/shared/Spinner';
import FormErrors from 'view/shared/form/formErrors';
import ThemeRadioWrapper from 'view/settings/styles/ThemeRadioWrapper';
import FormSchema from 'view/shared/form/formSchema';

const { fields } = model;

class SettingsForm extends Component {
  schema = new FormSchema(null, [fields.theme]);

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actions.doFind());
  }

  handleSubmit = (values) => {
    const { dispatch } = this.props;
    const { id, ...data } = this.schema.cast(values);
    dispatch(actions.doSave(data));
  };

  handleThemeChange = (form, e) => {
    const color = e.target.value;
    form.setFieldValue('theme', color);
  };

  initialValues = () => {
    const settings = this.props.settings;
    return this.schema.initialValues(settings);
  };

  renderForm() {
    const { saveLoading } = this.props;

    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };

    return (
      <FormWrapper>
        <Formik
          initialValues={this.initialValues()}
          validationSchema={this.schema.schema}
          onSubmit={this.handleSubmit}
          render={(form) => {
            return (
              <Form onSubmit={form.handleSubmit}>
                <Form.Item
                  {...formItemLayout}
                  label={fields.theme.label}
                  help={FormErrors.displayableError(
                    form,
                    fields.theme.name,
                  )}
                  validateStatus={FormErrors.validateStatus(
                    form,
                    fields.theme.name,
                  )}
                >
                  <Radio.Group
                    id={fields.theme.name}
                    onChange={(e) =>
                      this.handleThemeChange(form, e)
                    }
                    value={form.values.theme}
                  >
                    {fields.theme.options.map((theme) => (
                      <ThemeRadioWrapper
                        key={theme.id}
                        color={theme.hex}
                      >
                        <Radio
                          style={radioStyle}
                          value={theme.id}
                        >
                          <div className="color-box">
                            <div className="color-box-inner" />
                          </div>
                          <span className="color-text">
                            {theme.label}
                          </span>
                        </Radio>
                      </ThemeRadioWrapper>
                    ))}
                  </Radio.Group>
                </Form.Item>

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

  render() {
    const { findLoading, settings } = this.props;

    if (findLoading) {
      return <Spinner />;
    }

    if (!settings) {
      return <Spinner />;
    }

    return this.renderForm();
  }
}

function select(state) {
  return {
    findLoading: selectors.selectFindLoading(state),
    saveLoading: selectors.selectSaveLoading(state),
    settings: selectors.selectSettings(state),
  };
}

export default connect(select)(SettingsForm);
