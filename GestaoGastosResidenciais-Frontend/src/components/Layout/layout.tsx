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
          {isActive && <span className="nav-item__indicador" />}

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
        /* Reset básico */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', 'DM Sans', sans-serif; background: #f8fafc; }

        /* ── Shell ── */
        .shell {
          display: grid;
          grid-template-columns: 288px 1fr;
          min-height: 100vh;
        }

        /* ── Sidebar ── */
        .sidebar {
          width: 288px;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          height: 100vh;
          border-right: 1px solid rgba(226, 232, 240, 0.5);
          display: flex;
          flex-direction: column;
          padding: 24px 0;
          overflow-y: auto;
          position: sticky;
          top: 0;
          z-index: 20;
        }

        .sidebar::-webkit-scrollbar { width: 4px; }
        .sidebar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }

        /* ── Seção ── */
        .secao {
          margin-bottom: 32px;
          padding: 0 24px;
        }

        .secao__titulo {
          font-size: 11px;
          font-weight: 700;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .secao__lista {
          display: flex;
          flex-direction: column;
          gap: 2px;
          margin: 0 -8px;
        }

        /* ── Item de navegação ── */
        .nav-item {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 10px;
          position: relative;
          color: #64748b;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
        }

        .nav-item:hover {
          background: #f8fafc;
          color: #1e293b;
        }

        .nav-item--ativo {
          background: #f8fafc;
          color: #1e293b;
        }

        .nav-item__indicador {
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 24px;
          background: #6366f1;
          border-radius: 0 4px 4px 0;
        }

        .nav-item__conteudo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .nav-item__icone {
          flex-shrink: 0;
          color: #94a3b8;
          transition: color 0.15s;
        }

        .nav-item--ativo .nav-item__icone,
        .nav-item:hover .nav-item__icone {
          color: #6366f1;
        }

        .nav-item__rotulo {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          transition: color 0.15s;
        }

        .nav-item--ativo .nav-item__rotulo {
          color: #1e293b;
        }

        .nav-item__seta {
          color: #6366f1;
          flex-shrink: 0;
        }

        /* ── Rodapé ── */
        .sidebar__rodape {
          margin-top: auto;
          padding: 16px 24px 0;
          border-top: 1px solid #f1f5f9;
        }

        .usuario {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          margin-bottom: 4px;
        }

        .usuario__avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #6366f1);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }

        .botao-sair {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          border-radius: 10px;
          border: none;
          background: none;
          color: #94a3b8;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, color 0.15s;
        }

        .botao-sair:hover {
          background: #fef2f2;
          color: #ef4444;
        }

        /* ── Conteúdo principal ── */
        .conteudo {
          padding: 40px 48px;
          overflow-y: auto;
          color: #1e293b;
        }
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