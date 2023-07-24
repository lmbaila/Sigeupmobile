import { CommonActions } from '@react-navigation/native';


let navigator;

const setTopLevelNavigator = navigatorRef => {
  navigator = navigatorRef;
};

const navigate = (routeName, params) => {
  navigator.dispatch(
    CommonActions.navigate({
      routeName,
      params,
    })
  );
};

const goBack = () => {
  navigator.dispatch(CommonActions.back());
};

export default {
  navigate,
  goBack,
  setTopLevelNavigator,
};
