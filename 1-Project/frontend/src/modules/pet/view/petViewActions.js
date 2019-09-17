import viewActions from 'modules/shared/view/viewActions';
import PetService from 'modules/pet/petService';

const prefix = 'PET_VIEW';

export default viewActions({
  prefix,
  findFn: PetService.find,
  redirectToOnError: '/pet',
});
