import React, { useState } from 'react'; 
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 
import { authentication } from '../firebase'; 
import styles from '../styles/styles'; 

const Mudanca = ({ navigation }) => {
  const [email, setEmail] = useState(''); //onde sera guardado o email inserido pelo usuário

  // Função que trata o envio de email para redefinir a senha
  const handlePasswordReset = () => {
    // Verifica se o campo de email está vazio
    if (!email) {
      Alert.alert('Erro', 'Por favor, insira seu email.'); // Alerta o usuário se o campo estiver vazio
      return; 
    }

    // Firebase: envia o email de redefinição de senha
    sendPasswordResetEmail(authentication, email)
      .then(() => {
        // Exibe uma mensagem de sucesso ao usuário
        Alert.alert('Sucesso', 'Um link para redefinir sua senha foi enviado para o seu email.');
        navigation.goBack(); // Retorna à tela anterior após enviar o email
      })
      .catch(error => {
        console.error(error); 
        // Verifica se o erro é relacionado ao email não encontrado
        if (error.code === 'auth/user-not-found') {
          Alert.alert('Erro', 'Email não encontrado. Verifique se está correto.');
        } else {
          // Exibe uma mensagem genérica de erro
          Alert.alert('Erro', 'Ocorreu um erro ao tentar enviar o email de redefinição.');
        }
      });
  };

  return (
    <View style={styles.container}>
      
      <View style={styles.containerHeader}>
        <Text style={styles.message}>Redefinir Senha</Text>
      </View>

      
      <View style={styles.containerForm}>
        
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email} 
          onChangeText={setEmail} 
          keyboardType="email-address" 
        />

        
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Enviar Link de Redefinição</Text>
        </TouchableOpacity>

        
        <TouchableOpacity
          style={styles.buttonRegister}
          onPress={() => navigation.goBack()}>
          <Text style={styles.registerText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mudanca;
