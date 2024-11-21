import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { db, authentication } from '../firebase'; 
import { collection, addDoc, doc, getDoc } from 'firebase/firestore'; 
import { PostContext } from './PostContext'; 
import styles from '../styles/styles'; 

export default function CreatePost({ navigation }) {
    const { addPost } = useContext(PostContext); // Usa o contexto de posts para adicionar um novo post importando do PostContext os metodos
    const [title, setTitle] = useState(''); // onde sera guardado o título do post
    const [description, setDescription] = useState(''); // onde sera guardado a descrição do post
    const [image, setImage] = useState(''); // onde sera guardado a URL da imagem do post

    // Função responsável por criar um novo post
    const handleCreatePost = async () => {
        const user = authentication.currentUser; // Consegue o usuário logado puxando do sistema de autenticação do firebase

        if (!user) { // Verifica se o usuário está logado
            console.error("Nenhum usuário autenticado.");
            return; // Interrompe o processo se não houver usuário logado
        }

        try {
            // Busca os dados do usuário no firestore database com base no ID do usuário logado
            const userDocRef = doc(db, 'users', user.uid); 
            const userDocSnap = await getDoc(userDocRef); // Faz uma solicitação para obter o documento do usuário no firestore database

            let userName = 'Usuário Anônimo'; // Nome padrão se o usuário não tiver um nome registrado no firestore database

            if (userDocSnap.exists()) { // Verifica se os dados do usuário existem no firestore database
                userName = userDocSnap.data().nome; // Atribui o nome do usuário obtido do firestore database
            }

            // Cria um novo objeto post contendo os dados inseridos pelo usuário
            const newPost = {
                title, // Título do post
                description, // Descrição do post
                image, // URL da imagem do post caso deseje adcionar
                author: userName, // Nome do autor (vindo do firestore database)
                authorId: user.uid, // ID do autor (usuário logado)
                date: new Date().toLocaleDateString(), // Data da criação do post
            };

            // Adiciona o novo post à coleção "posts" no firestore database
            const docRef = await addDoc(collection(db, 'posts'), newPost);
            console.log('Post criado com ID: ', docRef.id); // Loga o ID do novo post

            // Chama a função `addPost` do contexto de posts, passando o novo post criado
            addPost({ id: docRef.id, ...newPost });

            // Redireciona de volta para a tela anterior após a criação do post
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao adicionar post: ", error); // Trata possíveis erros caso haja a necessidade de fazer o debug
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.containerForm}>
            <Text style={styles.label}>Título:</Text>
            <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle} 
                placeholder="Digite o título"
            />

            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={styles.input}
                value={description}
                onChangeText={setDescription} 
                placeholder="Digite a descrição"
                multiline // Permite múltiplas linhas de texto
            />


            <Text style={styles.label}>Imagem (URL):</Text>
            <TextInput
                style={styles.input}
                value={image}
                onChangeText={setImage} // Atualiza o estado `image`
                placeholder="Insira a URL da imagem"
            />

            {/* Botão para criar o post */}
            <TouchableOpacity style={styles.button} onPress={handleCreatePost}>
                <Text style={styles.buttonText}>Criar Post</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}
