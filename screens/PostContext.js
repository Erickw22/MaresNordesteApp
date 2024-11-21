import React, { createContext, useState } from 'react';

// Cria um contexto chamado PostContext para gerenciar o estado dos posts
export const PostContext = createContext();


export const PostProvider = ({ children }) => {
    // Estado para armazenar a lista de posts
    const [posts, setPosts] = useState([]);

    // Função para adicionar um novo post ao array
    const addPost = (newPost) => {
        setPosts((prevPosts) => [...prevPosts, newPost]); // Adiciona o novo post ao array existente no firestore database
    };

    // Função para remover um post pelo seu ID que vem do firestore database
    const removePost = (postId) => {
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== postId)); 
    };

    return (
        // Mostra os componentes filhos com os valores de posts, addPost e removePost
        <PostContext.Provider value={{ posts, addPost, removePost }}>
            {children} 
        </PostContext.Provider>
    );
};
