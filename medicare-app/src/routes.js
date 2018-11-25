import { createStackNavigator } from 'react-navigation';

import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Principal from './pages/principal';

import RealizarPedido from './pages/pedido/realizarPedido';
import PedidosUsuario from './pages/pedido/pedidosUsuario';
import ExibirPedido from './pages/pedido/exibirPedido';

import RealizarDoacao from './pages/doacao/realizarDoacao';
import DoacoesUsuario from './pages/doacao/doacoesUsuario';
import ExibirDoacao from './pages/doacao/exibirDoacao';

const Routes = createStackNavigator({
  Login,
  Cadastro,
  Principal,
  RealizarDoacao,
  RealizarPedido,
  ExibirPedido,
  DoacoesUsuario,
  PedidosUsuario,
  ExibirDoacao
});

export default Routes;
