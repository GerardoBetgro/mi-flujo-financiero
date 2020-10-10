import React from 'react';
import './App.css';

function NavBar(propiedades) {
  return (
    <p>{propiedades.nombre}</p>
  );
}
function Movement(propiedades) {
  return (
    <div className="movement-group">
      <ul>
        <li className="movement income">
          <span>{propiedades.name} - ${propiedades.amount}</span>
          <span className="delete-btn">&times;</span>
        </li>
      </ul>
    </div>
  );
}
function Debt(propiedades) {
  return (
    <div>
      <ol>
        <li className="debt">
          <div>
            <div>{propiedades.person} - ${propiedades.debt}</div>
            <small>{propiedades.date}</small>
          </div>
          <button className="secondary-btn">Saldar</button>
        </li>
      </ol>
    </div>
  );
}
function Saving(propiedades) {
  return (
    <div>
      <ul>
        <li className="saving">
          <div>
            <h4>{propiedades.name}</h4>
            <small>Total: <b>${propiedades.totalSaved} / {propiedades.target}</b></small>
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
            <a href="www.facebook.com"><NavBar nombre="Ayuda" /></a>
            <a href="www.google.com"><NavBar nombre="Salir" /></a>
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
            <Movement name="Salario" amount="15,000" />
            <Movement name="Mesada" amount="1,500" />
            <Movement name="Regalo de tio" amount="3,000" />
            <h2>Gastos</h2>
            <p>Total de gastos: $8,220</p>
            <Movement name="Uber" amount="460" />
            <Movement name="Netflix" amount="260" />
            <Movement name="Renta" amount="7,000" />
            <Movement name="Internet" amount="500" />
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
            <Debt person="Carlos Fernandez" debt="1,230" date="05 de octubre 2020" />
            <Debt person="Primo de Alex" debt="22,000" date="05 de octubre 2020" />
            <h3>Por pagar</h3>
            <Debt person="Mama" debt="500" date="05 de octubre 2020" />
          </section>

          <section>
            <h2>Alcancías</h2>
            <div className="column-controls">
              <input type="text" placeholder="Nombre" />
              <input type="number" placeholder="Meta (opcional)" />
              <button className="secondary-btn">Listo</button>
            </div>
            <Saving name="Fondo para emergencias" totalSaved="17,230"/>
            <Saving name="MacBook Pro 2018" totalSaved="8,230" target="22,400"/>
          </section>
        </div>
      </main>

    </div >
  );
}
export default App;
