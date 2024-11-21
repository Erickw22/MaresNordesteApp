import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import styles from "../styles/styles"; 
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth"; 
import { authentication, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import * as Animatable from 'react-native-animatable';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState(""); // onde sera guardado o nome do usuário
  const [email, setEmail] = useState(""); //  onde sera guardado o email do usuário
  const [senha, setSenha] = useState(""); //  onde sera guardado a senha do usuário
  const [fotoURL, setFotoUrl] = useState(""); // onde sera guardado a foto ou avatar do usuário

  /* Função que realiza o registro do usuário no Firebase */
  const registrar = async () => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(authentication, email, senha);
      const userUId = userCredentials.user.uid; 
      await setDoc(doc(db, 'users', userUId), {
        avatarUrl: fotoURL ? fotoURL : 'https://png.pngtree.com/png-vector/20190223/ourmid/pngtree-vector-avatar-icon-png-image_695765.jpg', 
        nome, 
        userUId, 
      });
      alert("Email cadastrado com sucesso!"); // Mostra uma mensagem de suceeso ao cadastrar um novo usuário
      navigation.navigate('Login'); // Vai para a tela de login após realizar o cadastro
    } catch (error) {
      alert("Erro ao cadastrar, tente novamente."); // Mostra uma mensagem de erro caso de erro ao inserir algum dado ou no servidor
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Comportamento ajustado para iOS e Android
      keyboardVerticalOffset={Platform.OS === "ios" ? 200 : 0} // Ajuste da posição vertical do teclado no iOS
      /* Se faz necessario pois cada tipo de sistema tem suas diferenças */
    >
      {/* Animação para a entrada do cabeçalho do formulário */}
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeaderCadastro}>
      </Animatable.View>

      {/* Animação para a entrada do formulário */}
      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        <Text style={styles.title}>Nome</Text>
        <TextInput
          placeholder='Digite seu Nome' 
          keyboardType="name-phone-pad" 
          style={styles.input} 
          value={nome}
          onChangeText={setNome}
        />

        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite seu Email'
          keyboardType="email-address" 
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Senha'
          style={styles.input}
          value={senha}
          onChangeText={setSenha} 
          secureTextEntry // Esconde o texto (senha) enquanto o usuário digita como forma de segurança
        />

        <Text style={styles.title}>Avatar ou foto</Text>
        <TextInput
          placeholder='Adicione uma foto com URL'
          keyboardType="url"
          style={styles.input}
          value={fotoURL}
          onChangeText={setFotoUrl}
        />

        {/* Botão para enviar o formulário de cadastro */}
        <TouchableOpacity onPress={registrar} style={styles.button}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </KeyboardAvoidingView>
  );
}
