import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFolder } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Folder({ folder }) {
    return (
        <Button to={`/folder/${folder.id}`} variant="outline-dark" className="text-truncate w-100" as={Link}>
            <FontAwesomeIcon icon={faFolder} className="mr-3" /> {folder.name}
        </Button>
    );
}
