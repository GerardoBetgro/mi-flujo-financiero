import React, { Component } from 'react';
import './App.css';

class NavBar extends Component {
  render() {
    const { nombre } = this.props
    return <p>{nombre}</p>
  }
}
function Movement(props) {
  const { amount, name } = props
  return (
    <div className="movement-group">
      <ul>
        <li className={(amount > 0 ? 'income' : 'expense') + " movement"}>
          <span>{name} - $ {amount}</span>
          <span className="delete-btn">&times;</span>
        </li>
      </ul>
    </div>
  );
}
function Debt(props) {
  const { person, debt, date } = props
  return (
    <div>
      <ol>
        <li className="debt">
          <div>
            <div>{person} - ${debt}</div>
            <small>{date}</small>
          </div>
          <button className="secondary-btn">Saldar</button>
        </li>
      </ol>
    </div>
  );
}
function Saving(props){
  const { totalSaved, target, name } = props
  return(   
    <div>
      <ul>
        <li className="saving">
          <div>
            <h4>{name}</h4>
            <small>Total: <b>${totalSaved} / {target}</b></small>
          </div>
          <div className="bottom-saving-items">
            <input
              className="saving-input"
              type="number"
              placeholder="Entrada o salida"
            />
            <button className="secondary-btn">OK</button>
          </div>
        </li>
      </ul>
    </div>
    );
}

function App() {
  return (
    <div className="App">
      <nav>
        <div className="nav-content container">
          <h1><NavBar nombre="Mi flujo financiero🤑💰" /></h1>
          <div className="right-nav-items">
            <NavBar nombre="Usuario: gerardoguerrero" />
            <a href="ayuda"><NavBar nombre="Ayuda" /></a>
            <a href="salir"><NavBar nombre="Salir" /></a>
          </div>
        </div>
      </nav>
      <main className="container">
        <h2>Tu flujo de efectivo es: $11,280</h2>
        <p>Esta es la cantidad que debes tener libre en tu carteta cada mes.</p>

        <div className="main-controls">
          <input type="text" placeholder="Concepto" />
          <input type="number" placeholder="Cantidad" />
          <button>Registrar</button>
        </div>

        <div className="panels">
          <section>
            <h2>Ingresos</h2>
            <p>Total de ingresos: $19,500</p>
            <Movement name="Salario" amount={15000} />
            <Movement name="Mesada" amount={1500} />
            <Movement name="Regalo de tio" amount={3000} />
            <h2>Gastos</h2>
            <p>Total de gastos: $8,220</p>
            <Movement name="Uber" amount={-460} />
            <Movement name="Netflix" amount={-260} />
            <Movement name="Renta" amount={-7000} />
            <Movement name="Internet" amount={-500} />
          </section>

          <section>
            <h2>Deudas</h2>
            <div className="column-controls">
              <input type="text" placeholder="Persona" />
              <input type="number" placeholder="Cantidad debida" />
              <input type="date" />
              <button className="secondary-btn">Listo</button>
            </div>
            <h3>A favor</h3>
            <Debt person="Carlos Fernandez" debt={1230} date="05 de octubre 2020" />
            <Debt person="Primo de Alex" debt={22000} date="05 de octubre 2020" />
            <h3>Por pagar</h3>
            <Debt person="Mama" debt={500} date="05 de octubre 2020" />
          </section>

          <section>
            <h2>Alcancías</h2>
            <div className="column-controls">
              <input type="text" placeholder="Nombre" />
              <input type="number" placeholder="Meta (opcional)" />
              <button className="secondary-btn">Listo</button>
            </div>
            <Saving name="Fondo para emergencias" totalSaved={17230} />
            <Saving name="MacBook Pro 2018" totalSaved={8230} target={22400} />
          </section>
        </div>
      </main>

    </div >
  );
}
export default App;