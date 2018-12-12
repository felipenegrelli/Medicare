import Dashboard from "views/Dashboard/Dashboard.jsx";
// import Notifications from "views/Notifications/Notifications.jsx";
// import Icons from "views/Icons/Icons.jsx";
// import Typography from "views/Typography/Typography.jsx";
// import TableList from "views/TableList/TableList.jsx";
import Pedidos from "views/Pedidos/Pedidos.jsx";
import Doacoes from "views/Doacoes/Doacoes.jsx";
import Medicamentos from "views/Medicamentos/Medicamentos.jsx";
import Usuarios from "views/Usuarios/Usuarios.jsx";
import Login from "views/Login/Login.jsx";
import NovoPedido from "views/NovoPedido/NovoPedido.jsx";
import NovaDoacao from "views/NovaDoacao/NovaDoacao.jsx";
import NovoMedicamento from "views/NovoMedicamento/NovoMedicamento.jsx";
import NovoUsuario from "views/NovoUsuario/NovoUsuario.jsx";

// import Maps from "views/Maps/Maps.jsx";
// import Upgrade from "views/Upgrade/Upgrade.jsx";
// import UserPage from "views/UserPage/UserPage.jsx";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Home",
    icon: "design_app",
    component: Dashboard
  },
  {
    path: "/pedidos",
    name: "Pedidos",
    icon: "files_paper",
    component: Pedidos
  },
  {
    path: "/doacoes",
    name: "Doações",
    icon: "emoticons_satisfied",
    component: Doacoes
  },
  {
    path: "/medicamentos",
    name: "Medicamentos",
    icon: "education_atom",
    component: Medicamentos
  },
  {
    path: "/usuarios",
    name: "Usuários",
    icon: "users_single-02",
    component: Usuarios
  },

  {
    path: "/login",
    name: "Login",
    icon: "files_paper",
    component: Login,
    invisible: true
  },
  {
    path: "/doacoes2/",
    name: "Exibir Doação",
    icon: "files_paper",
    component: Doacoes,
    invisible: true
  },
  {
    path: "/editar-medicamento",
    name: "Editar Medicamento",
    icon: "files_paper",
    component: Doacoes,
    invisible: true
  },
  {
    path: "/novo-pedido",
    name: "Novo Pedido",
    icon: "files_paper",
    component: NovoPedido,
    invisible: true
  },
  {
    path: "/nova-doacao",
    name: "Nova Doação",
    icon: "files_paper",
    component: NovaDoacao,
    invisible: true
  },
  {
    path: "/novo-medicamento",
    name: "Novo Medicamento",
    icon: "files_paper",
    component: NovoMedicamento,
    invisible: true
  },
  {
    path: "/novo-usuario",
    name: "Novo Usuário",
    icon: "files_paper",
    component: NovoUsuario,
    invisible: true
  },
  // { path: "/icons", name: "Icons", icon: "design_image", component: Icons },
  // { path: "/maps", name: "Maps", icon: "location_map-big", component: Maps },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "ui-1_bell-53",
  //   component: Notifications
  // },
  // {
  //   path: "/user-page",
  //   name: "User Profile",
  //   icon: "users_single-02",
  //   component: UserPage
  // },
  // {
  //   path: "/extended-tables",
  //   name: "Table List",
  //   icon: "files_paper",
  //   component: TableList
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: Typography
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: Upgrade
  // },
  { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashRoutes;
