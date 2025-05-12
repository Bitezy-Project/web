import { createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./pages/auth/routes";
import {Home} from "./pages/home/home";
import {Produtos} from "./pages/produtos/produtos";
import { Locais } from "./pages/locais/locais";
import { Educacional } from "./pages/educacional/educacional";
import { Receitas } from "./pages/receitas/receitas";
import { ListaReceitas } from "./pages/receitas/lista_receitas";
import { DetalhesReceita } from "./pages/receitas/detalhes_receita";
import { FeedbacksReceitas } from "./pages/receitas/feedbacks";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home /> // <- nova rota para home
  },
  
  {
    path: "/receitas",
    element: <Receitas />
  },
  {
    path: "/lista_receitas",
    element: <ListaReceitas />
  },
  {
    path: "/detalhes_receita",
    element: <DetalhesReceita />
  },
  {
    path: "/receitas/feedback",
    element: <FeedbacksReceitas />
  },
  {
    path: "/produtos",
    element: <Produtos />
  },
  {
    path: "/locais",
    element: <Locais />
  },
  {
    path: "/educacional",
    element: <Educacional />
  },
  {
    path: "/auth/*",
    element: <AuthRoutes />
  }
]);

