import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/iam/importer/iamImporterSelectors';
import IamService from 'modules/iam/iamService';
import fields from 'modules/iam/importer/iamImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'IAM_IMPORTER',
  selectors,
  IamService.import,
  fields,
  i18n('iam.importer.fileName'),
);
