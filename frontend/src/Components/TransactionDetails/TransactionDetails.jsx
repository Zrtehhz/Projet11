import React from 'react';
import './TransactionDetails.css';
import Dropdown from '../Dropdown/Dropdown';

function TransactionDetails({ transaction }) {
  if (!transaction) {
    return <div>Chargement des détails de la transaction...</div>;
  }

  const additionalDetails = [
    { date: '2020-27-02', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
    { date: '2020-27-02', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
    { date: '2020-27-02', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
    { date: '2020-27-02', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
    { date: '2020-27-02', description: 'Golden Sun Bakery', amount: '$8.00', balance: '$298.00' },
  ];

  return (
    <div>
      <div className="transaction-container" style={{ marginTop: '50px' }}>
        <p className="transaction-title">{transaction.title}</p>
        <div className="title-close-container">
          <p className="transaction-amount">{transaction.amount}</p>
          <span className="close-icon">&#10005;</span>
        </div>
        <p className="transaction-description">{transaction.description}</p>
      </div>

      <div>  
        <div className="spanClass"><span>Date</span><span>Description</span><span>Amount</span><span>Balance</span></div>
        {additionalDetails.map((detail, index) => (
          <Dropdown key={index} detail={detail} />
        ))}
      </div>
    </div>
  );
}

export default TransactionDetails;
