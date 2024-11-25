import React from 'react';
import PropTypes from 'prop-types';

UserCard.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      permissions: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          description: PropTypes.string,
        })
      ).isRequired,
      description: PropTypes.string,
    }).isRequired,
    status: PropTypes.oneOf(['active', 'inactive']).isRequired,
    lastLogin: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

RoleCard.propTypes = {
  role: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    permissions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    description: PropTypes.string,
  }).isRequired,
};

Tabs.propTypes = {
  activeTab: PropTypes.oneOf(['users', 'roles', 'permissions']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export { UserCard, RoleCard, Tabs };
