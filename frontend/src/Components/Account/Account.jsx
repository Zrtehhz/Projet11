import React from 'react';
import { Link } from 'react-router-dom';
import Button from "../Button/Button";
import "../../Styles/Components/Account.css";

export default function Account({ title, amount, description, id }) {
  return (
    <section className="account" data-id={id}>
      <div className="account-content-wrapper">
        <h3 className="account-title">{title}</h3>
        <p className="account-amount">{amount}</p>
        <p className="account-amount-description">{description}</p>
      </div>
      <div className="account-content-wrapper cta">
        <Link to={`/transactions/${id}`}>
          <Button className="transaction-button">View transactions</Button>
        </Link>
      </div>
    </section>
  );
}
