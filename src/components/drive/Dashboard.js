import Navbar from './Navbar'
import {Container} from "react-bootstrap"
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder'
import {useParams, useLocation} from "react-router-dom"
import FolderBreadcrumbs from './FolderBreadcrumbs'
import AddFileButton from './AddFileButton'
import File from './File'
import React, { useState } from 'react'
import FileCard from './FileCard'


export default function Dashboard() {
    const { folderId } = useParams();
    const { folder, childFolders, childFiles } = useFolder(folderId);
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term

        const handleSearch = (term) => {
            setSearchTerm(term.toLowerCase()); 
        };
    
        const filteredFolders = searchTerm
            ? childFolders.filter(folder => folder.name.toLowerCase().includes(searchTerm))
            : childFolders;
        const filteredFiles = searchTerm
            ? childFiles.filter(file => file.name.toLowerCase().includes(searchTerm))
            : childFiles;
    
            return (
                <>
                    <Navbar onSearch={handleSearch} />
                    <Container fluid>
                        <div className="d-flex align-items-center">
                            <FolderBreadcrumbs currentFolder={folder} />
                            <div style={{ marginRight: '8px' }}>
                                <AddFileButton currentFolder={folder} />
                            </div>
                            <AddFolderButton currentFolder={folder} />
                        </div>
                        {filteredFolders.length > 0 && (
                            <div className="d-flex flex-wrap">
                                {filteredFolders.map(childFolder => (
                                    <div 
                                        key={childFolder.id} 
                                        style={{ maxWidth: '250px' }}
                                        className="p-2"
                                    >
                                        <Folder folder={childFolder} />
                                    </div>
                                ))}
                            </div>
                        )}
                        {filteredFolders.length > 0 && filteredFiles.length > 0 && <hr />}
                        {filteredFiles.length > 0 && (
                            <div className="d-flex flex-wrap">
                                {filteredFiles.map(childFile => (
                                    <div 
                                        key={childFile.id} 
                                        style={{ maxWidth: '250px' }}
                                        className="p-2"
                                    >
                                        <FileCard file={childFile} /> {/* Use FileCard here */}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Container>
                </>
            );
        }