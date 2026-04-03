import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "./features/home/components/Home";
import { Login } from "./features/login/components/Login";
import { paths } from "./controllers/paths";
import { UserProvider } from "./UserContext";
import { AppLayout } from "./features/common/components/AppLayout";
import { Avisos } from "./features/avisos/components/Avisos";
import { DetalhesAvisos } from "./features/avisos/components/DetalhesAvisos";
import { Pagamentos } from "./features/pagamentos/components/Pagamentos";
import { Perfil } from "./features/perfil/components/Perfil";
import { PagamentosEfetivar } from "./features/pagamentos/components/PagamentosEfetivar";
import { PagamentosComprovante } from "./features/pagamentos/components/PagamentosComprovante";

export const EscolaDancaApp = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to={paths.login} replace />} />
          <Route path={paths.login} element={<Login />} />

          <Route element={<PrivateRoute />}>
            {/* Grupo com PrivateRoute e com BottomNavBar */}
            <Route element={<AppLayout />}>
              <Route path={paths.userHome} element={<Home />} />
              <Route path={paths.userAvisos} element={<Avisos />} />
              <Route path={paths.userPagamentos} element={<Pagamentos />} />
              <Route path={paths.userPerfil} element={<Perfil />} />
            </Route>
            {/* Grupo com PrivateRoute sem BottomNavBar */}
            <Route
              path={paths.userDetalhesAvisos}
              element={<DetalhesAvisos />}
            />
            <Route
              path={paths.userPagamentosEfetivar}
              element={<PagamentosEfetivar />}
            />
            <Route
              path={paths.userPagamentosComprovante}
              element={<PagamentosComprovante />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
