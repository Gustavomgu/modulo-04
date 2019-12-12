import React, { Component } from 'react';

class TechList extends Component {
  //Estados são imutaveis, devemos utilizar o this.setState para mudar infos do state
  state = {
    newTech: '',
    techs: [
      'NodeJS',
      'ReactJS',
      'React Native',
    ]
  };

  handleInputChange = e => {
    this.setState({newTech: e.target.value});
  }

  handleSubmit = e => {
    // Por padrão o formulario ira recarregar a pagina, para evitar isso usamos o preventDefault();
    e.preventDefault();
    // Aqui estou mudando o status, não posso usar um metodo push para adicionar info no array
    // preciso usar o ... para copiar os dados do array e adicionar a nova info
    this.setState({ techs: [...this.state.techs, this.state.newTech]});
    this.state.newTech = '';
  }

  handleDelete = (tech) => {
    this.setState({ techs:
      this.state.techs.filter(t => t !== tech),
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <ul>
        {this.state.techs.map(tech => (
          <li key={tech}>
            {tech}
            <button onClick={() => this.handleDelete(tech)} type="button">Remover</button>
          </li>))}
        </ul>
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech}></input>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;