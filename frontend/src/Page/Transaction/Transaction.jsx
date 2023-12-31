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
    const profileData = useSelector((state) => state.auth.user);

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
        if (transaction) {
            // Si la transaction existe alors il l'appel  
            setSelectedTransaction(transaction);
        } else { // sinon
            // Si la transaction n'existe pas, ça redirige vers la page d'erreur
            navigate('/error');
        }
    }, [transactionId, selectedTransaction, transactions]);

    const handleSignOut = () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('sessionToken');
        
        dispatch(logout());
        navigate('/login');
    };

    useEffect(() => {
        const localStorageToken = localStorage.getItem('token');
        const sessionStorageToken = sessionStorage.getItem('sessionToken');

        if (!localStorageToken && !sessionStorageToken) {
            handleSignOut();
        }
    }, [dispatch, navigate]);

    
    return (
        <div>
            <Header onSignOut={handleSignOut} userName={profileData.userName}/>
            {selectedTransaction && <TransactionDetails transaction={selectedTransaction} />}
            <Footer />
        </div>
    );
}

export default Transaction;
