import { fromWei } from "ethjs-unit";
import BN from "bn.js";

export const fetchBalance = async (wallet) => {
    let _balance = 0
    try {
        const response = await fetch(`https://tonapi.io/v2/accounts/${wallet}/jettons`);
        const req = await response.json();
        for (let index = 0; index < req.balances.length; index++) {
        const balance = req.balances[index];
        if(balance.jetton.address === process.env.REACT_APP_TOKENADDRESS){
            
            _balance = fromNano(balance.balance)
        }
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }

    return _balance
};


function fromNano(amount) {
    if (!BN.isBN(amount) && !(typeof amount === 'string')) {
        throw new Error('Please pass numbers as strings or BN objects to avoid precision errors.');
    }

    return fromWei(amount, 'gwei');
}