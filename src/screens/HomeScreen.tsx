import React, { useContext } from 'react';
import { View, Text, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FinanceContext } from '../context/FinanceContext';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

const HomeScreen = ({ navigation }: any) => {
  const financeContext = useContext(FinanceContext);

  if (!financeContext) return null;

  const { ganhos, gastos, total, adicionarGanho, adicionarGasto, setGanhos, setGastos } = financeContext;

  const handleDeleteGanho = (id: number) => {
    setGanhos(ganhos.filter(ganho => ganho.id !== id));
  };

  const handleDeleteGasto = (id: number) => {
    setGastos(gastos.filter(gasto => gasto.id !== id));
  };

  const data = [
    {
      name: 'Ganhos',
      amount: ganhos.reduce((acc, item) => acc + item.valor, 0),
      color: 'green',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Gastos',
      amount: gastos.reduce((acc, item) => acc + item.valor, 0),
      color: 'red',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.total}>Total: R$ {total}</Text>

      <PieChart
        data={data}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor={'amount'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        absolute
      />

      <Button title="Adicionar Ganho" onPress={() => navigation.navigate('AdicionarGanho')} />
      <Button title="Adicionar Gasto" onPress={() => navigation.navigate('AdicionarGasto')} />

      <Text style={styles.historyTitle}>Histórico de Ganhos</Text>
      {ganhos.length > 0 ? (
        <ScrollView style={styles.historyContainer}>
          {ganhos.map(ganho => (
            <View key={ganho.id} style={styles.historyItem}>
              <Text>{ganho.descricao}: R$ {ganho.valor.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => handleDeleteGanho(ganho.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Nenhum ganho registrado.</Text>
      )}

      <Text style={styles.historyTitle}>Histórico de Gastos</Text>
      {gastos.length > 0 ? (
        <ScrollView style={styles.historyContainer}>
          {gastos.map(gasto => (
            <View key={gasto.id} style={styles.historyItem}>
              <Text>{gasto.descricao}: R$ {gasto.valor.toFixed(2)}</Text>
              <TouchableOpacity onPress={() => handleDeleteGasto(gasto.id)}>
                <Text style={styles.deleteButton}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text>Nenhum gasto registrado.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  total: {
    fontSize: 24,
    marginBottom: 20,
  },
  historyTitle: {
    fontSize: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  historyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    borderRadius: 5,
    padding: 10,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  deleteButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
