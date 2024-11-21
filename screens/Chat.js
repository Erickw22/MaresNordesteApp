import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, Alert, Platform, KeyboardAvoidingView } from 'react-native'; 
import { collection, addDoc, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore'; 
import { db, authentication } from '../firebase'; 

const ChatScreen = ({ route, navigation }) => {
  const { user } = route.params; // Recebe o usuário selecionado da navegação via parâmetros
  const [mensagens, setMensagens] = useState([]); // onde sera guardado as mensagens do chat
  const [input, setInput] = useState(''); // onde sera guardado o conteúdo do campo de input ao digitar algo

  /* Troca o titulo da tela com o nome e foto/avatar do usuário selecionado */
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image source={{ uri: user.avatarUrl }} style={styles.headerAvatar} /> 
          <Text style={styles.headerTitle}>{user.nome}</Text> 
        </View>
      ),
    });
  }, [navigation, user.nome]);

  /* Função para buscar as mensagens relacionadas ao usuário selecionado dentro do firestore database e o usuário autenticado */
  useEffect(() => {
    const q = query(collection(db, 'mensagens'), orderBy('timestamp', 'asc')); // Pega as mensagens por orden de envio igual whatsapp e outro aplicativos de mensagem
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() })) // Faz os dados fornecidos virar obejetos para ser armazenado no firestore database
        .filter(msg => 
          (msg.senderId === authentication.currentUser.uid && msg.recipientId === user.userUId) || 
          (msg.senderId === user.userUId && msg.recipientId === authentication.currentUser.uid)
        ); // Filtra as mensagens que são do usuário que esta logado ou para o usuário selecionado
      setMensagens(data); 
    });

    return () => unsubscribe(); 
  }, [user]);

  /* Função para enviar mensagem ao firestore database */
  const enviarMensagem = async () => {
    if (input) { // Verifica se há texto no campo de mensagem
      await addDoc(collection(db, 'mensagens'), {
        texto: input,
        senderId: authentication.currentUser.uid, // ID do usuário que esta enviando a mensagem
        recipientId: user.userUId, // ID do usuário que esta recebendo a mensagem
        timestamp: new Date(),
      });
      setInput(''); // Limpa o campo de texto no campo de mensagem após o envio 
    }
  };

  /* Função para excluir uma mensagem */
  const excluirMensagem = async (id) => {
    // Exibe um mensagem de confirmação antes de excluir
    Alert.alert('Excluir', 'Tem certeza que deseja excluir esta mensagem?', [
      { text: 'Cancelar', style: 'cancel' }, 
      {
        text: 'Excluir',
        style: 'destructive', 
        onPress: async () => {
          await deleteDoc(doc(db, 'mensagens', id)); // Exclui o documento da mensagem pelo ID dentro do firestore database
        }
      }
    ]);
  };

  /* Função para renderizar uma mensagem individual */
  const renderMessage = ({ item }) => {
    const isSentByCurrentUser = item.senderId === authentication.currentUser.uid; // Verifica se a mensagem foi enviada pelo usuário logado

    return (
      <View style={[styles.messageContainer, isSentByCurrentUser ? styles.messageSent : styles.messageReceived]}>
        {/* Exibe o Foto/avatar do outro usuário ao lado das mensagens recebidas */}
        {!isSentByCurrentUser && (
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
        )}
        <View style={styles.textContainer}>
          {/* Exibe o nome de quem envia a mensagem */}
          <Text style={[styles.userName, { color: isSentByCurrentUser ? '#fff' : '#000' }]}>
            {isSentByCurrentUser ? 'Você' : user.nome}
          </Text>
          {/* Exibe o texto da mensagem */}
          <Text style={[styles.messageText, { color: isSentByCurrentUser ? '#fff' : '#000' }]}>
            {item.texto}
          </Text>
        </View>
        {/* Botão para excluir mensagens enviadas pelo usuário logado */}
        {isSentByCurrentUser && (
          <TouchableOpacity onPress={() => excluirMensagem(item.id)}>
            <Text style={styles.deleteText}>Excluir</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}> 
      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Ajusta o comportamento do teclado dependendo da plataforma
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 70} // Offset para evitar sobreposição no iOS
        /* Se faz necessario pois cada tipo de sistema tem suas diferenças */
      >

        {/* Lista de mensagens */}
        <FlatList
          data={mensagens} // Array de mensagens
          keyExtractor={item => item.id} // Identificador único para cada mensagem
          renderItem={renderMessage} // Função que renderiza cada item da lista (mensagem)
          contentContainerStyle={styles.list} 
        />
        {/* campo para digitar e enviar nova mensagem */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={input} 
            onChangeText={setInput} 
            placeholder="Digite sua mensagem..." 
          />
          <TouchableOpacity onPress={enviarMensagem} style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Enviar</Text> 
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  /* Container principal da tela */
  container: {
    flex: 1, // Ocupa todo o espaço disponível
    padding: 10, // Padding interno de 10
    backgroundColor: '#fff', // Cor de fundo branco
  },

  /* Container do cabeçalho (header), organiza avatar e título em linha */
  headerContainer: {
    flexDirection: 'row', // Organiza os elementos (avatar e título) em linha
    alignItems: 'center', // Alinha verticalmente ao centro
  },

  /* Estilo para o avatar no cabeçalho */
  headerAvatar: {
    width: 30, // Largura do avatar
    height: 30, // Altura do avatar
    borderRadius: 15, // Torna o avatar circular
    marginRight: 10, // Espaço à direita do avatar
  },

  /* Estilo do título do cabeçalho */
  headerTitle: {
    fontSize: 18, // Tamanho da fonte do título
    fontWeight: 'bold', // Texto em negrito
    color: '#fff', // Cor do texto (cinza escuro)
  },

  /* Lista de mensagens com padding extra na parte inferior */
  list: {
    paddingBottom: 20, // Espaço adicional no final da lista
  },

  /* Container de cada mensagem, com flexbox para organizar a direção e alinhamento */
  messageContainer: {
    flexDirection: 'row', // Organiza os elementos em linha (avatar e mensagem)
    alignItems: 'flex-end', // Alinha verticalmente no final (base)
    marginBottom: 10, // Espaço entre as mensagens
    maxWidth: '80%', // Limita a largura da mensagem a 80% da tela
  },

  /* Estilo para mensagens enviadas pelo usuário (lado direito) */
  messageSent: {
    alignSelf: 'flex-end', // Alinha à direita
    backgroundColor: '#5293A8', // Fundo azul
    borderRadius: 10, // Bordas arredondadas
    padding: 10, // Padding interno da mensagem
    marginLeft: 30, // Espaço à esquerda da mensagem
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 2, // Raio da sombra
      },
      android: {
        elevation: 5, // Sombra no Android
      },
    }),
  },

  /* Estilo para mensagens recebidas (lado esquerdo) */
  messageReceived: {
    alignSelf: 'flex-start', // Alinha à esquerda
    backgroundColor: '#e0e0e0', // Fundo cinza claro
    borderRadius: 10, // Bordas arredondadas
    padding: 10, // Padding interno da mensagem
    marginRight: 30, // Espaço à direita da mensagem
    ...Platform.select({
      ios: {
        shadowColor: '#000', // Sombra no iOS
        shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
        shadowOpacity: 0.2, // Opacidade da sombra
        shadowRadius: 2, // Raio da sombra
      },
      android: {
        elevation: 5, // Sombra no Android
      },
    }),
  },

  /* Estilo do avatar ao lado das mensagens */
  avatar: {
    width: 40, // Largura do avatar
    height: 40, // Altura do avatar
    borderRadius: 20, // Torna o avatar circular
    marginRight: 10, // Espaço à direita do avatar
  },

  /* Container para o texto da mensagem e nome do usuário */
  textContainer: {
    flexDirection: 'column', // Organiza os elementos (nome e mensagem) em coluna
  },

  /* Estilo para o nome do usuário */
  userName: {
    fontSize: 12, // Tamanho da fonte do nome
    fontWeight: 'bold', // Texto em negrito
    marginBottom: 5, // Espaço abaixo do nome
  },

  /* Estilo para o texto da mensagem */
  messageText: {
    fontSize: 16, // Tamanho da fonte do texto da mensagem
  },

  /* Container do input de mensagem, junto com o botão de envio */
  inputContainer: {
    flexDirection: 'row', // Organiza o campo de texto e o botão em linha
    alignItems: 'center', // Alinha verticalmente ao centro
    marginTop: 10, // Espaço acima do campo de input
    paddingBottom: 10, // Padding na parte inferior para ficar acima da barra de navegação
  },

  /* Estilo para o campo de input de texto */
  input: {
    flex: 1, // Ocupa todo o espaço restante na linha
    borderWidth: 1, // Largura da borda
    borderColor: '#215678', // Cor da borda (azul)
    borderRadius: 5, // Bordas arredondadas
    padding: 10, // Padding interno do campo
    marginRight: 10, // Espaço à direita do campo de input
  },

  /* Estilo para o botão de envio de mensagem */
  sendButton: {
    backgroundColor: '#215678', // Cor de fundo do botão
    borderRadius: 20, // Bordas arredondadas
    padding: 10, // Padding interno do botão
  },

  /* Estilo para o texto dentro do botão de envio */
  sendButtonText: {
    color: '#fff', // Cor do texto (branco)
    fontWeight: 'bold', // Texto em negrito
  },

  /* Estilo para o texto de exclusão (delete) */
  deleteText: {
    color: 'red', // Cor do texto (vermelho)
    fontSize: 12, // Tamanho da fonte do texto
    marginLeft: 10, // Espaço à esquerda do texto
  },
});
