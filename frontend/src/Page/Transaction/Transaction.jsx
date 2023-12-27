import React, { useState, useEffect } from 'react';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import TransactionDetails from '../../Components/TransactionDetails/TransactionDetails';
import '../../Styles/Components/Body.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';

function Transaction() {
    const { transactionId } = useParams();
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const transactions = [
        { id: 1, title: 'Argent Bank Checking (x8349)', amount: '$2,082.79', description: 'Available Balance' },
        { id: 2, title: 'Argent Bank Savings (x6712)', amount: '$10,928.42', description: 'Available Balance' },
        { id: 3, title: 'Argent Bank Credit Card (x8349)', amount: '$184.30', description: 'Current Balance' },
    ];

    useEffect(() => {
        const newTransactionId = parseInt(transactionId);
        if (selectedTransaction && selectedTransaction.id === newTransactionId) {
            return;
        }

        const transaction = transactions.find(t => t.id === newTransactionId);
        setSelectedTransaction(transaction);
    }, [transactionId, selectedTransaction, transactions]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        // Vérifiez si un token est présent au moment de l'initialisation du composant
        const token = localStorage.getItem('token');
        const isTokenPresent = !!token;

        // Si l'utilisateur n'est pas authentifié et aucun token n'est présent, déconnectez-le et redirigez-le vers la page de connexion
        if (!isTokenPresent) {
            handleSignOut();
        }
    }, [dispatch, navigate]);

    return (
        <div>
            <Header onSignOut={handleSignOut} />
            {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />}
            <Footer />
        </div>
    );
}

export default Transaction;
