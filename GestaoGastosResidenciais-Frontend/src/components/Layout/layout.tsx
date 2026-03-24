import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  DollarSign,
  FolderOpen,
  Users,
  BarChart2,
  PieChart,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { usarAutenticacao } from "../../contexts/authContext";

interface ItemMenu {
  rotulo: string;
  Icone: React.ElementType;
  caminho: string;
}

interface SecaoMenu {
  titulo: string;
  itens: ItemMenu[];
}

// ─── Menus ───────────────────────────────────────────────────────────────────
// Aqui fica as abas de navegação de cada página

const SECOES: SecaoMenu[] = [
  {
    titulo: "Geral",
    itens: [
      { rotulo: "Visão Geral",          Icone: LayoutDashboard, caminho: "/visaoGeral" },
      { rotulo: "Transações",           Icone: DollarSign,      caminho: "/transacoes" },
    ],
  },
  {
    titulo: "Cadastros",
    itens: [
      { rotulo: "Categorias",           Icone: FolderOpen, caminho: "/categorias" },
      { rotulo: "Pessoas",              Icone: Users,      caminho: "/pessoas" },
    ],
  },
  {
    titulo: "Relatórios",
    itens: [
      { rotulo: "Totais por Categoria", Icone: BarChart2, caminho: "/totaisPorCategoria" },
      { rotulo: "Totais por Pessoa",    Icone: PieChart,  caminho: "/totaisPorPessoa" },
    ],
  },
];

function ItemNavegacao({ rotulo, Icone, caminho }: ItemMenu) {
  return (
    <NavLink to={caminho} className={({ isActive }) => `nav-item ${isActive ? "nav-item--ativo" : ""}`}>
      {({ isActive }) => (
        <>
          <span className="nav-item__conteudo">
            <Icone size={20} className="nav-item__icone" />
            <span className="nav-item__rotulo">{rotulo}</span>
          </span>

          {isActive && <ChevronRight size={14} className="nav-item__seta" />}
        </>
      )}
    </NavLink>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────
// Aqui fica toda a parte de layout do sistema
// A construção da sidebar e a estilização dela

export function Layout() {
  const { logout } = usarAutenticacao();
  const navegar = useNavigate();

  function handleSair() {
    logout();
    navegar("/login", { replace: true });
  }

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: sans-serif; background: #f5f6f8; }

        .shell { display: grid; grid-template-columns: 240px 1fr; min-height: 100vh; }

        .sidebar {
          background: #fff;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          padding: 1.25rem 0;
          height: 100vh;
          position: sticky;
          top: 0;
          overflow-y: auto;
        }

        .secao { margin-bottom: 1.5rem; padding: 0 1rem; }

        .secao__titulo {
          font-size: 11px;
          font-weight: 500;
          color: #9ca3af;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 0.5rem;
        }

        .secao__lista { display: flex; flex-direction: column; gap: 2px; }

        .nav-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 6px;
          text-decoration: none;
          color: #6b7280;
          font-size: 13px;
          position: relative;
          transition: background 0.12s, color 0.12s;
        }

        .nav-item:hover { background: #f5f6f8; color: #111827; }

        .nav-item--ativo { background: #f1f3fb; color: #3b4fd5; }

        .nav-item__conteudo { display: flex; align-items: center; gap: 10px; }

        .nav-item__icone { color: #9ca3af; }

        .nav-item__rotulo { font-size: 13px; }

        .sidebar__rodape {
          margin-top: auto;
          padding: 1rem 1rem 0;
          border-top: 1px solid #f3f4f6;
        }

        .botao-sair {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 100%;
          padding: 8px 10px;
          border-radius: 6px;
          border: none;
          background: none;
          color: #9ca3af;
          font-size: 13px;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.12s, color 0.12s;
        }

        .botao-sair:hover { background: #fef2f2; color: #dc2626; }

        .conteudo { padding: 2rem 2.5rem; overflow-y: auto; }
      `}</style>

      <div className="shell">

        <aside className="sidebar">

          <div style={{ flex: 1 }}>
            {SECOES.map((secao) => (
              <div key={secao.titulo} className="secao">
                <h2 className="secao__titulo">{secao.titulo}</h2>
                <div className="secao__lista">
                  {secao.itens.map((item) => (
                    <ItemNavegacao key={item.caminho} {...item} />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="sidebar__rodape">
            <button className="botao-sair" onClick={handleSair}>
              <LogOut size={18} />
              Sair
            </button>
          </div>

        </aside>

        <main className="conteudo">
          <Outlet />
        </main>

      </div>
    </>
  );
}