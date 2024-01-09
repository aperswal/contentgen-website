import { useReducer, useEffect } from 'react';
import { database } from '../firebase';
import { doc, getDoc, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../contexts/AuthContext';

const ACTIONS = {
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
    SET_CHILD_FOLDERS: 'set-child-folders'
}

const ROOT_FOLDER = {name: 'Home', id: null, path: []}

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: action.payload.folderId,
                folder: action.payload.folder,
                childFiles: [],
                childFolders: []
            };
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: action.payload.folder,
            };
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: action.payload.childFolders,
            };
        default:
            return state;
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: []
    });

    const { currentUser } = useAuth();

    useEffect(() => {
        console.log("Current User:", currentUser); // Check current user state
        console.log("Folder ID in useFolder:", folderId); // Log folder ID
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId == null) {
            dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
            return;
        }

        const docRef = doc(database.folders, folderId);

        getDoc(docRef).then(docSnapshot => {
            if (docSnapshot.exists()) {
                dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: database.formatDoc(docSnapshot) } });
            } else {
                dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
            }
        }).catch(() => {
            dispatch({ type: ACTIONS.UPDATE_FOLDER, payload: { folder: ROOT_FOLDER } });
        });
    }, [folderId]);

    useEffect(() => {
        if (!currentUser) {
            return;
        }
    
        let queryRef = database.folders;
        if (folderId != null) {
            queryRef = query(database.folders, where("parentId", "==", folderId));
        } else {
            queryRef = query(database.folders, where("parentId", "==", null));
        }
    
        queryRef = query(queryRef, where("userId", "==", currentUser.uid));
    
        const unsubscribe = onSnapshot(queryRef, snapshot => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDERS,
                payload: { childFolders: snapshot.docs.map(database.formatDoc) }
            });
        });
    
        return () => unsubscribe();
    }, [folderId, currentUser]);
    

    return state;
}
