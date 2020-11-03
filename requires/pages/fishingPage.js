const Page = (module) ? require('./basePage').Page : Page;
    
class FishingPage extends Page {
    constructor() {
	super('QoLFishing', {}, 'fishing')
	// no observer
    }
    setupHandlers() {
        const obj = this;
        $(document).on('mouseover', '#caughtfishcontainer', (function() { //select all feature
            obj.releaseSelectAll();
        }));
    }
    setupHandlers() {
        $(document).on('mouseover', '#caughtfishcontainer', (function() { //select all feature
            this.releaseSelectAll();
        }));
    }
    releaseSelectAll() {
        $("#selectallfishcheckbox").click(function(){
            $(this).parent().parent().next().find('input:checkbox').prop('checked', this.checked);
        });

        $('#movefishselectanycheckbox').click(function() {
            let selectAny = $('.icons:contains("Any")').prev().prev('input');
            $(selectAny).not(this).prop('checked', this.checked);
        });

        $('#movefishselectsourcheckbox').click(function() {
            let selectSour = $('.icons:contains("Sour")').prev().prev('input');
            $(selectSour).not(this).prop('checked', this.checked);
        });

        $('#movefishselectspicycheckbox').click(function() {
            let selectSpicy = $('.icons:contains("Spicy")').prev().prev('input');
            $(selectSpicy).not(this).prop('checked', this.checked);
        });

        $('#movefishselectdrycheckbox').click(function() {
            let selectDry = $('.icons:contains("Dry")').prev().prev('input');
            $(selectDry).not(this).prop('checked', this.checked);
        });

        $('#movefishselectsweetcheckbox').click(function() {
            let selectSweet = $('.icons:contains("Sweet")').prev().prev('input');
            $(selectSweet).not(this).prop('checked', this.checked);
        });

        $('#movefishselectbittercheckbox').click(function() {
            let selectBitter = $('.icons:contains("Bitter")').prev().prev('input');
            $(selectBitter).not(this).prop('checked', this.checked);
        });
    }
};