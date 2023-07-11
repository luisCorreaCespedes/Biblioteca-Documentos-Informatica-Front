import { createContext, useContext, useState } from "react";
import { createDocsRequest, getDocsRequest, deleteDocsRequest, getDocRequest, updateDocsRequest } from "../api/docs";

const DocsContext = createContext();

export const useDocs = () => {
    const context = useContext(DocsContext);

    if (!context) {
        throw new Error("useDocs necesita ser utilizado con DocsProvider");
    }
    return context;
};

export function DocsProvider({children}) {
    const [docs, setDocs] = useState([]);

    const getDocs = async () => {
        try {
            const res = await getDocsRequest();
            setDocs(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const createDoc = async (doc) => {
        try {
            const res = await createDocsRequest(doc);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteDoc = async (id) => {
        try {
            const res = await deleteDocsRequest(id);
            if (res.status === 204) setDocs(docs.filter((docs) => docs._id !== id));
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };

    const getDoc = async (id) => {
        try {
            const res = await getDocRequest(id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateDoc = async (id, doc) => {
        try {
            await updateDocsRequest(id, doc);
        } catch (error) {
            console.log(error);
        }
    };

    return(
        <DocsContext.Provider value={{ docs, createDoc, getDocs, deleteDoc, getDoc, updateDoc }}>
            {children}
        </DocsContext.Provider>
    );
}