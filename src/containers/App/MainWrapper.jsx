import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import {
  CustomizerProps, ThemeProps, RTLProps,
} from '../../shared/prop-types/ReducerProps';
import { fetchAppConfig } from '../../redux/actions/appConfigActions';
import Loading from '../../shared/components/Loading';
// import classes from './Routes.module.css';
import LoadingComponent from '../../components/Loading/LoadingComponent';

const wrapperClass = (customizer) => {
  classNames({
    wrapper: true,
    'squared-corner-theme': customizer.squaredCorners,
    'blocks-with-shadow-theme': customizer.withBoxShadow,
    'top-navigation': customizer.topNavigation,
  });
};

const direction = (location, rtl) => (location.pathname === '/' ? 'ltr' : rtl.direction);

const MainWrapper = ({
  theme, customizer, children, rtl, location, fetchAppConfigAction, isFetching,
}) => {
  useEffect(() => {
    fetchAppConfigAction();
  }, [fetchAppConfigAction]);

  // const classes = useStyles()

  return (
    <Fragment>
      {/* {isFetching ? ( */}
        {/* <LoadingComponent />
      ) : ( */}
        <div className={`${theme.className} ${direction(location, rtl)}-support`} dir={direction(location, rtl)}>
          <div className={wrapperClass(customizer)}>
            {children}
          </div>
        </div>
      {/* )} */}
    </Fragment>
  );
};

MainWrapper.propTypes = {
  customizer: CustomizerProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  fetchAppConfigAction: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
  isFetching: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const appConfig = state.appConfig && state.appConfig.data
  && state.appConfig.data.length > 0 ? [...state.appConfig.data] : [];
  return ({
    appConfig, // delete if don't use it
    theme: state.theme,
    rtl: state.rtl,
    customizer: state.customizer,
    isFetching: state.appConfig.isFetching,
  });
};

const mapDispatchToProps = {
  fetchAppConfigAction: fetchAppConfig,
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainWrapper));
