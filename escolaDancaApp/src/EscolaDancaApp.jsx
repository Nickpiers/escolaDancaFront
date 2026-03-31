import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Home } from "./features/home/components/Home";
import { Login } from "./features/login/components/Login";
import { paths } from "./controllers/paths";
import { UserProvider } from "./UserContext";
import { AppLayout } from "./features/common/components/AppLayout";
import { Avisos } from "./features/avisos/components/Avisos";
import { DetalhesAvisos } from "./features/avisos/components/DetalhesAvisos";

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
            </Route>
            {/* Grupo com PrivateRoute sem BottomNavBar */}
            <Route
              path={paths.userDetalhesAvisos}
              element={<DetalhesAvisos />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};
