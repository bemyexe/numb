import {Outlet} from 'react-router';

interface Props {
  className?: string;
}

export const App = ({className}: Props) => {
  return (
    <div className={className}>
      App
      <Outlet />
    </div>
  );
};
