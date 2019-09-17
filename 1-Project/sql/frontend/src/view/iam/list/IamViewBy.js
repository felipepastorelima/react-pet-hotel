import RadioGroup from 'antd/lib/radio/group';
import RadioButton from 'antd/lib/radio/radioButton';
import actions from 'modules/iam/list/mode/iamListModeActions';
import iamListModeSelectors from 'modules/iam/list/mode/iamListModeSelectors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IamViewByWrapper from 'view/iam/list/styles/IamViewByWrapper';
import { i18n } from 'i18n';

class IamViewBy extends Component {
  changeMode(mode) {
    const { dispatch } = this.props;
    dispatch(actions.doChangeIamListMode(mode));
  }

  render() {
    return (
      <IamViewByWrapper>
        {i18n('iam.viewBy')}
        <RadioGroup
          value={this.props.mode}
          onChange={(event) =>
            this.changeMode(event.target.value)
          }
        >
          <RadioButton value="users">
            {i18n('iam.users.label')}
          </RadioButton>
          <RadioButton value="roles">
            {i18n('iam.roles.label')}
          </RadioButton>
        </RadioGroup>
      </IamViewByWrapper>
    );
  }
}

function select(state) {
  return {
    mode: iamListModeSelectors.selectMode(state),
  };
}

export default connect(select)(IamViewBy);
