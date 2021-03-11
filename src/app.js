import {AppLib} from './app-core/lib';
import { authenticator } from 'otplib';
import './mycss.css';
import './mycss2.css';

let appLib = new AppLib();

let myapp = {
    getRemaining: () => {
        const remaining = authenticator.timeRemaining();
        document.getElementById('count').innerHTML =  `Actualizando en ${remaining} segundos`;
        document.getElementById('myBar').style.width = `${remaining * 100 / 30}%`;
    },
    setTotp: (secret) => {
        const token = authenticator.generate(secret);
        document.getElementById('otp').innerHTML = token;
    },
    setDate: () => {
        document.getElementById('date').innerHTML = new Date();
    },
    generateSecret: () => {
        const secret = authenticator.generateSecret();
        document.getElementById('secret').innerHTML = secret;
        return secret;
    }
};
    

Neutralino.init({
    load: function() {
        // set date
        myapp.setDate();
        setInterval(() => {
          myapp.setDate();
        }, 1000);

        // button generate secret
        document.getElementById('generate-secret').onclick = function () {
            const secret = myapp.generateSecret();
            myapp.setTotp(secret);
            myapp.getRemaining();
            setInterval(() => {
                myapp.getRemaining();
                myapp.setTotp(secret);
            }, 1000);
        }
    },
    pingSuccessCallback : function() {

    },
    pingFailCallback : function() {

    }
});

function generate() {
    alert(authenticator.generateSecret());
};