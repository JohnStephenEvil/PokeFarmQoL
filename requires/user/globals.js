/* globals GlobalsBase */
// eslint-disable-next-line no-unused-vars
class Globals extends GlobalsBase {
    // filled in by LocalStorageManager
    EVOLVE_BY_LEVEL_LIST = null;
    EVOLUTIONS_LEFT = null;
    constructor(localStorageMgr) {
        super();
        this.localStorageMgr = localStorageMgr;
    }
}