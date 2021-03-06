import React, { Component } from 'react';

import TechItem from './TechItem'

class TechList extends Component {
  //Estados são imutaveis, devemos utilizar o this.setState para mudar infos do state
  // As funções que podem manipular o estado tem que estar no mesmo componente que o estado
  state = {
    newTech: '',
    techs: []
  };

  //Manipular estados do componente é um passo importante para usar react

  //Executa ação assim que esse componente é carregado
  componentDidMount() {
    const techs = localStorage.getItem('techs');

    if (techs) {
      this.setState({ techs: JSON.parse(techs)});
    }
  }

  //Carregado sempre que há atualização nas props ou states
  componentDidUpdate(_,prevState) {
    if(prevState.techs !== this.state.techs) {
      localStorage.setItem('techs',JSON.stringify(this.state.techs));
    }
  }

  //Utilizado quando o componente deixa de existir
  componentWillUnmount() {

  }



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
        {this.state.techs.map(tech =>  <TechItem key={tech} tech={tech} onDelete={() => this.handleDelete(tech)}></TechItem> )}
        <TechItem onDelete={() => this.handleDelete()}></TechItem>
        </ul>
        <input type="text" onChange={this.handleInputChange} value={this.state.newTech}></input>
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;