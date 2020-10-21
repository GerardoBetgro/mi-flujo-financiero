import React, { useState, useEffect } from "react";
import "./App.css";

function onDelete() {
  return (
    console.log('Estoy presionando la tachita')
  );
}

function Movement(props) {
  const { amount, name } = props
  return (
    <div className="movement-group">
      <ul>
        <li className={(amount > 0 ? 'income' : 'expense') + " movement"}>
          <span>{name} - $ {amount}</span>
          <span className="delete-btn" onClick={() => onDelete()}>&times;</span>
        </li>
      </ul>
    </div>
  );
}

export const sum = (movements) =>
  movements.reduce((prev, curr) => prev + curr.amount, 0);

function MovementsPanel(props) {
  const incomes = props.movements.filter((item) => item.amount > 0);
  const expenses = props.movements.filter((item) => item.amount < 0);

  return (
    <section>
      <div className="movement-group">
        <h2>Ingresos</h2>
        <p>Total de ingresos: ${sum(incomes)}</p>
        <ul>
          {incomes.map((item) => (
            <Movement
              id={item.id}
              key={item.name}
              amount={item.amount}
              name={item.name}
              onDelete={props.onMovementDelete}
            />
          ))}
        </ul>
      </div>

      <div className="movement-group">
        <h2>Gastos</h2>
        <p>Total de gastos: ${sum(expenses)}</p>
        <ul>
          {expenses.map((item) => (
            <Movement
              id={item.id}
              key={item.name}
              amount={item.amount}
              name={item.name}
              onDelete={props.onMovementDelete}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

function onPayOff() {
  return (
    console.log('Se presiono el boton saldar')
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
          <button className="secondary-btn" onClick={() => onPayOff()}>Saldar</button>
        </li>
      </ol>
    </div>
  );
}

function DebtsPanel() {
  return (
    <section>
      <h2>Deudas</h2>
      <div className="column-controls">
        <input type="text" placeholder="Persona" />
        <input type="number" placeholder="Cantidad debida" />
        <input type="date" />
        <button className="secondary-btn">Listo</button>
      </div>
      <h3>A favor</h3>
      <ol>
        <Debt date={"7 de octubre"} debt={2344} person={"Alex"} />
        <Debt date={"7 de agosto"} debt={400} person={"Juan"} />
        <li className="debt">
          <div>
            <div>Primo alex - $22,000</div>
            <small>05 de octubre</small>
          </div>

          <button className="secondary-btn">Saldar</button>
        </li>
      </ol>
      <h3>Por pagar</h3>
      <ol>
        <Debt date={"7 de octubre"} debt={32000} person={"SAT"} />
        <Debt date={"6 de abril"} debt={1229} person={"Alice"} />
      </ol>
    </section>
  );
}

function Saving(props) {
  const { totalSaved, target, name } = props
  return (
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

function SavingsPanel() {
  return (
    <section>
      <h2>Alcancías</h2>
      <div className="column-controls">
        <input type="text" placeholder="Nombre" />
        <input type="number" placeholder="Meta (opcional)" />
        <button className="secondary-btn">Listo</button>
      </div>
      <ul>
        <Saving name="Fondo de emergencias" totalSaved={235555} />
        <Saving name="Macbook Air" totalSaved={100} target={22000} />
      </ul>
    </section>
  );
}

function App() {
  const [conceptValue, setConceptValue] = useState("");
  const [amountValue, setAmountValue] = useState("");
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    async function getMovements() {
      const res = await fetch(
        "https://miflujofinanciero.herokuapp.com/movements"
      );
      const data = await res.json();
      setMovements(data);
    }
    getMovements();
  }, []);

  async function addMovement() {
    try {
      const newMovement = {
        name: conceptValue,
        amount: amountValue,
      };
      const movementJSON = JSON.stringify(newMovement);
      const respuesta = await fetch(
        "https://miflujofinanciero.herokuapp.com/movements",
        {
          method: "POST",
          body: movementJSON,
          headers: { "Content-Type": "application/json" },
        }
      );
      await respuesta.json();
      let movementsCopy = [...movements];
      movementsCopy.push({
        amount: Number(amountValue),
        name: conceptValue,
      });
      setMovements(movementsCopy);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteMovement(movement) {
    try {
      const res = await fetch(
        "https://miflujofinanciero.herokuapp.com/movements/" + movement.id,
        { method: "DELETE" }
      );
      const deletedMovement = await res.json();
      console.log(deletedMovement);
      let movementsCopy = [...movements];
      const indexToDelete = movementsCopy.findIndex(
        (m) => m.name === movement.name
      );
      movementsCopy.splice(indexToDelete, 1);
      setMovements(movementsCopy);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="App">
      <nav>
        <div className="nav-content container">
          <h1>Mi flujo financiero🤑</h1>

          <div className="right-nav-items">
            <span>Usuario: gerardoguerrero</span>
            <a href="/ayuda">Ayuda</a>
            <a href="/salir">Salir</a>
          </div>
        </div>
      </nav>

      <main className="container">
        <h2>Tu flujo de efectivo es: ${sum(movements)}</h2>
        <p>Esta es la cantidad que debes tener libre en tu carteta cada mes.</p>

        <div className="main-controls">
          <input
            type="text"
            placeholder="Concepto"
            value={conceptValue}
            onChange={(e) => setConceptValue(e.target.value)}
          />
          <input
            type="number"
            placeholder="Cantidad"
            value={amountValue}
            onChange={(e) => setAmountValue(e.target.value)}
          />
          <button onClick={addMovement}>Registrar</button>
        </div>

        <div className="panels">
          <MovementsPanel
            movements={movements}
            onMovementDelete={deleteMovement}
          />
          <DebtsPanel />
          <SavingsPanel />
        </div>
      </main>
    </div>
  );
}

export default App;