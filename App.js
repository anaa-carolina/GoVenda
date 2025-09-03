import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { AntDesign, Feather } from '@expo/vector-icons';

export default function App() {
  const [preco, setPreco] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [codigoPagamento, setCodigoPagamento] = useState('');
  const [resultado, setResultado] = useState(null);
  const [showExplanationScreen, setShowExplanationScreen] = useState(false);

  const calcularVenda = () => {
    if (!preco || !quantidade || !codigoPagamento) {
      Alert.alert('Erro', 'Preencha todos os campos para calcular.');
      return;
    }

    const valorPreco = parseFloat(preco);
    const valorQuantidade = parseInt(quantidade);
    const codigo = codigoPagamento.toLowerCase();

    if (isNaN(valorPreco) || isNaN(valorQuantidade)) {
      Alert.alert('Erro', 'Insira valores numéricos válidos para preço e quantidade.');
      return;
    }

    const valorCompra = valorPreco * valorQuantidade;
    let valorDesconto = 0;
    let valorFinal = valorCompra;
    let tipoPagamento = '';

    switch (codigo) {
      case '0':
        tipoPagamento = 'À Vista';
        valorDesconto = valorCompra * 0.25;
        valorFinal = valorCompra - valorDesconto;
        break;
      case '1':
        tipoPagamento = 'Cheque (30 dias)';
        valorDesconto = valorCompra * 0.20;
        valorFinal = valorCompra - valorDesconto;
        break;
      case '2':
        tipoPagamento = 'Cartão de Crédito (2x)';
        valorDesconto = valorCompra * 0.10;
        valorFinal = valorCompra - valorDesconto;
        break;
      case '3':
        tipoPagamento = 'Cartão de Crédito (3x)';
        valorDesconto = valorCompra * 0.05;
        valorFinal = valorCompra - valorDesconto;
        break;
      case 'outra':
        tipoPagamento = 'Negociada com Vendedor';
        valorDesconto = 0;
        valorFinal = valorCompra;
        break;
      default:
        Alert.alert('Erro', 'Código de pagamento inválido. Acesse o menu para ver as opções.');
        return;
    }

    setResultado({
      valorCompra: valorCompra.toFixed(2),
      valorDesconto: valorDesconto.toFixed(2),
      valorFinal: valorFinal.toFixed(2),
      tipoPagamento,
    });
  };

  if (showExplanationScreen) {
    return (
      <View style={styles.explanationContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowExplanationScreen(false)}>
            <Feather name="arrow-left" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Códigos de Pagamento</Text>
          <View style={{ width: 24 }} />
        </View>
        <ScrollView style={styles.explanationScroll}>
          <Text style={styles.explanationTitle}>Tabela de Descontos</Text>

          <View style={styles.tableRow}>
            <Text style={styles.tableHeader}>CÓDIGO</Text>
            <Text style={styles.tableHeader}>CONDIÇÃO DE PAGAMENTO</Text>
            <Text style={styles.tableHeader}>DESCONTO</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>0</Text>
            <Text style={styles.tableCell}>À Vista</Text>
            <Text style={styles.tableCell}>25%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>1</Text>
            <Text style={styles.tableCell}>Cheque (30 dias)</Text>
            <Text style={styles.tableCell}>20%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>2</Text>
            <Text style={styles.tableCell}>Cartão de Crédito (2x)</Text>
            <Text style={styles.tableCell}>10%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>3</Text>
            <Text style={styles.tableCell}>Cartão de Crédito (3x)</Text>
            <Text style={styles.tableCell}>5%</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>outra</Text>
            <Text style={styles.tableCell}>Negociada c/ Vendedor</Text>
            <Text style={styles.tableCell}>Sem desconto</Text>
          </View>
        </ScrollView>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => setShowExplanationScreen(true)}>
            <AntDesign name="menuunfold" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerText}>GoVendas</Text>
          <View style={{ width: 24 }} />
        </View>

        <View style={styles.fluxoDeCaixaContainer}>
          <Text style={styles.fluxoDeCaixaTitulo}>Fluxo de caixa líquido</Text>
          <Text style={styles.fluxoDeCaixaValor}>
            R$ {resultado ? resultado.valorFinal : '0,00'}
          </Text>
          <Text style={styles.fluxoDeCaixaDescricao}>
            Entenda como este valor é calculado.
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>VALOR DO PRODUTO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 50.00"
            keyboardType="numeric"
            value={preco}
            onChangeText={setPreco}
          />
          <Text style={styles.inputLabel}>QUANTIDADE</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 2"
            keyboardType="numeric"
            value={quantidade}
            onChangeText={setQuantidade}
          />
          <Text style={styles.inputLabel}>CÓDIGO DE PAGAMENTO</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: 0, 1, 2, 3 ou 'outra'"
            value={codigoPagamento}
            onChangeText={setCodigoPagamento}
            autoCapitalize="none"
          />
        </View>

        <TouchableOpacity style={styles.botao} onPress={calcularVenda}>
          <Text style={styles.textoBotao}>Calcular</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.resultadosContainer}>
            <View style={styles.detalhe}>
              <Text style={styles.detalheLabel}>Valor da Compra</Text>
              <Text style={styles.detalheValor}>R$ {resultado.valorCompra}</Text>
            </View>
            <View style={styles.detalhe}>
              <Text style={styles.detalheLabel}>Desconto ({resultado.tipoPagamento})</Text>
              <Text style={styles.detalheValor}>-R$ {resultado.valorDesconto}</Text>
            </View>
            <View style={styles.detalhe}>
              <Text style={styles.detalheLabel}>VALOR TOTAL A PAGAR</Text>
              <Text style={styles.detalheValorFinal}>R$ {resultado.valorFinal}</Text>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  fluxoDeCaixaContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  fluxoDeCaixaTitulo: {
    fontSize: 16,
    color: '#888',
  },
  fluxoDeCaixaValor: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 5,
  },
  fluxoDeCaixaDescricao: {
    fontSize: 12,
    color: '#bbb',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  botao: {
    backgroundColor: '#8f42f4ff',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  textoBotao: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultadosContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detalhe: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    paddingBottom: 5,
  },
  detalheLabel: {
    fontSize: 14,
    color: '#555',
  },
  detalheValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  detalheValorFinal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4285F4',
  },
  explanationContainer: {
    flex: 1,
    backgroundColor: '#F7F8FA',
    paddingHorizontal: 20,
  },
  explanationScroll: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  explanationTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableHeader: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#555',
    flex: 1,
    textAlign: 'center',
  },
  tableCell: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
});