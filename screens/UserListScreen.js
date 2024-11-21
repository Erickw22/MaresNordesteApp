import React, { useEffect, useState } from 'react'; 
import { View, FlatList, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native'; 
import { collection, onSnapshot } from 'firebase/firestore'; 
import { db, authentication } from '../firebase'; 

// const que serve para mostra uma lista de usuários registrados
const UserListScreen = ({ navigation }) => {
  const [usuarios, setUsuarios] = useState([]); // onde sera guardado a lista de usuários

  //useEffect para buscar todos os usuários registrados
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map(user => ({ id: user.id, ...user.data() }));
      // Filtra o usuário logado para não aparecer na lista
      setUsuarios(data.filter(user => user.userUId !== authentication.currentUser.uid));
    });

    return () => unsubscribe();
  }, []);

  // Função para renderizar cada usuário na lista
  const renderUser = ({ item }) => (
    <TouchableOpacity onPress={() => handleUserSelect(item)} style={styles.userContainer}>
      <Image source={{ uri: item.avatarUrl }} style={styles.userImage} />
      <View style={styles.userInfo}>
        {/* Exibe o nome do usuário */}
        <Text style={styles.userName}>{item.nome}</Text>
        {item.status && ( // Renderiza o status do usuário, se disponível
          <Text style={styles.userStatus}>{item.status}</Text>
        )}
      </View>
    </TouchableOpacity>
  );

  // Função que é chamada quando um usuário é selecionado
  const handleUserSelect = (user) => {
    navigation.navigate('Chat', { user }); 
  };

  
  return (
    <SafeAreaView style={styles.container}>
      {/* Lista de usuários com um FlatList */}
      <FlatList
        data={usuarios} // Dados que serão renderizados
        keyExtractor={item => item.userUId} 
        renderItem={renderUser} // Função de renderização para cada item
        contentContainerStyle={styles.list} 
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  /* Container principal da tela */
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    padding: 10, // Padding interno de 10
    backgroundColor: '#F5F5F5', // Cor de fundo cinza claro
  },

  /* Lista com padding extra na parte inferior */
  list: {
    paddingBottom: 20, // Espaço adicional no final da lista
  },

  /* Container para cada item de usuário na lista */
  userContainer: {
    flexDirection: 'row', // Organiza o conteúdo em linha (imagem e informações do usuário lado a lado)
    alignItems: 'center', // Alinha verticalmente ao centro
    padding: 15, // Padding interno de 15
    borderBottomWidth: 1, // Borda inferior para separar itens
    borderBottomColor: '#E0E0E0', // Cor da borda inferior
    backgroundColor: '#FFFFFF', // Fundo branco
    borderRadius: 10, // Bordas arredondadas
    marginVertical: 5, // Margem vertical entre os itens
  },

  /* Estilo da imagem do usuário */
  userImage: {
    width: 50, // Largura da imagem
    height: 50, // Altura da imagem
    borderRadius: 25, // Torna a imagem circular
    marginRight: 15, // Espaço à direita da imagem
    borderWidth: 1, // Borda ao redor da imagem
    borderColor: '#E0E0E0', // Cor da borda ao redor da imagem
  },

  /* Container para as informações do usuário (nome e status) */
  userInfo: {
    flex: 1, // Ocupa o espaço restante na linha
  },

  /* Estilo do nome do usuário */
  userName: {
    fontSize: 18, // Tamanho da fonte do nome
    fontWeight: 'bold', // Texto em negrito
    color: '#333333', // Cor do texto (cinza escuro)
  },

  /* Estilo do status do usuário */
  userStatus: {
    fontSize: 14, // Tamanho da fonte do status
    color: '#888888', // Cor do texto (cinza mais claro)
  },
});


export default UserListScreen;
