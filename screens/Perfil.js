import React, { useEffect, useState } from "react"; 
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native"; 
import { authentication, db } from "../firebase"; 
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore"; 
import { signOut } from "firebase/auth"; 
import styles from "../styles/styles"; 

export default function Perfil({ navigation }) {
  const [nome, setNome] = useState(""); // onde sera guardado o nome do usuário
  const [photoURL, setPhotoURL] = useState(""); // onde sera guardado a URL da foto do usuário
  const [posts, setPosts] = useState([]); // onde sera guardado os posts do usuário

  // Função para buscar os dados do usuário no firestore database
  const fetchUserData = async () => {
    const userId = authentication?.currentUser?.uid; // Obtém o ID do usuário logado
    const docRef = doc(db, "users", userId); // Referência ao documento do usuário na coleção "users"
    const docSnap = await getDoc(docRef); // Obtém o documento do firestore database

    if (docSnap.exists()) {
      setNome(docSnap.data().nome); 
      setPhotoURL(docSnap.data().avatarUrl); 
    } else {
      console.log("Usuário não encontrado"); 
    }
  };

  // Função para escutar os posts do usuário em tempo real
  const fetchUserPosts = () => {
    const userId = authentication?.currentUser?.uid; // Obtém o ID do usuário logado que vem do firestore database
    const postsRef = collection(db, "posts"); // Referência à coleção de posts
    const q = query(postsRef, where("authorId", "==", userId)); // Consulta para filtrar posts pelo ID de quem postou

    // Escuta em tempo real para alterações nos posts do usuário
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const userPosts = [];
      querySnapshot.forEach((doc) => {
        userPosts.push({ id: doc.id, ...doc.data() }); // Armazena cada post no array userPosts
      });
      setPosts(userPosts); // Atualiza o estado com os posts do usuário guardados no firestore database
    }, (error) => {
      console.error("Erro ao buscar posts do usuário: ", error); 
    });

    
    return unsubscribe;
  };

  useEffect(() => {
    fetchUserData(); // Chama a função para buscar dados do usuário
    const unsubscribe = fetchUserPosts(); // Chama a função para buscar posts do usuário

    return () => {
      unsubscribe(); 
    };
  }, []); 

  // Função para deslogar o usuário
  const logout = async () => {
    try {
      await signOut(authentication); 
      navigation.navigate("Login"); 
    } catch (error) {
      console.error("Erro ao fazer logout:", error); 
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container2}
        contentContainerStyle={{
          justifyContent: "center", 
          alignItems: "center", 
        }}
        showsVerticalScrollIndicator={false} 
      >
        {/* Exibe a imagem do usuário, usando uma imagem de placeholder se não houver URL */}
        <Image
          style={styles.userImg}
          source={photoURL ? { uri: photoURL } : require("../assets/placeholder.png")}
        />
        {/* Exibe o nome do usuário */}
        <Text style={styles.userName}>Nome: {nome}</Text>
        <Text style={styles.aboutUser}>Garoto de programação</Text>

        {/* Botão para criar um novo post */}
        <TouchableOpacity
          style={styles.createPostButton}
          onPress={() => navigation.navigate("CreatePost")}
        >
          <Text style={styles.createPostButtonText}>Criar Post</Text>
        </TouchableOpacity>

        <Text style={styles.userInfoTitle}>Posts Criados:</Text>
        {posts.length > 0 ? (
          // Se o usuário tem posts, exibe cada um
          posts.map((post) => (
            <View key={post.id} style={styles.postCard}>
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postDescription}>{post.description}</Text>
              {post.image && (
                <Image
                  source={{ uri: post.image }}
                  style={styles.postImage}
                />
              )}
            </View>
          ))
        ) : (
          // Mensagem para quando o usuário não tem posts
          <Text style={styles.userInfoSubTitle}>Nenhum post criado ainda.</Text>
        )}

        {/* Botões de navegação para Home e sair */}
        <View style={styles.userBtnWrapper}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => navigation.navigate("Home")}
          >
            <Text style={styles.userBtnTxt}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userBtn} onPress={logout}>
            <Text style={styles.userBtnTxt}>Sair</Text>
          </TouchableOpacity>
        </View>

        {/* Informações adicionais do usuário (pontos, trocas e mensagens) */}
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>500</Text>
            <Text style={styles.userInfoSubTitle}>Pontos</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>15</Text>
            <Text style={styles.userInfoSubTitle}>Trocas</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>10</Text>
            <Text style={styles.userInfoSubTitle}>Mensagens</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
