'use strict';

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toggleCheckbox from './modules/toggleCheckbox';
import toogleCart from './modules/toogleCart';
import actionGoods from './modules/actionGoods';
import actionPage from './modules/actionPage';

(async function () {
        const db = await getData(); 
        renderCards(db);
        renderCatalog();
        toggleCheckbox();
        toogleCart();
        actionGoods();
        actionPage();
    
}());












