import AppActivityIndicator from './AppActivityIndicator';
import AppLayout from './AppLayout';

const AppActivityIndicatorWithLayout = () => {
  return (
    <AppLayout className="justify-center items-center">
      <AppActivityIndicator />
    </AppLayout>
  );
};

export default AppActivityIndicatorWithLayout;
