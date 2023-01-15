import React from 'react';
import './UserList.css';

function UserList({ username, avartar, url }) {
  return (
    <li className="user-list">
      <img
        className="profile-img"
        src={avartar}
        alt="profile"
        width="50"
        height="50"
      />
      <a className="user-name" href={url} target="_blank">
        {username}
      </a>
    </li>
  );
}

export default UserList;
