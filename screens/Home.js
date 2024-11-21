import React, { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, ScrollView, Image } from 'react-native';
import { db } from '../firebase';
import { collection, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import styles from '../styles/styles'; 

export default function Home({ navigation }) {
    const [posts, setPosts] = useState([]); // onde sera guardado todos os posts 

    // Função para buscar todos os posts armazenados dentro do firestore database
    const fetchPosts = () => {
        const postsRef = collection(db, "posts"); // Referência à coleção "posts" no firestore database

        // Escuta em tempo real para alterações na coleção de posts dentro do firestore database
        const unsubscribe = onSnapshot(postsRef, (querySnapshot) => {
            const allPosts = [];
            querySnapshot.forEach((doc) => {
                allPosts.push({ id: doc.id, ...doc.data() }); // Armazena cada post com seu ID no firestore database
            });

            setPosts(allPosts); 
        }, (error) => {
            console.error("Erro ao buscar posts: ", error); 
        });
        return unsubscribe;
    };

    // useEffect para buscar e mostrar os posts assim que o componente é montado
    useEffect(() => {
        const unsubscribe = fetchPosts(); 

        return () => {
            unsubscribe();
        };
    }, []);

    // Função para remover um post com base no ID do post
    const removePost = async (id) => {
        try {
            const postDocRef = doc(db, "posts", id); 
            await deleteDoc(postDocRef); // Faz a exclusão do post no firestore database
            console.log(`Post with id ${id} removed!`); // Confirma a remoção no console na versão web
        } catch (error) {
            console.error("Erro ao remover post: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.container1}>
            <ScrollView>
                {/* Título da página */}
                <Text style={styles.title}>Últimos Posts</Text>
                
                {/* Carrega os posts */}
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <View key={post.id} style={styles.postContainer}>
                            {/* Exibe a imagem do post, se houver */}
                            {post.image && (
                                <Image source={{ uri: post.image }} style={styles.postImage} />
                            )}
                            {/* Exibe o título, autor e descrição do post */}
                            <Text style={styles.postTitle}>{post.title}</Text>
                            <Text style={styles.postAuthor}>{post.author}</Text>
                            <Text style={styles.postDescription}>{post.description}</Text>

                            {/* Botão para excluir o post */}
                            <Button 
                                title="Excluir Post" 
                                onPress={() => removePost(post.id)} 
                                color="#30687A" 
                            />
                        </View>
                    ))
                ) : (
                    <Text style={styles.postDescription}>Nenhum post disponível.</Text> // Mensagem caso não haja posts
                )}
            </ScrollView>
        </SafeAreaView>
    );
}
