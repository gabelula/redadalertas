import React from 'react';

const styles = {
  root: {
    fontFamily: '"HelveticaNeue-Light", "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif',
    fontWeight: 300,
  },
  header: {
    backgroundColor: 'rgb(121, 9, 9)',
    color: 'white',
    padding: '16px',
    fontSize: '1.5em',
  },
};

const MaterialTitlePanel = (props) => {
  this.propTypes = {
    style: React.PropTypes.object,
  };
  const rootStyle = props.style ? {...styles.root, ...props.style} : styles.root;

  return (
    <div style={rootStyle}>
      <div style={styles.header}>{props.title}</div>
      {props.children}
    </div>
  );
};

export default MaterialTitlePanel;
