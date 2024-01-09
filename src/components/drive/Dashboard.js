import React from 'react'
import Navbar from './Navbar'
import {Container} from "react-bootstrap"
import AddFolderButton from './AddFolderButton'
import { useFolder } from '../../hooks/useFolder'
import Folder from './Folder'
import {useParams} from "react-router-dom"

export default function Dashboard() {
    const { folderId } = useParams(); // Extract folderId from params
    console.log("Folder ID from URL:", folderId); // Log the folder ID

    const { folder, childFolders } = useFolder(folderId);
    
    return (
    <>
        <Navbar/>
        <Container fluid> <AddFolderButton currentFolder = {folder}/>
        {childFolders.length > 0 && (
            <div className="d-flex flex-wrap">
                {childFolders.map((childFolder) => (
                    <div 
                    key = {childFolder.id} 
                    style = {{maxWidth: '250px' }}
                    className = "p-2"
                    >
                        <Folder folder = {childFolder} />
                    </div>
                ))}
                </div>
            )}
        </Container>
        </>
        )
    }
