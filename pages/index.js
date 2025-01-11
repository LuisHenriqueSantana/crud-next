import { useEffect, useState } from 'react';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [novoProduto, setNovoProduto] = useState({ nome: '', preco: 0 });

  useEffect(() => {
    const fetchProdutos = async () => {
      const response = await fetch('/api/produtos');
      const data = await response.json();
      setProdutos(data);
    };

    fetchProdutos();
  }, []);

  const adicionarProduto = async () => {
    const response = await fetch('/api/produtos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(novoProduto),
    });

    const produtoAdicionado = await response.json();
    setProdutos([...produtos, produtoAdicionado]);
    setNovoProduto({ nome: '', preco: 0 });
  };

  const deletarProduto = async (id) => {
    await fetch('/api/produtos', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deleteId: id }),
    });

    setProdutos(produtos.filter(produto => produto.id !== id));
  };

  return (
    <div>
      <h1>Produtos</h1>
      <ul>
        {produtos.map(produto => (
          <li key={produto.id}>
            {produto.nome} - {produto.preco}
            <button onClick={() => deletarProduto(produto.id)}>Deletar</button>
          </li>
        ))}
      </ul>
      <h2>Adicionar Produto</h2>
      <input
        type="text"
        placeholder="Nome"
        value={novoProduto.nome}
        onChange={(e) => setNovoProduto({ ...novoProduto, nome: e.target.value })}
      />
      <input
        type="number"
        placeholder="Preço"
        value={novoProduto.preco}
        onChange={(e) => setNovoProduto({ ...novoProduto, preco: e.target.value })}
      />
      <button onClick={adicionarProduto}>Adicionar</button>
    </div>
  );
};

export default Produtos;
