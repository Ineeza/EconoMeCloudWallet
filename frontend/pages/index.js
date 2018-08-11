import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

function About(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Typography variant="display1" gutterBottom>
        Material-UI
      </Typography>
      <Typography variant="subheading" gutterBottom>
        about page
      </Typography>
      <Typography gutterBottom>
        <Link href="/">
          <a>Go to the main page</a>
        </Link>
      </Typography>
      <Button variant="contained" color="primary">
        Do nothing button
      </Button>
    </div>
  );
}

About.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(About);


//export default () => (
//  <ul>
//    <li><Link href='/login' as='/login'><a>Login</a></Link></li>
//    <li><Link href='/dashboard' as='/dashboard'><a>Dashboard</a></Link></li>
//    <li>
//      <Link
//        href={{pathname: '/tokens', query: { id: '2' }}}
//        as='/tokens/2'
//      >
//        <a>tokens #2</a>
//      </Link>
//    </li>
//  </ul>
//)

