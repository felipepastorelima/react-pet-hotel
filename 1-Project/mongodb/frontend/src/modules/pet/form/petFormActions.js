import PetService from 'modules/pet/petService';
import formActions from 'modules/shared/form/formActions';

const prefix = 'PET_FORM';

export default formActions({
  prefix,
  createFn: PetService.create,
  createSuccessMessageI18nKey:
    'entities.pet.create.success',
  updateFn: PetService.update,
  updateSuccessMessageI18nKey:
    'entities.pet.update.success',
  findFn: PetService.find,
  redirectTo: '/pet',
});
