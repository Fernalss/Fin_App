import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { FinanceContext } from '../context/FinanceContext';

const AdicionarGasto = ({ navigation }: any) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const financeContext = useContext(FinanceContext);

  if (!financeContext) return null;

  const { adicionarGasto } = financeContext;

  const handleSubmit = () => {
    if (descricao.trim() === '' || valor.trim() === '') {
      alert('Por favor, preencha a descrição e o valor.');
      return;
    }

    adicionarGasto(descricao, parseFloat(valor));
    setDescricao('');
    setValor('');
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Descrição do Gasto</Text>
      <TextInput
        value={descricao}
        onChangeText={setDescricao}
        style={styles.input}
      />

      <Text>Valor</Text>
      <TextInput
        value={valor}
        onChangeText={setValor}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Adicionar" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default AdicionarGasto;
