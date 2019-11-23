import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/search.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import SearchBox from './SearchBox';
const formatter = new Intl.NumberFormat('es-CL', {
  style: 'currency',
  currency: 'CLP',
  minimumFractionDigits: 2
})
/*
Descripción:    Página de búsqueda que consume un API de NodeJS que a su vez emplea métodos
                del API de MercadoLibre
Desarrollador:  David Tineo
Fecha: 13/08/2019
*/ 
class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      productos: []
    };
  }

  findProduct=(sQuery)=> {
    this.search(sQuery);
  }
  
  findProductDescription=(sId)=> {
    if(sId !== "")
    {
        this.props.history.push('/items/' + sId)
    }
  }   

  search(sQuery) {
    const url = `http://localhost/Vacasa.API.Productos/api/producto?sProducto=${sQuery}`;

    if(sQuery !== "")
    {
      this.setState({ productos:[]});
      fetch(url)
      .then(results => results.json())
      .then(data => {
        this.setState({ 
          productos: data
         });
      });

    }
  };

  componentDidMount= () => {
    const params = new URLSearchParams(this.props.location.search);
    this.search(params.get('search'));
  }

  render() {
    //Para mostrar solo 4 productos de acuerdo a lo indicado en la descripción funcional de la aplicación
    var canti = 4;
    return (
      <div>
          <div id="search">
            <SearchBox findProduct={this.findProduct}/>
          </div>
          <div className="container">
            <table className="table">
              <tbody>
              {
                  this.state.productos.slice(0, canti).map((item, i,) =>{
                    return (
                        <tr key={i}>
                        <td>
                          <img className="lstImg" src={item.thumbnail} alt={item.title} onClick={() => this.findProductDescription(item.id)}/>
                        </td>
                        <td>
                          <table>
                            <tbody>
                              <tr>
                                    <td>
                                      <h4>{formatter.format(item.price)}</h4>
                                    </td>
                                </tr>
                                <tr>
                                  <td>{item.title}</td>
                                </tr>                          
                            </tbody>
                          </table>
                        </td>
                    </tr>
                    )                                    
                })
              }
              </tbody>
            </table>
        </div>          
      </div>
    );
  }
}

export default SearchResult;
