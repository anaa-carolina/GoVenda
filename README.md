# GoVendas

## 📝 Sobre o Projeto

Este é um aplicativo móvel desenvolvido em **React Native** que funciona como uma calculadora de vendas. Ele permite ao usuário calcular o valor final de uma compra aplicando descontos dinâmicos com base na forma de pagamento escolhida, de acordo com uma tabela de regras pré-definida.

O projeto foi criado para demonstrar o uso de:
- **`useState`**: para gerenciar o estado dos dados na interface.
- **Componentes React Native**: como `View`, `Text`, `TextInput` e `TouchableOpacity`.
- **Lógica de Negócios**: para calcular descontos com base em condições específicas.
- **Navegação Simples**: usando renderização condicional para alternar entre a tela principal e a tela de ajuda.
- **Estilização**: com `StyleSheet` para criar uma interface limpa e moderna, inspirada em aplicativos de gestão financeira.

## ✨ Funcionalidades

- **Cálculo de Vendas**: Insira o valor do produto e a quantidade para obter o total da compra.
- **Descontos Automáticos**: Aplica descontos percentuais com base no código da forma de pagamento.
- **Tela de Ajuda**: Um menu lateral (ícone de hambúrguer) exibe uma tabela detalhada dos códigos de pagamento e seus respectivos descontos.
- **Interface Intuitiva**: Design minimalista e fácil de usar, com um resumo claro do cálculo (valor total, desconto e valor final).

## 🚀 Instalação e Execução

Para rodar este aplicativo em seu ambiente de desenvolvimento, siga os passos abaixo.

### Pré-requisitos

Certifique-se de que você tem o [Node.js](https://nodejs.org/) e o [Expo CLI](https://docs.expo.dev/get-started/installation/) instalados em sua máquina.

```bash
# Se você ainda não tem o Expo CLI instalado
npm install -g expo-cli

# Clone o repositório
git clone [https://github.com/anaa-carolina/GoVenda] (https://github.com/anaa-carolina/GoVenda )

# Navegue até o diretório
cd GoVendas

# Instale as dependências
npm install

# Execute o projeto
npm start
