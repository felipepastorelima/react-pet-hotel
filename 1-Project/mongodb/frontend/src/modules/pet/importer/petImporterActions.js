import importerActions from 'modules/shared/importer/importerActions';
import selectors from 'modules/pet/importer/petImporterSelectors';
import PetService from 'modules/pet/petService';
import fields from 'modules/pet/importer/petImporterFields';
import { i18n } from 'i18n';

export default importerActions(
  'PET_IMPORTER',
  selectors,
  PetService.import,
  fields,
  i18n('entities.pet.importer.fileName'),
);
