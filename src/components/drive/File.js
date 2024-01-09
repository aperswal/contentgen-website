import React from 'react';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFile, faEllipsisV } from '@fortawesome/free-solid-svg-icons';

export default function File({ file }) {
  return (
    <div className="d-flex justify-content-between align-items-center w-100">
      <FontAwesomeIcon icon={faFile} style={{ marginRight: '8px' }} />
      <span style={{ overflow: 'hidden', textOverflow: 'clip', whiteSpace: 'nowrap' }}>
        {file.name}
      </span>
      <FontAwesomeIcon icon={faEllipsisV} style={{ color: 'gray', marginLeft: '8px' }} />
    </div>
  );
}
