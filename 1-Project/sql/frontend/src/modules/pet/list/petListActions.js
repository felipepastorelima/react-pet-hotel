import PetService from 'modules/pet/petService';
import paginationAction from 'modules/shared/pagination/paginationAction';
import selectors from 'modules/pet/list/petListSelectors';
import { i18n } from 'i18n';
import exporterFields from 'modules/pet/list/petListExporterFields';

const prefix = 'PET_LIST';

export default paginationAction(
  prefix,
  PetService.list,
  selectors,
  i18n('entities.pet.exporterFileName'),
  exporterFields,
);
