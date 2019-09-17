import destroyActions from 'modules/shared/destroy/destroyActions';
import listActions from 'modules/pet/list/petListActions';
import PetService from 'modules/pet/petService';

const prefix =
  'PET_DESTROY';

export default destroyActions({
  prefix,
  destroyAllFn: PetService.destroyAll,
  destroySuccessMessageI18nKey:
    'entities.pet.destroy.success',
  destroyAllSuccessMessageI18nKey:
    'entities.pet.destroyAll.success',
  redirectTo: '/pet',
  listActions,
});
