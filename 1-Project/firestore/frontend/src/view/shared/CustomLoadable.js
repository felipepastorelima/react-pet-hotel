import Loadable from 'react-loadable';
import LoadingComponent from 'view/shared/LoadingComponent';

export default function CustomLoadable(opts) {
  return Loadable(
    Object.assign(
      {
        loading: LoadingComponent,
        delay: 200,
        timeout: 10000,
      },
      opts,
    ),
  );
}
