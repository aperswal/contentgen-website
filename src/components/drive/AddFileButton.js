import React, { useState } from 'react';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from '../../contexts/AuthContext';
import { storage, database } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ROOT_FOLDER } from '../../hooks/useFolder';
import { addDoc } from 'firebase/firestore';
import { v4 as uuidV4 } from 'uuid';
import ReactDOM from 'react-dom';
import { ProgressBar, Toast } from 'react-bootstrap';

export default function AddFileButton({ currentFolder }) {
    const [uploadingFiles, setUploadingFiles] = useState([]);
    const { currentUser } = useAuth();

    function handleUpload(e) {
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;

        const id = uuidV4();
        setUploadingFiles(prevUploadingFiles => [
            ...prevUploadingFiles, 
            {
                id: id,
                name: file.name,
                progress: 0,
                error: false
            }
        ]);

        const parentPath = currentFolder.path.length > 0
            ? `${currentFolder.path.join('/')}` : "";

        const filePath = currentFolder === ROOT_FOLDER
            ? `${parentPath}/${file.name}`
            : `${parentPath}/${currentFolder.name}/${file.name}`;

        const fileRef = ref(storage, `/files/${currentUser.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(fileRef, file);

        uploadTask.on('state_changed', 
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, progress: progress };
                        }
                        return uploadFile;
                    });
                });
            }, 
            (error) => {
                setUploadingFiles(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadFile => {
                        if (uploadFile.id === id) {
                            return { ...uploadFile, error: true };
                        }
                        return uploadFile;
                    });
                });
            }, 
            () => {
                setUploadingFiles(prevUploadingFiles => prevUploadingFiles.filter(uploadFile => uploadFile.id !== id));
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    const fileMetadata = {
                        url: downloadURL,
                        name: file.name,
                        createdAt: new Date(),
                        folderId: currentFolder.id,
                        userId: currentUser.uid,
                    };

                    return addDoc(database.files, fileMetadata);
                });
            }
        );
    }

    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FontAwesomeIcon icon={faFileUpload} />
                <input
                    type="file"
                    onChange={handleUpload}
                    style={{ opacity: 0, position: "absolute", left: "-9999px" }}
                />
            </label>
            {uploadingFiles.length > 0 && 
                ReactDOM.createPortal(
                    <div
                        style={{
                            position: 'absolute',
                            bottom: '1rem',
                            right: '1rem',
                            maxWidth: '250px',
                        }}
                    >
                        {uploadingFiles.map(file => {
                            console.log('File Progress:', file.progress, 'File Error:', file.error);

                            return (
                                <Toast key={file.id}>
                                    <Toast.Header closeButton={file.error} className="text-truncate w-100 d-block">
                                        {file.name}
                                    </Toast.Header>
                                    <Toast.Body>
                                        <ProgressBar 
                                            animated={!file.error}
                                            variant={file.error ? 'danger' : 'primary'}
                                            now={file.error ? 100 : file.progress}
                                            label={file.error ? "Error" : `${Math.round(file.progress)}%`}
                                        />
                                    </Toast.Body>
                                </Toast>
                            );
                        })}
                    </div>,
                    document.body
                )}
        </>
    );
}
