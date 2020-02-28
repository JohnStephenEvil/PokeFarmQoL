const TEMPLATES = { // all the new/changed HTML for the userscript
    qolHubLinkHTML        : `<li data-name="QoL"><a title="QoL Settings"><img src="https://i.imgur.com/L6KRli5.png" alt="QoL Settings">QoL</a></li>`,
    qolHubUpdateLinkHTML  : `<li data-name="QoLupdate"><a href=\"https://github.com/jpgualdarrama/PokeFarmQoL/raw/master/Poke-Farm-QoL.user.js\" target=\"_blank\"><img src="https://i.imgur.com/SJhgsU8.png" alt="QoL Update">QoL Update Available!</a></li>`,
    qolSettingsMenuHTML   : GM_getResourceText('QoLSettingsMenuHTML'),
    shelterSettingsHTML   : GM_getResourceText('shelterSettingsHTML'),
    massReleaseSelectHTML : `<label id="selectallfish"><input id="selectallfishcheckbox" type="checkbox">Select all</label><label id="movefishselectany"><input id="movefishdselectanycheckbox" type="checkbox">Select Any  </label><label id="movefishselectsour"><input id="movefishselectsourcheckbox" type="checkbox">Select Sour  </label><label id="movefishselectspicy"><input id="movefishselectspicycheckbox" type="checkbox">Select Spicy</label><label id="movefishselectdry"><input id="movefishselectdrycheckbox" type="checkbox">Select Dry  </label><label id="movefishselectsweet"><input id="movefishselectsweetcheckbox" type="checkbox">Select Sweet  </label><label id="movefishselectbitter"><input id="movefishselectbittercheckbox" type="checkbox">Select Bitter  </label>`,
    fieldSortHTML         : `<div id="fieldorder"><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByBerry"/>Sort by berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByMiddle"/>Sort in the middle</label><label><input type="checkbox" class="qolsetting qolalone" data-key="fieldByGrid"/>Align to grid</label><label><input type="checkbox" class="qolsetting" data-key="fieldClickCount"/>Click counter</label></div>`,
    fieldSearchHTML       : GM_getResourceText('fieldSearchHTML'),
    privateFieldSearchHTML: GM_getResourceText('privateFieldSearchHTML'),
    qolHubHTML            : GM_getResourceText('QolHubHTML'),
    partyModHTML          : `<div id='qolpartymod'><label><input type="checkbox" class="qolsetting qolalone" data-key="hideDislike"/>Hide disliked berries</label><label><input type="checkbox" class="qolsetting qolalone" data-key="niceTable"/>Show in table</label><label><input type="checkbox" class="qolsetting qolalone" data-key="hideAll"/>Hide all click fast</label></div>`,
    evolveFastHTML        : GM_getResourceText('evolveFastHTML'),
    labOptionsHTML        : GM_getResourceText('labOptionsHTML'),
}

