import React from 'react';
import classNames from 'classnames';
import { Card, CardTitle, CardSubtitle, CardBody } from 'reactstrap';

import PropTypes from '../../util/propTypes';
import Avatar from '../../component/Avatar';

const UserCard = ({
  avatar,
  avatarSize,
  title,
  subtitle,
  children,
  className,
  isLargeFontSize,
  ...restProps
}) => {
  const classes = classNames('bg-gradient-theme', className);

  const styleFontSize = () => {
    if (isLargeFontSize) {
      return {fontSize: '1.5rem'}
    } else {
      return {fontSize: '1rem'}
    }
  }

  return (
    <Card inverse className={classes} {...restProps}>
      <CardBody className="d-flex justify-content-center align-items-center flex-column">
        <Avatar src={avatar} size={avatarSize} className="mb-2" />
        <CardTitle className={"text-black"} style={styleFontSize()}>{title}</CardTitle>
        <CardSubtitle className={"text-black"} style={styleFontSize()}>{subtitle}</CardSubtitle>
      </CardBody>
      {children}
    </Card>
  );
};

UserCard.propTypes = {
  avatar: PropTypes.string,
  avatarSize: PropTypes.number,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  text: PropTypes.string,
  className: PropTypes.string,
};

UserCard.defaultProps = {
  avatarSize: 80,
};

export default UserCard;
