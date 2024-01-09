import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolderPlus } from '@fortawesome/free-solid-svg-icons';
import { database } from "../../firebase";
import { addDoc } from 'firebase/firestore';
import { useAuth } from '../../contexts/AuthContext'; 
import { ROOT_FOLDER } from "../../hooks/useFolder";

export default function AddFolderButton({ currentFolder }) { 
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const { currentUser } = useAuth();

    function openModal() {
        setOpen(true);
    }

    function closeModal() {
        setOpen(false);
    }

    function handleSubmit(e) {
        e.preventDefault();

        if (currentFolder == null) return; 

        const path = [...currentFolder.path]
        if (currentFolder !== ROOT_FOLDER){
            path.push({name: currentFolder.name, id: currentFolder.id});
        }

        addDoc(database.folders, {
            name: name,
            parentId: currentFolder.id, 
            userId: currentUser.uid,
            path: path, 
            createdAt: new Date()
        })
        .then(() => {
            setName("");
            closeModal();
        })
        .catch((error) => {
            console.error("Error adding folder:", error);
        });
    }

    return (
        <>
            <Button onClick={openModal} variant="outline-success" size="sm">
                <FontAwesomeIcon icon={faFolderPlus} />
            </Button>
            <Modal show={open} onHide={closeModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control
                                type="text"
                                required
                                value={name}
                                onChange={e => setName(e.currentTarget.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeModal}>
                            Close
                        </Button>
                        <Button variant="success" type="submit">
                            Add Folder
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    );
}
