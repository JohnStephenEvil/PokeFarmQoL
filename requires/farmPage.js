let FarmPage = (function FarmPage() {
    const SETTINGS_SAVE_KEY = 'QoLFarm';
    const DEFAULT_SETTINGS = { /* empty */ };
    let settings = DEFAULT_SETTINGS;
    let evolveListCache = "";
    // more data
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            API.easyQuickEvolve();
        });
    });
    const API = {
        loadSettings() { // initial settings on first run and setting the variable settings key
            settings = Helpers.loadSettings(SETTINGS_SAVE_KEY, DEFAULT_SETTINGS, settings);
        },
        saveSettings() { // Save changed settings
            Helpers.saveSettings(SETTINGS_SAVE_KEY, settings)
        },
        getSettings() {
            return settings;
        },
        populateSettings() { /* empty */ },
        settingsChange(element, textElement, customClass, typeClass) { /* empty */ },
        setupHTML() {
            $(document).ready(function() {
                $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
                document.querySelector('#farm-evolve>h3').insertAdjacentHTML('afterend', '<label id="qolevolvenormal"><input type="button" class="qolsortnormal" value="Normal list"/></label><label id="qolchangesletype"><input type="button" class="qolsorttype" value="Sort on types"/></label><label id="qolsortevolvename"><input type="button" class="qolsortname" value="Sort on name"/></label><label id="qolevolvenew"><input type="button" class="qolsortnew" value="New dex entry"/>');
            });
        },
        setupCSS() { /* empty */ },
        setupObserver() {
            observer.observe(document.querySelector('#farmnews-evolutions'), {
                childList: true,
                characterdata: true,
                subtree: true,
                characterDataOldValue: true,
            });
        },
        setupHandlers() {
            $(document).on('click', '#qolevolvenormal', (function() {
                API.easyEvolveNormalList();
            }));

            $(document).on('click', '#qolchangesletype', (function() {
                API.easyEvolveTypeList();
            }));

            $(document).on('click', '#qolsortevolvename', (function() {
                API.easyEvolveNameList();
            }));

            $(document).on('click', '#qolevolvenew', (function() {
                API.easyEvolveNewList();
            }));
        },
        easyEvolveNormalList() {
            // first remove the sorted pokemon type list to avoid duplicates
            $('.evolvepkmnlist').show();
            try {
                document.querySelector('.qolEvolveTypeList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNameList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNewList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
        },
        easyEvolveTypeList() {
            let dexData = GLOBALS.DEX_DATA;
            // first remove the sorted pokemon type list to avoid duplicates
            $('.evolvepkmnlist').show();
            try {
                document.querySelector('.qolEvolveTypeList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNameList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNewList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }

            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', TEMPLATES.evolveFastHTML);
            let typeBackground = $('.panel>h3').css('background-color');
            let typeBorder = $('.panel>h3').css('border');
            let typeColor = $('.panel>h3').css('color');
            $(".expandlist").css("background-color", ""+typeBackground+"");
            $(".expandlist").css("border", ""+typeBorder+"");
            $(".expandlist").css("color", ""+typeColor+"");

            let typeListBackground = $('.tabbed_interface>div').css('background-color');
            let typeListColor = $('.tabbed_interface>div').css('color');
            $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
            $(".qolChangeLogContent").css("color", ""+typeListColor+"");

            $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
                // getting the <li> element from the pokemon & the pokemon evolved name
                let getEvolveString = $(this).html();
                let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

                // first looks if you know the type out of your dexdata, if it's there then the <li> will be moved in it's corresponding type
                if (dexData.indexOf('"'+evolvePokemon+'"') != -1 || evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]' || evolvePokemon === 'Wormadam [Plant Cloak]' || evolvePokemon === 'Wormadam [Trash Cloak]' || evolvePokemon.includes('[Alolan Forme]')) {
                    let evolveTypeOne = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 1];
                    let evolveTypeTwo = dexData[dexData.indexOf('"'+evolvePokemon+'"') + 2];
                    let evolveTypePrevOne = dexData[dexData.indexOf('"'+evolvePokemon+'"') - 10];
                    let evolveTypePrevTwo = dexData[dexData.indexOf('"'+evolvePokemon+'"') - 9];

                    if (getEvolveString.includes('title="[DELTA') || evolvePokemon === 'Vaporeon' || evolvePokemon === 'Jolteon' || evolvePokemon === 'Flareon' || evolvePokemon === 'Espeon' || evolvePokemon === 'Umbreon' || evolvePokemon === 'Leafeon' || evolvePokemon === 'Glaceon' || evolvePokemon === 'Sylveon' || evolvePokemon === 'Nidorino' || evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]' || evolvePokemon === 'Wormadam [Plant Cloak]' || evolvePokemon === 'Wormadam [Trash Cloak]' || evolvePokemon.includes('[Alolan Forme]') || evolvePokemon.includes('Chilldoom')) {
                        if (getEvolveString.includes('title="[DELTA')) {
                            console.log(getEvolveString);
                            let deltaType = getEvolveString.match('DELTA-(.*)]">');
                            console.log(deltaType[1]);

                            if (deltaType[1] === 'NORMAL') {
                                $(this).clone().appendTo('.0');
                            }

                            if (deltaType[1] === 'FIRE') {
                                $(this).clone().appendTo('.1');
                            }

                            if (deltaType[1] === 'WATER') {
                                $(this).clone().appendTo('.2');
                            }

                            if (deltaType[1] === 'ELECTRIC') {
                                $(this).clone().appendTo('.3');
                            }

                            if (deltaType[1] === 'GRASS') {
                                $(this).clone().appendTo('.4');
                            }

                            if (deltaType[1] === 'ICE') {
                                $(this).clone().appendTo('.5');
                            }

                            if (deltaType[1] === 'FIGHTING') {
                                $(this).clone().appendTo('.6');
                            }

                            if (deltaType[1] === 'POISON') {
                                $(this).clone().appendTo('.7');
                            }

                            if (deltaType[1] === 'GROUND') {
                                $(this).clone().appendTo('.8');
                            }

                            if (deltaType[1] === 'FLYING') {
                                $(this).clone().appendTo('.9');
                            }

                            if (deltaType[1] === 'PSYCHIC') {
                                $(this).clone().appendTo('.10');
                            }

                            if (deltaType[1] === 'BUG') {
                                $(this).clone().appendTo('.11');
                            }

                            if (deltaType[1] === 'ROCK') {
                                $(this).clone().appendTo('.12');
                            }

                            if (deltaType[1] === 'GHOST') {
                                $(this).clone().appendTo('.13');
                            }

                            if (deltaType[1] === 'DRAGON') {
                                $(this).clone().appendTo('.14');
                            }

                            if (deltaType[1] === 'DARK') {
                                $(this).clone().appendTo('.15');
                            }

                            if (deltaType[1] === 'STEEL') {
                                $(this).clone().appendTo('.16');
                            }

                            if (deltaType[1] === 'FAIRY') {
                                $(this).clone().appendTo('.17');
                            }
                        }

                        if (evolvePokemon === 'Vaporeon' || evolvePokemon === 'Jolteon' || evolvePokemon === 'Flareon' || evolvePokemon === 'Espeon' || evolvePokemon === 'Umbreon' || evolvePokemon === 'Leafeon' || evolvePokemon === 'Glaceon' || evolvePokemon === 'Sylveon') {
                            // normal type from eevee
                            $(this).clone().appendTo('.0');
                            // type one
                            $(this).clone().appendTo('.'+evolveTypeOne+'');
                            // type two
                            if (evolveTypeTwo < 0) {
                                let thisAlsoDoeSNothing = true;
                            } else {
                                $(this).clone().appendTo('.'+evolveTypeTwo+'');
                            }
                        }
                        if (evolvePokemon === 'Nidorino') {
                            // poison type from Nidoran
                            $(this).clone().appendTo('.7');
                        }

                        if (evolvePokemon === 'Gastrodon [Orient]' || evolvePokemon === 'Gastrodon [Occident]') {
                            // water type
                            $(this).clone().appendTo('.2');
                            // ground type
                            $(this).clone().appendTo('.8');
                        }

                        if (evolvePokemon === 'Wormadam [Plant Cloak]') {
                            // bug type
                            $(this).clone().appendTo('.11');
                            // grass type
                            $(this).clone().appendTo('.4');
                        }

                        if (evolvePokemon === 'Wormadam [Trash Cloak]') {
                            // bug type (burmy)
                            $(this).clone().appendTo('.11');
                            // steel type
                            $(this).clone().appendTo('.16');
                            // grass type
                            $(this).clone().appendTo('.4');
                        }

                        if (evolvePokemon === 'Chilldoom') {
                            // dark type
                            $(this).clone().appendTo('.15');
                            // ice type
                            $(this).clone().appendTo('.5');
                        }

                        if (evolvePokemon.includes('[Alolan Forme]')) { //alolan formes
                            // raticate
                            if (evolvePokemon.includes('Raticate')) {
                                // dark type
                                $(this).clone().appendTo('.15');
                                // normal type
                                $(this).clone().appendTo('.0');
                            }

                            // ninetales
                            if (evolvePokemon.includes('Ninetales')) {
                                // ice type
                                $(this).clone().appendTo('.5');
                                // fairy type
                                $(this).clone().appendTo('.17');
                            }

                            // exeggutor
                            if (evolvePokemon.includes('Exeggutor')) {
                                // grass type
                                $(this).clone().appendTo('.4');
                                // dragon type
                                $(this).clone().appendTo('.14');
                            }

                            // marowak
                            if (evolvePokemon.includes('Marowak')) {
                                // fire type
                                $(this).clone().appendTo('.1');
                                // ghost type
                                $(this).clone().appendTo('.13');
                            }

                            // dugtrio
                            if (evolvePokemon.includes('Dugtrio')) {
                                // ground type
                                $(this).clone().appendTo('.8');
                                // steel type
                                $(this).clone().appendTo('.16');
                            }

                            // graveler
                            if (evolvePokemon.includes('Graveler')) {
                                // rock type
                                $(this).clone().appendTo('.12');
                                // electric type
                                $(this).clone().appendTo('.3');
                            }

                            // golem
                            if (evolvePokemon.includes('Golem')) {
                                // rock type
                                $(this).clone().appendTo('.12');
                                // electric type
                                $(this).clone().appendTo('.3');
                            }

                            // muk
                            if (evolvePokemon.includes('Muk')) {
                                // poison type
                                $(this).clone().appendTo('.7');
                                // dark type
                                $(this).clone().appendTo('.15');
                            }

                            // raichu
                            if (evolvePokemon.includes('Raichu')) {
                                // electric type
                                $(this).clone().appendTo('.3');
                                // psychic type
                                $(this).clone().appendTo('.10');
                            }
                        }

                    } else { //no exceptions
                        // type one
                        $(this).clone().appendTo('.'+evolveTypeOne+'');
                        // type two
                        if (evolveTypeTwo < 0) {
                            let thisAlsoDoeSNothing = true;
                        } else {
                            $(this).clone().appendTo('.'+evolveTypeTwo+'');
                        }
                        // extra type from prev pokemon
                        if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevOne) == -1){
                            $(this).clone().appendTo('.'+evolveTypePrevOne+'');
                        }

                        if([evolveTypeOne, evolveTypeTwo].indexOf(evolveTypePrevTwo) == -1){
                            $(this).clone().appendTo('.'+evolveTypePrevTwo+'');
                        }
                    }
                } else {
                    $(this).clone().appendTo('.18');
                }
            });

            $('#farmnews-evolutions>.scrollable>.qolEvolveTypeList>Li').each(function (index, value) {
                let amountOfEvolves = $(this).children().children().length;
                let evolveTypeName = $(this).children('.slidermenu').html();

                $(this).children('.slidermenu').html(evolveTypeName+' ('+amountOfEvolves+')')
            });

            $('.evolvepkmnlist').hide();
        },
        easyEvolveNameList() {
            // first remove the sorted pokemon type list to avoid duplicates
            $('.evolvepkmnlist').show();

            try {
                document.querySelector('.qolEvolveTypeList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNameList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNewList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }

            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNameList">');

            $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) {
                // getting the <li> element from the pokemon & the pokemon evolved name
                let getEvolveString = $(this).html();
                let beforeEvolvePokemon = $(this).children().children().text().slice(0,-6);
                let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
                let evolvePokemonChange = evolvePokemon.split(' ').join('').replace('[','').replace(']','');

                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li>Ul').hasClass(evolvePokemon.split(' ').join('')) === false) {
                    document.querySelector('.qolEvolveNameList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">'+beforeEvolvePokemon+' > '+evolvePokemon+'</h3><ul class="'+evolvePokemonChange+' qolChangeLogContent"></ul></li><br>');
                }
                $(this).clone().appendTo('.'+evolvePokemonChange+'');
            });

            $('#farmnews-evolutions>.scrollable>.qolEvolveNameList>Li').each(function (index, value) {
                let amountOfEvolves = $(this).children().children().length;
                let getEvolveString = $(this).children().children().html();
                let beforeEvolvePokemon = $(this).children().children().children().children().first().text().split(' ').join('');
                let evolvePokemon = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);

                $(this).children('.slidermenu').html(beforeEvolvePokemon+' > '+evolvePokemon+' ('+amountOfEvolves+')')
            });

            $('.evolvepkmnlist').hide();

            //layout of the created html
            let typeBackground = $('.panel>h3').css('background-color');
            let typeBorder = $('.panel>h3').css('border');
            let typeColor = $('.panel>h3').css('color');
            $(".expandlist").css("background-color", ""+typeBackground+"");
            $(".expandlist").css("border", ""+typeBorder+"");
            $(".expandlist").css("color", ""+typeColor+"");

            let typeListBackground = $('.tabbed_interface>div').css('background-color');
            let typeListColor = $('.tabbed_interface>div').css('color');
            $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
            $(".qolChangeLogContent").css("color", ""+typeListColor+"");
        },
        easyEvolveNewList() {
            let dexData = GLOBALS.DEX_DATA;

            // first remove the sorted pokemon type list to avoid duplicates
            $('.evolvepkmnlist').show();

            try {
                document.querySelector('.qolEvolveTypeList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNameList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }
            try {
                document.querySelector('.qolEvolveNewList').remove();
            }
            catch(err){
                let thisdoesnothing = true;
            }

            // add a class to the original pokemon evolve list to be able to manipulate the element more easily and add the ul for the new dex search
            $('#farmnews-evolutions>.scrollable>ul').addClass('evolvepkmnlist');
            document.querySelector('#farmnews-evolutions>.scrollable').insertAdjacentHTML('afterbegin', '<ul class="qolEvolveNewList">');

            $('#farmnews-evolutions>.scrollable>.evolvepkmnlist>Li').each(function (index, value) { //the actual search
                // getting the <li> element from the pokemon & the pokemon evolved name
                let getEvolveString = $(this).html();

                // every pokemon is a normal unless shiny, albino or melanistic pokemon is found
                let pokemonIsNormal = true;
                let pokemonIsShiny = false;
                let pokemonIsAlbino = false;
                let pokemonIsMelanistic = false;

                if (getEvolveString.includes('title="[SHINY]')) {
                    pokemonIsShiny = true;
                    pokemonIsNormal = false;
                }
                if (getEvolveString.includes('title="[ALBINO]')) {
                    pokemonIsAlbino = true;
                    pokemonIsNormal = false;
                }
                if (getEvolveString.includes('title="[MELANISTIC]')) {
                    pokemonIsMelanistic = true;
                    pokemonIsNormal = false;
                }

                let evolvePokemonName = getEvolveString.substr(getEvolveString.indexOf("into</span> ") + 12);
                var evolveNewCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 6];
                var evolveNewShinyCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 7];
                var evolveNewAlbinoCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 8];
                var evolveNewMelaCheck = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 9].replace(']','');
                var evolveNewTotal = dexData[dexData.indexOf('"'+evolvePokemonName+'"') + 5];

                try { //if a pokemon has a name like gligar [Vampire] it won't be found. This try tries to change the name as it's recorded in the pokedex data array
                    var pokemonDexKeepFirstName = evolvePokemonName.split(' ')[0];
                    var pokemonDexKeepSecondName = evolvePokemonName.split(' ')[1];
                    var pokemonDexKeepThirdName = evolvePokemonName.split(' ')[2];
                    var pokemonDexKeepFourthName = evolvePokemonName.split(' ')[3];
                    var pokemonDexKeepFifthName = evolvePokemonName.split(' ')[4];
                    var pokemonDexKeepSixthName = evolvePokemonName.split(' ')[5];

                    var evolvePokemonNameOne = pokemonDexKeepFirstName;
                    var evolveNewCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 6];
                    var evolveNewShinyCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 7];
                    var evolveNewAlbinoCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 8];
                    var evolveNewMelaCheckOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 9].replace(']','');
                    var evolveNewTotalOne = dexData[dexData.indexOf('"'+evolvePokemonNameOne+'"') + 5];

                    let evolvePokemonNameTwoBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName;
                    var evolvePokemonNameTwo = evolvePokemonNameTwoBefore.replace('[','').replace(']','');
                    var evolveNewCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 6];
                    var evolveNewShinyCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 7];
                    var evolveNewAlbinoCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 8];
                    var evolveNewMelaCheckTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 9].replace(']','');
                    var evolveNewTotalTwo = dexData[dexData.indexOf('"'+evolvePokemonNameTwo+'"') + 5];

                    let evolvePokemonNameThreeBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName;
                    var evolvePokemonNameThree = evolvePokemonNameThreeBefore.replace('[','').replace(']','');
                    var evolveNewCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 6];
                    var evolveNewShinyCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 7];
                    var evolveNewAlbinoCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 8];
                    var evolveNewMelaCheckThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 9].replace(']','');
                    var evolveNewTotalThree = dexData[dexData.indexOf('"'+evolvePokemonNameThree+'"') + 5];

                    let evolvePokemonNameFourBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName;
                    var evolvePokemonNameFour = evolvePokemonNameFourBefore.replace('[','').replace(']','');
                    var evolveNewCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 6];
                    var evolveNewShinyCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 7];
                    var evolveNewAlbinoCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 8];
                    var evolveNewMelaCheckFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 9].replace(']','');
                    var evolveNewTotalFour = dexData[dexData.indexOf('"'+evolvePokemonNameFour+'"') + 5];

                    let evolvePokemonNameFiveBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName;
                    var evolvePokemonNameFive = evolvePokemonNameFiveBefore.replace('[','').replace(']','');
                    var evolveNewCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 6];
                    var evolveNewShinyCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 7];
                    var evolveNewAlbinoCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 8];
                    var evolveNewMelaCheckFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 9].replace(']','');
                    var evolveNewTotalFive = dexData[dexData.indexOf('"'+evolvePokemonNameFive+'"') + 5];

                    let evolvePokemonNameSixBefore = pokemonDexKeepFirstName+'/'+pokemonDexKeepSecondName+' '+pokemonDexKeepThirdName+' '+pokemonDexKeepFourthName+' '+pokemonDexKeepFifthName+' '+pokemonDexKeepSixthName;
                    var evolvePokemonNameSix = evolvePokemonNameSixBefore.replace('[','').replace(']','');
                    var evolveNewCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 6];
                    var evolveNewShinyCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 7];
                    var evolveNewAlbinoCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 8];
                    var evolveNewMelaCheckSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 9].replace(']','');
                    var evolveNewTotalSix = dexData[dexData.indexOf('"'+evolvePokemonNameSix+'"') + 5];

                }
                catch(err) {
                    console.log(err);
                }

                //prep done now the search
                if (dexData.indexOf('"'+evolvePokemonName+'"') != -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex
                    if (pokemonIsNormal == true) { //normal Pokémon search
                        if (evolveNewCheckOne == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpokedexentry');
                            }

                        } else if (evolveNewTotal > evolveNewCheck && evolveNewCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblepokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Mega/Totem forme</h3><ul class="newpossiblepokedexentry qolChangeLogContent"></ul></li><br>');
                            }
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblepokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpossiblepokedexentry');
                            }

                        } else { // the rest of the pokemon that could be found by name that you already have in the dex
                            //console.log('Normal '+evolvePokemonName+' already in dex');
                        }
                    } else if (pokemonIsShiny == true) { //shiny Pokemon search
                        if (evolveNewShinyCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newshinypokedexentry');
                            }

                        } else if (evolveNewTotal > evolveNewShinyCheck && evolveNewShinyCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossibleshinypokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Shiny Mega/Totem forme</h3><ul class="newpossibleshinypokedexentry qolChangeLogContent"></ul></li><br>');
                            }
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossibleshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpossibleshinypokedexentry');
                            }

                        } else {
                            //console.log('Shiny '+evolvePokemonName+' already in dex');
                        }
                    } else if (pokemonIsAlbino == true) { //albino pokemon search
                        if (evolveNewAlbinoCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newalbinopokedexentry');
                            }

                        } else if (evolveNewTotal > evolveNewAlbinoCheck && evolveNewAlbinoCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblealbinopokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Albino Mega/Totem forme</h3><ul class="newpossiblealbinopokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpossiblealbinopokedexentry');
                            }

                        } else {
                            //console.log('albino '+evolvePokemonName+' already in dex');
                        }
                    } else if (pokemonIsMelanistic == true) { //melanistic pokemon search
                        if (evolveNewMelaCheck == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newamelanisticpokedexentry');
                            }

                        } else if (evolveNewTotal > evolveNewMelaCheck && evolveNewMelaCheck > 0) { //looks for Pokémon that you have at least 1 from, but there are more possible (mega/Totem only because alolan won't be found due to the name)
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpossiblemelanisticpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible Melanistic Mega/Totem forme</h3><ul class="newpossiblemelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpossiblemelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpossiblemelanisticpokedexentry');
                            }

                        } else {
                            //console.log('Melanistic '+evolvePokemonName+' already in dex');
                        }
                    }



                } else if (dexData.indexOf('"'+evolvePokemonName+'"') == -1) { //Looks for the Pokémon name in which it evolves to check if it's in your Pokédex{
                    if (pokemonIsNormal == true) {
                        if (evolveNewCheckTwo == 0 || evolveNewCheckThree == 0 || evolveNewCheckFour == 0 || evolveNewCheckFive == 0 || evolveNewCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpokedexentry');
                            }

                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealolan') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Alolan entry</h3><ul class="possiblealolan qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealolan>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblealolan');
                                }

                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibledifferent') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new forme/cloak entry</h3><ul class="possibledifferent qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibledifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possibledifferent');
                                }

                            } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.newpokedexentry');
                                }
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Pokédex entry</h3><ul class="newpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newpokedexentry');
                            }

                        } else {
                            //END
                            //console.log(evolvePokemonName+' still needs to be searched');
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.errornotfound');
                            }
                        }


                    } else if (pokemonIsShiny == true) {
                        if (evolveNewShinyCheckTwo == 0 || evolveNewShinyCheckThree == 0 || evolveNewShinyCheckFour == 0 || evolveNewShinyCheckFive == 0 || evolveNewShinyCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newshinypokedexentry');
                            }
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinyalolan') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny Alolan entry</h3><ul class="possibleshinyalolan qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinyalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possibleshinyalolan');
                                }

                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possibleshinydifferent') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Shiny forme/cloak entry</h3><ul class="possibleshinydifferent qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possibleshinydifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possibleshinydifferent');
                                }

                            } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.newshinypokedexentry');
                                }
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newshinypokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Shiny Pokédex entry</h3><ul class="newshinypokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newshinypokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newshinypokedexentry');
                            }

                        } else {
                            //END
                            //console.log(evolvePokemonName+' still needs to be searched');
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.errornotfound');
                            }
                        }

                    } else if (pokemonIsAlbino == true) {
                        if (evolveNewAlbinoCheckTwo == 0 || evolveNewAlbinoCheckThree == 0 || evolveNewAlbinoCheckFour == 0 || evolveNewAlbinoCheckFive == 0 || evolveNewAlbinoCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newalbinopokedexentry');
                            }
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinoalolan') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino Alolan entry</h3><ul class="possiblealbinoalolan qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinoalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblealbinoalolan');
                                }

                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblealbinodifferent') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Albino forme/cloak entry</h3><ul class="possiblealbinodifferent qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblealbinodifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblealbinodifferent');
                                }

                            } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.newalbinopokedexentry');
                                }
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newalbinopokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Albino Pokédex entry</h3><ul class="newalbinopokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newalbinopokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newalbinopokedexentry');
                            }

                        } else {
                            //END
                            //console.log(evolvePokemonName+' still needs to be searched');
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.errornotfound');
                            }
                        }

                    } else if (pokemonIsMelanistic == true) {
                        if (evolveNewMelaCheckTwo == 0 || evolveNewMelaCheckThree == 0 || evolveNewMelaCheckFour == 0 || evolveNewMelaCheckFive == 0 || evolveNewMelaCheckSix == 0) { //looks for Pokémon that you have 0 from. Those are always new.
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('newamelanisticpokedexentry') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="newamelanisticpokedexentry qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.newamelanisticpokedexentry>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.newamelanisticpokedexentry');
                            }
                        } else if (evolvePokemonName.includes('[Alolan Forme]')) { // for alolans
                            if ((evolveNewTotalOne > evolveNewCheckOne && evolveNewCheckOne > 0) || (evolveNewTotalTwo > evolveNewCheckTwo && evolveNewCheckTwo > 0) || (evolveNewTotalThree > evolveNewCheckThree && evolveNewCheckThree > 0) || (evolveNewTotalFour > evolveNewCheckFour && evolveNewCheckFour > 0) || (evolveNewTotalFive > evolveNewCheckFive && evolveNewCheckFive > 0) || (evolveNewTotalSix > evolveNewCheckSix && evolveNewCheckSix > 0)) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic Alolan entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblemelanalolan');
                                }

                            }
                        } else if (evolvePokemonName.indexOf('[') >= 0) {
                            if (evolvePokemonName.indexOf('[Alolan Forme]') == -1 && dexData.indexOf('"'+evolvePokemonNameOne+'"') >= 0 && evolveNewTotalOne > evolveNewCheckOne) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelandifferent') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Possible new Melanistic forme/cloak entry</h3><ul class="possiblemelandifferent qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelandifferent>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblemelandifferent');
                                }

                            } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                    document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                                }

                                if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                    $(this).clone().appendTo('.possiblemelanalolan');
                                }
                            }

                        } else if (dexData.indexOf('"'+evolvePokemonNameOne+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameTwo+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameThree+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFour+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameFive+'"') == -1 && dexData.indexOf('"'+evolvePokemonNameSix+'"') == -1) {
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('possiblemelanalolan') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">New Melanistic Pokédex entry</h3><ul class="possiblemelanalolan qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.possiblemelanalolan>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.possiblemelanalolan');
                            }

                        } else {
                            //END
                            //console.log(evolvePokemonName+' still needs to be searched');
                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>Ul').hasClass('errornotfound') === false) {
                                document.querySelector('.qolEvolveNewList').insertAdjacentHTML('beforeend', '<li class="expandlist"><h3 class="slidermenu">Error contact Bentomon!</h3><ul class="errornotfound qolChangeLogContent"></ul></li><br>');
                            }

                            if ($('#farmnews-evolutions>.scrollable>.qolEvolveNewList>Li>.errornotfound>li:contains('+evolvePokemonName+')').length == 0) {
                                $(this).clone().appendTo('.errornotfound');
                            }
                        }
                    }
                }
            });

            $('.evolvepkmnlist').hide();

            //layout
            let typeBackground = $('.panel>h3').css('background-color');
            let typeBorder = $('.panel>h3').css('border');
            let typeColor = $('.panel>h3').css('color');
            $(".expandlist").css("background-color", ""+typeBackground+"");
            $(".expandlist").css("border", ""+typeBorder+"");
            $(".expandlist").css("color", ""+typeColor+"");

            let typeListBackground = $('.tabbed_interface>div').css('background-color');
            let typeListColor = $('.tabbed_interface>div').css('color');
            $(".qolChangeLogContent").css("background-color", ""+typeListBackground+"");
            $(".qolChangeLogContent").css("color", ""+typeListColor+"");
        },
        easyQuickEvolve() {
            if ($('.canevolve:contains("evolved into")').parent().length != 0) {
                $('.canevolve:contains("evolved into")').parent().remove();
            }
        },
    };

    return API;
})(); // LabPage