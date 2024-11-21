import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { db, authentication } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const RewardsScreen = () => {
  const [points, setPoints] = useState(0);
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Cupom Ifood - 10% OFF', cost: 100 },
    { id: 2, name: 'Desconto Americanas - R$20', cost: 200 },
    { id: 3, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 4, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 5, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 6, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 7, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 8, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 9, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 10, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 11, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 12, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 13, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 14, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 15, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 16, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 17, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    { id: 18, name: 'Cupom Quiosque longa-vida - R$10', cost: 150 },
    // Adicionar mais opções de trocas seguindo o esquema dos acima
  ]);

  useEffect(() => {
    const fetchPoints = async () => {
      const user = authentication.currentUser;
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setPoints(userDocSnap.data().points || 0);
        }
      }
    };
    fetchPoints();
  }, []);

  const handleRedeem = async (reward) => {
    if (points >= reward.cost) {
      const newPoints = points - reward.cost;
      const user = authentication.currentUser;
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { points: newPoints });
      setPoints(newPoints);
      alert(`Você trocou ${reward.cost} pontos por ${reward.name}`);
    } else {
      alert('Pontos insuficientes para essa troca, selecione outra opção!');
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.couponContainer} onPress={() => handleRedeem(item)}>
      <Text style={styles.couponName}>{item.name}</Text>
      <Text style={styles.couponCost}>{item.cost} pontos</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.pointsText}>Pontos disponíveis: {points}</Text>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    backgroundColor: '#f8f8f8',
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#215678',
  },
  couponContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  couponName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#215678',
  },
  couponCost: {
    fontSize: 14,
    color: '#333333',
    marginTop: 5,
  },
});

export default RewardsScreen;
