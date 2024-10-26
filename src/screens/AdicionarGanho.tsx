import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { FinanceContext } from '../context/FinanceContext';

const AdicionarGanho = ({ navigation }: any) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const financeContext = useContext(FinanceContext);

  if (!financeContext) return null;

  const { adicionarGanho } = financeContext;

  const handleSubmit = () => {
    adicionarGanho(descricao, parseFloat(valor));
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Descrição do Ganho</Text>
      <TextInput value={descricao} onChangeText={setDescricao} style={{ borderWidth: 1, marginBottom: 10 }} />

      <Text>Valor</Text>
      <TextInput value={valor} onChangeText={setValor} keyboardType="numeric" style={{ borderWidth: 1, marginBottom: 10 }} />

      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
};

export default AdicionarGanho;
