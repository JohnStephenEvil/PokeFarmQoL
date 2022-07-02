/* globals Page */
// eslint-disable-next-line no-unused-vars
class WishforgePage extends Page {
    constructor(jQuery, localStorageMgr, helpers, GLOBALS) {
        super(jQuery, localStorageMgr, helpers, GLOBALS.WISHFORGE_PAGE_SETTINGS_KEY, {}, 'forge');
        const obj = this;
        this.observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if(mutation.type === 'childList' && mutation.addedNodes.length) {
                    obj.setupHTML(GLOBALS);
                }
            });
        });
    } // constructor

    setupHTML(GLOBALS) {
        const obj = this;
        const isMobile = obj.helpers.detectPageSize(obj.jQuery, 'mq2');
        // setup table format
        let header = '<th>Type</th> <th>Level</th> <th>Gem Progress</th> <th>Item</th> <th>Upgrade</th> <th>Notify</th>';
        let columns = 
            '<col style="width: 10%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 20%;">' +
            '<col style="width: 10%;">' +
            '<col style="width: 10%;">';
        if(isMobile) {
            header = '<th>Type</th> <th>Gem Progress</th> <th>Item</th>';
            columns = 
                '<col style="width: 34%;">' +
                '<col style="width: 33%;">' +
                '<col style="width: 33%;">';
        }

        // use GLOBALS.TYPE_LIST to get list of types
        const types = GLOBALS.TYPE_LIST;

        // build HTML table
        let rows = {};
        for (let i = 0; i < types.length; i++) {
            if(!isMobile) {
                rows[types[i]] = `<tr id=${types[i]}> <td>${types[i]}</td> <td></td> <td></td> <td></td> <td></td> <td></td> </tr>`;
            }
            else {
                rows[types[i]] = `<tr id="${types[i]}-top" class="qolBadgesTop"> <td>${types[i]}</td> <td></td> <td></td> </tr>`
                               + `<tr id="${types[i]}-bot" class="qolBadgesBot"> <td></td> <td></td> <td></td> </tr>`;
            }
        }
        let table = '<table style="width: 100%" class="qolBadges">' +
            `<colgroup> ${columns} </colgroup>` +
            `<tr id="head"> ${header} </tr>`;
        for (let i = 0; i < types.length; i++) {
            table += rows[types[i]];
        }
        table += '</table>';

        // add table to page
        const craftedBadgesList = obj.jQuery('#badges').next().find('ul.badgelist');
        craftedBadgesList.prepend(table);

        // define column aliases to make the movements more logical
        let LEVEL_COL = 2;
        let GEM_COL = 3;
        let ITEM_COL = 4;
        let UPDATE_COL = 5;
        let NOTIFY_COL = 6;
        let MOB_TOP = '';
        let MOB_BOT = '';
        if(isMobile) {
            LEVEL_COL = 1;
            GEM_COL = 2;
            ITEM_COL = 3;
            UPDATE_COL = 2;
            NOTIFY_COL = 3;
            // row specifiers for mobile
            MOB_TOP = '-top';
            MOB_BOT = '-bot';
        }

        // move elements from original elements to table
        for (let j = 0; j < types.length; j++) {
            const type = types[j];
            const index = j + 1;
            const li = obj.jQuery(craftedBadgesList.children()[index]);

            // get badge image
            const badgeImg = obj.jQuery(obj.jQuery(li.children()[0]).children()[0]);
            badgeImg.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get badge name
            const badgeName = obj.jQuery(li.children()[0]);
            badgeName.text(' ' + badgeName.text().replace(` ${type} Badge`, ''));
            badgeName.css('display', 'inline-block');
            badgeName.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${LEVEL_COL})`);

            // get gem progress bar
            const gemProgress = obj.jQuery(li.children()[0]);
            gemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                const gemTooltip = obj.jQuery(li.children()[0]);
                gemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${GEM_COL})`);
            }

            // get item progress bar
            const itemProgress = obj.jQuery(li.children()[0]);
            itemProgress.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);

            // if the badge is under construction, the tooltip will not be there
            if(obj.jQuery(li.children()[0]).hasClass('itemtooltip')) {
                const itemTooltip = obj.jQuery(li.children()[0]);
                itemTooltip.appendTo(`tr#${type}${MOB_TOP}>td:nth-child(${ITEM_COL})`);
            }

            // get notify button
            const notifyBtn = obj.jQuery(li.children()[0]);
            notifyBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${NOTIFY_COL})`);

            // get upgrade button
            const updateBtn = obj.jQuery(li.children()[0]);
            updateBtn.appendTo(`tr#${type}${MOB_BOT}>td:nth-child(${UPDATE_COL})`);
        }

        // remove the li's left over
        const children = craftedBadgesList.children();
        for (let i = types.length; i >= 1; i--) {
            obj.jQuery(children[i]).remove();
        }
    }

    setupObserver() {
        const obj = this;
        const target = obj.jQuery('#badges').next('div')[0];
        this.observer.observe(target, {
            childList: true
        });
    }
}