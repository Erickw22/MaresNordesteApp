import { Pressable, Text, TextInput, View, TouchableOpacity } from 'react-native'; 
import styles from '../styles/styles'; 
import React, { useEffect, useState } from 'react'; 
import { Input, Button } from 'react-native-elements'; 
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'; 
import { authentication } from '../firebase';
import * as Animatable from 'react-native-animatable'; 

const Login = ({ navigation }) => {
    const [email, setEmail] = useState(''); // onde sera guardado o email do usuário
    const [senha, setSenha] = useState(''); // onde sera guardado a senha do usuário

    // Função para navegar para a tela de recuperação de senha
    const mudanca = () => {
      navigation.navigate('Mudanca'); 
    };

    // Função de login de usuário usando Firebase
    const loginUser = async () => {
      signInWithEmailAndPassword(authentication, email, senha) // Função do Firebase para login com email e senha
        .then((userCredential) => {
          const user = userCredential.user; // Se o login for bem-sucedido, retorna o usuário autenticado de dentro do firestore database
          // Navega para o componente HomeTabs após o login bem-sucedido
          navigation.navigate('HomeTabs'); 
        })
        .catch((error) => {
          const errorMessage = error.message; // Captura o erro em caso de falha no login
          alert('É necessário estar cadastrado para realizar o login',{errorMessage}); // Exibe um alerta se houver erro
        });
    };

  return (
    <View style={styles.container}>
      {/* Animação de fadeInLeft no texto de boas-vindas */}
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-Vindo(a)</Text> 
      </Animatable.View>

      {/* Animação de fadeInUp no formulário de login */}
      <Animatable.View animation='fadeInUp' style={styles.containerForm}>
        
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder='Digite seu email...'
          keyboardAppearance='light'
          keyboardType='email-address' 
          style={styles.input}
          value={email} 
          onChangeText={text => setEmail(text)} 
        />

        
        <Text style={styles.title}>Senha</Text>
        <TextInput
          placeholder='Senha'
          style={styles.input}
          value={senha}
          onChangeText={text => setSenha(text)} 
          secureTextEntry 
        />

        {/* Botão de login */}
        <TouchableOpacity onPress={loginUser} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={styles.buttonRegister}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastrar-se</Text>
        </TouchableOpacity>

    
        <TouchableOpacity onPress={mudanca} style={styles.buttonRegister}>
          <Text style={styles.registerText}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

export default Login;
