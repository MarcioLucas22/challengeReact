import React from "react";

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      console.log(response);
    });
  }, [])

  async function handleAddRepository() {
    //setRepository([... repositories, `Novo Repositório ${Date.now()}`]);
    const response = await api.post('repositories', {
      title: `Novo Repositório ${Date.now()}`,
      url: "http://github.com/..."
    });

    const repository = response.data;

    setRepository([... repositories, repository]);
  }

  async function handleRemoveRepository(id) {
      await api.delete(`repositories/${id}`);

      const newRepositories = repositories.filter(
        repository = repository.id != id
      ) 

      setRepository(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
