import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
	root: {
	},
    loading: {
        color: '#213D77'
    }
});

export default function LoadingComponent() {
    const classes = useStyles()
    return(
        <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#9c9898ad',
            position: 'fixed',
            zIndex: 1300,
            // color: '#a62e2e'
          }}>
            <CircularProgress thickness={4} className={classes.loading} size={60} /*disableShrink={isFetching}*/ />
          </div>
    )
}
