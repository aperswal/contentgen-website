import React from 'react';
import { Card } from 'react-bootstrap';
import File from './File';
import Thumbnail from './Thumbnail'; // Import Thumbnail

export default function FileCard({ file }) {
  const fileThumbnail = file.thumbnailUrl || 'path/to/default-thumbnail.jpg'; // Placeholder for file thumbnail

    return (
        <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-decoration-none text-dark">
        <Card className="w-100 h-100"> {/* Added h-100 for height */}
            <Card.Img variant="top" as={Thumbnail} url={fileThumbnail} alt={file.name} className="h-100" /> {/* Added h-100 for height */}
            <Card.Body className="d-flex flex-column justify-content-center"> {/* Center content vertically */}
            <File file={file} />
            </Card.Body>
        </Card>
        </a>
    );
    }
