import { Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const AuthRoute = ({ component: Component, path, exact }) => {
  const loggedIn = useSelector(state => !!state.session.user);
  const navigate = useNavigate();

  return (
    <Route path={path} exact={exact} render={(props) => (
      !loggedIn ? (
        <Component {...props} />
      ) : (
        navigate('/tweets')
      )
    )} />
  );
};

export const ProtectedRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector(state => !!state.session.user);
  const navigate = useNavigate();

  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          navigate('/login')
        )
      }
    />
  );
};
