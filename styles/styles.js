import { Platform, StyleSheet } from "react-native";
import { color } from "react-native-elements/dist/helpers";

/* Componentes de estilização das telas */

const styles = StyleSheet.create({
  /* Container padrão com cor de fundo do aplicativo */
  container: {
    flex: 1,
    backgroundColor: "#215678", // Cor de fundo principal
  },

  /* Container da animação das telas de Login e Cadastro */
  container1: {
    flex: 1,
    backgroundColor: "#fff", // Fundo branco
    paddingTop: Platform.OS === "ios" ? 20 : 0, // Margem superior para iOS
  },

  /* Estilização da tela Home */
  /* Container dos Posts criados pelos usuários */
  postContainer: {
    backgroundColor: "#f9f9f9", // Fundo do post
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 20, // Espaço abaixo de cada post
    marginTop: 20, // Espaço acima do primeiro post
    padding: 15, // Espaçamento interno
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  /* Imagem do post */
  postImage: {
    width: "100%", // Largura total do container
    height: 200, // Altura da imagem
    borderRadius: 10, // Bordas arredondadas
  },

  /* Título do post */
  postTitle: {
    fontSize: 20, // Tamanho da fonte
    fontWeight: "bold", // Fonte em negrito
    marginTop: 10, // Espaço acima do título
    color: "#333", // Cor do texto
  },

  /* Nome do autor do post */
  postAuthor: {
    fontSize: 14, // Tamanho da fonte
    color: "#777", // Cor do texto
    marginBottom: 5, // Espaço abaixo do nome
  },

  /* Descrição do post */
  postDescription: {
    fontSize: 16, // Tamanho da fonte
    color: "#666", // Cor do texto
    marginBottom: 10, // Espaço abaixo da descrição
  },

  /* Estilização das telas de Login e Cadastro */
  containerHeaderCadastro: {
    marginTop: "5%", // Margem superior
    marginBottom: "8%", // Margem inferior
    paddingStart: "5%", // Padding no início
  },
  containerForm: {
    backgroundColor: "#fff", // Fundo branco
    flex: 1,
    borderTopLeftRadius: 25, // Bordas arredondadas na parte superior esquerda
    borderTopRightRadius: 25, // Bordas arredondadas na parte superior direita
    paddingStart: "5%", // Padding no início
    paddingEnd: "5%", // Padding no fim
  },
  containerHeader: {
    marginTop: "35%", // Margem superior
    marginBottom: "8%", // Margem inferior
    paddingStart: "5%", // Padding no início
  },
  buttonRegister: {
    marginTop: 14, // Margem superior
    alignSelf: "center", // Centraliza o botão horizontalmente
  },
  button: {
    backgroundColor: "#215678", // Cor de fundo do botão
    width: "100%", // Largura total
    borderRadius: 20, // Bordas arredondadas
    paddingVertical: 8, // Padding vertical
    marginTop: 14, // Margem superior
    justifyContent: "center", // Centraliza verticalmente
    alignItems: "center", // Centraliza horizontalmente
  },
  buttonText: {
    color: "#fff", // Cor do texto
    fontSize: 18, // Tamanho da fonte
    fontWeight: "bold", // Negrito
  },
  title: {
    fontSize: 20, // Tamanho da fonte
    marginTop: 28, // Margem superior
  },
  message: {
    fontSize: 28, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    color: "#fff", // Cor do texto
  },
  input: {
    borderBottomWidth: 1, // Borda inferior
    height: 40, // Altura do input
    marginBottom: 12, // Margem inferior
    fontSize: 16, // Tamanho da fonte
  },
  registerText: {
    color: "#a1a1a1", // Cor do texto
  },

  /* Estilização da tela Perfil */
  container2: {
    flex: 1,
    backgroundColor: "#fff", // Fundo branco
  },
  userImg: {
    height: 150, // Altura da imagem
    width: 150, // Largura da imagem
    borderRadius: 75, // Torna a imagem circular
    marginTop: 50, // Margem superior
  },
  userName: {
    fontSize: 22, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    marginTop: 10, // Margem superior
    color: "#333", // Cor do texto
  },
  aboutUser: {
    fontSize: 16, // Tamanho da fonte
    color: "#666", // Cor do texto
    textAlign: "center", // Alinha o texto ao centro
    marginBottom: 20, // Margem inferior
  },
  userBtnWrapper: {
    flexDirection: "row", // Alinha os botões horizontalmente
    justifyContent: "center", // Centraliza os botões horizontalmente
    width: "100%", // Largura total
    marginTop: 10, // Margem superior
  },
  userBtn: {
    borderColor: "#30687A", // Cor da borda
    borderWidth: 2, // Largura da borda
    borderRadius: 10, // Bordas arredondadas
    paddingVertical: 8, // Padding vertical
    paddingHorizontal: 20, // Padding horizontal
    marginHorizontal: 10, // Margem horizontal
  },
  userBtnTxt: {
    color: "#215678", // Cor do texto
  },
  userInfoWrapper: {
    flexDirection: "row", // Alinha as informações do usuário horizontalmente
    justifyContent: "space-around", // Espaço entre os itens
    width: "100%", // Largura total
    marginVertical: 20, // Margem vertical
  },
  userInfoItem: {
    justifyContent: "center", // Centraliza verticalmente
  },
  userInfoTitle: {
    fontSize: 20, // Tamanho da fonte
    fontWeight: "bold", // Negrito
    color: "#333", // Cor do texto
    textAlign: "center", // Alinha o texto ao centro
  },
  userInfoSubTitle: {
    fontSize: 14, // Tamanho da fonte
    color: "#666", // Cor do texto
    textAlign: "center", // Alinha o texto ao centro
  },
  createPostButton: {
    backgroundColor: "#215678", // Cor de fundo do botão
    padding: 15, // Padding interno
    borderRadius: 30, // Bordas arredondadas
    alignItems: "center", // Centraliza o conteúdo do botão
    marginVertical: 20, // Margem vertical
  },
  createPostButtonText: {
    color: "#fff", // Cor do texto
    fontSize: 16, // Tamanho da fonte
    fontWeight: "bold", // Negrito
  },

  /* Estilização do card de posts do usuário na tela Perfil */
  postCard: {
    backgroundColor: "#f9f9f9", // Fundo do card
    borderRadius: 10, // Bordas arredondadas
    padding: 15, // Padding interno
    marginVertical: 10, // Margem vertical
    elevation: 2, // Sombra no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postTitle: {
    fontSize: 18, // Tamanho da fonte do título
    fontWeight: "bold", // Negrito
    color: "#333", // Cor do texto
    marginBottom: 5, // Margem inferior
  },
  postDescription: {
    fontSize: 16, // Tamanho da fonte da descrição
    color: "#444", // Cor do texto
  },
  postImage: {
    width: "100%", // Largura total
    height: 200, // Altura da imagem
    borderRadius: 10, // Bordas arredondadas
    marginBottom: 10, // Margem inferior
  },
  centerText: {
    fontSize: 18,
    padding: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default styles;