let GLOBALS = {
    SETTINGS_SAVE_KEY : 'QoLSettings',
    TYPE_LIST : ["Normal", "Fire", "Water", "Electric", "Grass", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"],
    NATURE_LIST : ["Lonely", "Mild", "Hasty", "Gentle", "Bold", "Modest", "Timid", "Calm",
                   "Impish", "Adamant", "Jolly", "Careful", "Relaxed", "Brave", "Quiet", "Sassy",
                   "Lax", "Naughty", "Rash", "Näive", "Hardy", "Docile", "Serious", "Bashful", "Quirky"],
    EGG_GROUP_LIST : ["Monster", "Water 1", "Bug", "Flying", "Field", "Fairy", "Grass", "Undiscovered", "Human-Like", "Water 3", "Mineral", "Amorphous", "Water 2", "Ditto", "Dragon"],
    SHELTER_TYPE_TABLE : [
        "0", "Normal", '<img src="//pfq-static.com/img/types/normal.png/t=1262702646">',
        "1", "Fire", '<img src="//pfq-static.com/img/types/fire.png/t=1262702645">',
        "2", "Water", '<img src="//pfq-static.com/img/types/water.png/t=1262702646">',
        "3", "Electric", '<img src="//pfq-static.com/img/types/electric.png/t=1262702645">',
        "4", "Grass", '<img src="//pfq-static.com/img/types/grass.png/t=1262702645">',
        "5", "Ice", '<img src="//pfq-static.com/img/types/ice.png/t=1262702646">',
        "6", "fighting", '<img src="//pfq-static.com/img/types/fighting.png/t=1262702645">',
        "7", "Poison", '<img src="//pfq-static.com/img/types/poison.png/t=1262702646">',
        "8", "Ground", '<img src="//pfq-static.com/img/types/ground.png/t=1262702646">',
        "9", "Flying", '<img src="//pfq-static.com/img/types/flying.png/t=1262702645">',
        "10", "Psychic", '<img src="//pfq-static.com/img/types/psychic.png/t=1262702646">',
        "11", "Bug", '<img src="//pfq-static.com/img/types/bug.png/t=1262702645">',
        "12", "Rock", '<img src="//pfq-static.com/img/types/rock.png/t=1262702646">',
        "13", "Ghost", '<img src="//pfq-static.com/img/types/ghost.png/t=1262702645">',
        "14", "Dragon", '<img src="//pfq-static.com/img/types/dragon.png/t=1263605747">',
        "15", "Dark", '<img src="//pfq-static.com/img/types/dark.png/t=1262702645">',
        "16", "Steel", '<img src="//pfq-static.com/img/types/steel.png/t=1262702646">',
        "17", "Fairy", '<img src="//pfq-static.com/img/types/fairy.png/t=1374419124">',
    ],
    SHELTER_SEARCH_DATA : [
	"findNewEgg", "Egg", "new egg", '<img src="//pfq-static.com/img/pkmn/egg.png/t=1451852195">',
	"findNewPokemon", "Pokémon", "new Pokémon", '<img src="//pfq-static.com/img/pkmn/pkmn.png/t=1451852507">',
	"findShiny", "[SHINY]", "Shiny", '<img src="//pfq-static.com/img/pkmn/shiny.png/t=1400179603">',
	"findAlbino","[ALBINO]", "Albino", '<img src="//pfq-static.com/img/pkmn/albino.png/t=1414662094">',
	"findMelanistic", "[MELANISTIC]", "Melanistic", '<img src="//pfq-static.com/img/pkmn/melanistic.png/t=1435353274">',
	"findPrehistoric", "[PREHISTORIC]", "Prehistoric", '<img src="//pfq-static.com/img/pkmn/prehistoric.png/t=1465558964">',
	"findDelta", "[DELTA]", "Delta", "Delta", '<img src="//pfq-static.com/img/pkmn/_delta/dark.png/t=1501325214">',
	"findMega", "[MEGA]", "Mega", '<img src="//pfq-static.com/img/pkmn/mega.png/t=1400179603">',
	"findStarter", "[STARTER]", "Starter", '<img src="//pfq-static.com/img/pkmn/starter.png/t=1484919510">',
	"findCustomSprite", "[CUSTOM SPRITE]", "Custom Sprite", '<img src="//pfq-static.com/img/pkmn/cs.png/t=1405806997">',
	"findMale", "[M]", "Male", '<img src="//pfq-static.com/img/pkmn/gender_m.png/t=1401213006">',
	"findFemale", "[F]", "Female", '<img src="//pfq-static.com/img/pkmn/gender_f.png/t=1401213007">',
	"findNoGender", "[N]", "No Gender", '<img src="//pfq-static.com/img/pkmn/gender_n.png/t=1401213004">',
    ],
}
GLOBALS.TYPE_OPTIONS = Helpers.buildOptionsString(GLOBALS.TYPE_LIST);
GLOBALS.NATURE_OPTIONS = Helpers.buildOptionsString(GLOBALS.NATURE_LIST);
GLOBALS.EGG_GROUP_OPTIONS = Helpers.buildOptionsString(GLOBALS.EGG_GROUP_LIST);

let dexDataPromise = new Promise((resolve, reject) => {
    if(localStorage.getItem('QoLPokedex') === null) {
        $.get('https://pokefarm.com/dex').then(data => {
            let html = jQuery.parseHTML(data)
            let dex = $(html[10].querySelector('#dexdata')).html()
            GLOBALS.DEX_DATA = dex.split(',');
            localStorage.setItem('QoLPokedex', JSON.stringify(GLOBALS.DEX_DATA))
            resolve('Success')
        });
    } else {
        GLOBALS.DEX_DATA = JSON.parse(localStorage.getItem('QoLPokedex'));
        resolve('Success')
    }
});

dexDataPromise.then((m) => { /* empty */ });