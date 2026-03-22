import { useState } from "react";
import Input from "../../components/Input/Input";
import { LoginService } from "../../services/loginServices";
import type { LoginRequest, LoginResponse } from "../../types";
import { useNavigate } from "react-router-dom";
import { usarAutenticacao } from "../../contexts/authContext";
import Button from "../../components/Button/button";
import { UsuarioService } from "../../services/usuarioServices";


const css = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&display=swap');
 
  * { box-sizing: border-box; margin: 0; padding: 0; }
 
  body { font-family: 'Sora', sans-serif; }
 
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: #eef0f4;
  }
  .card {
    background: #fff;
    padding: 2rem 2rem 1.5rem;
    border-radius: 20px;
    box-shadow: 0 6px 32px rgba(0,0,0,0.09);
    width: 100%;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
  .iconWrapper {
    background-color: #1a1f2e;
    width: 62px;
    height: 62px;
    border-radius: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 0.1rem;
  }
  .brandName {
    font-size: 1.45rem;
    font-weight: 800;
    color: #1a1f2e;
    text-align: center;
  }
  .brandSub {
    font-size: 0.77rem;
    color: #999;
    text-align: center;
    margin-top: 0.2rem;
  }
  .welcomeTitle {
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1f2e;
    text-align: center;
    margin-top: 0.4rem;
  }
  .welcomeSub {
    font-size: 0.82rem;
    color: #aaa;
    text-align: center;
    margin-top: 0.2rem;
  }
  .erroBox {
    width: 100%;
    background-color: #fff5f5;
    border: 1px solid #fcd4d4;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    gap: 0.6rem;
    font-size: 0.83rem;
    color: #c0392b;
    text-align: left;
  }
`;

export function Login() {
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha]     = useState("");
    const [erro, setErro]       = useState("");
    const [loading, setLoading] = useState(false);
    const [modalAberto, setModalAberto] = useState(false);
    const [cadastro, setCadastro] = useState({ nome: "", senha: "" });

    const navigate = useNavigate();     
    const { login } = usarAutenticacao();

    const abrirModal = () => setModalAberto(true);

    const fecharModal = () => {
      setModalAberto(false);
      setCadastro({ nome: "", senha: "" });
    };

    const salvarCadastro = () => {
        if (!cadastro.nome || !cadastro.senha) {
          alert("Preencha todos os campos.");
          return;
        }

        const credenciais: LoginRequest = {
          usuario: cadastro.nome,
          senha: cadastro.senha
        }

        UsuarioService.cadastrar(credenciais);

        fecharModal();
      };

    function handleLogin() {
        setErro("");

        if (!usuario.trim() || !senha.trim()) {
            setErro("Favor informar os campos para realizar o login.");
            return;
        }
        setLoading(true);

        const credenciais: LoginRequest = { usuario, senha };

        LoginService.logar(credenciais)
          .then((usuario: LoginResponse) => {
            login(usuario);
            navigate("/visaoGeral");
          })
          .catch(() => {
            setErro("Usuário ou senha inválidos.");
          })
          .finally(() => {
            setLoading(false);
          });
    }

    return (
        <>
            <style>{css}</style>

            <div className="container">
                <div className="card">
                    <div>
                        <p className="brandName">Gestão de Gastos Residenciais</p>
                    </div>

                    <div>
                        <p className="welcomeTitle">Bem-vindo</p>
                        <p className="welcomeSub">Acesse sua conta para continuar</p>
                    </div>

                    <div>
                      <Input
                        label="USUÁRIO"
                        value={usuario}
                        onChange={(e: any) => setUsuario(e.target.value)}
                        iconeEsquerda={
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                          </svg>
                        }
                      />
                    </div>

                    <div>
                        <Input
                          label="SENHA"
                          type="password"
                          value={senha}
                          onChange={(e: any) => setSenha(e.target.value)}
                          onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                          iconeEsquerda={
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                              <path d="M12 1C9.243 1 7 3.243 7 6v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6c0-2.757-2.243-5-5-5z"/>
                            </svg>
                          }
                        />
                    </div>
                    
                    <Button
                        onClick={handleLogin}
                        disabled={loading}
                        loading={loading}
                        className="botao"
                    >
                        Entrar
                    </Button>

                    <div className="mt-8 space-y-3">
                        <Button
                            onClick={abrirModal}
                            className="block w-full text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            Cadastrar usuário
                        </Button>
                    </div>

                    {erro && (
                        <div className="erroBox">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#e74c3c" viewBox="0 0 24 24" style={{flexShrink:0}}>
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        <span>{erro}</span>
                        </div>
                    )}

                    {modalAberto && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

                            <h2 className="text-xl font-semibold text-gray-800 text-center">
                              Cadastrar usuário
                            </h2>

                            <div className="space-y-4">
                              <div>
                                <Input
                                  label="Nome"
                                  type="text"
                                  value={cadastro.nome}
                                  onChange={(e: any) => setCadastro({ ...cadastro, nome: e.target.value })}
                                  onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                                  iconeEsquerda={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                                      <path d="M12 1C9.243 1 7 3.243 7 6v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6c0-2.757-2.243-5-5-5z"/>
                                    </svg>
                                  }
                                />
                              </div>

                              <div>
                                <Input
                                  label="SENHA"
                                  type="password"
                                  value={cadastro.senha}
                                  onChange={(e: any) => setCadastro({ ...cadastro, senha: e.target.value })}
                                  onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                                  iconeEsquerda={
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                                      <path d="M12 1C9.243 1 7 3.243 7 6v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6c0-2.757-2.243-5-5-5z"/>
                                    </svg>
                                  }
                                />
                              </div>
                            </div>

                            <div className="flex gap-3 pt-2">
                              <Button
                                onClick={salvarCadastro}
                                variant="primary"
                                className="flex-1 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                Salvar
                              </Button>

                              <Button
                                onClick={fecharModal}
                                variant="primary"
                                className="flex-1 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                              >
                                fechar
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                </div>
            </div>

            {modalAberto && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 space-y-6">

                  <h2 className="text-xl font-semibold text-gray-800 text-center">
                    Cadastrar usuário
                  </h2>

                  <div className="space-y-4">
                    <div>
                      <Input
                        label="Nome"
                        type="text"
                        value={cadastro.nome}
                        onChange={(e: any) => setCadastro({ ...cadastro, nome: e.target.value })}
                        onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                        iconeEsquerda={
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                            <path d="M12 1C9.243 1 7 3.243 7 6v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6c0-2.757-2.243-5-5-5z"/>
                          </svg>
                        }
                      />
                    </div>

                    <div>
                      <Input
                        label="SENHA"
                        type="password"
                        value={cadastro.senha}
                        onChange={(e: any) => setCadastro({ ...cadastro, senha: e.target.value })}
                        onKeyDown={(e: any) => e.key === "Enter" && handleLogin()}
                        iconeEsquerda={
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#bbb" viewBox="0 0 24 24">
                            <path d="M12 1C9.243 1 7 3.243 7 6v2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6c0-2.757-2.243-5-5-5z"/>
                          </svg>
                        }
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      onClick={salvarCadastro}
                      variant="primary"
                      className="flex-1 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      Salvar
                    </Button>

                    <Button
                      onClick={fecharModal}
                      variant="primary"
                      className="flex-1 text-center text-sm text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      fechar
                    </Button>
                  </div>
                </div>
              </div>
            )}
        </>
    );
}